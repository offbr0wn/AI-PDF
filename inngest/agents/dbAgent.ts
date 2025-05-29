import { prisma } from "@/lib/db";
import { createAgent, createTool, openai } from "@inngest/agent-kit";

import { z } from "zod";
const SaveToDatabaseParams = z.object({
  // an array of { key: string, value: string } pairs
  content: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    })
  ),
  // optional metadata
});

const saveToDatabase = createTool({
  name: "saveToDatabase",
  description: "Saves structured data to MongoDB",
  parameters: SaveToDatabaseParams,
  handler: async (
    { content, context } // <-- the Zod‐validated parameters
  ) =>
    // <-- the tool‐context (you could also destructure agent/network here)
    {
      const results = await context.step.run("saveToDatabase", async () => {
        try {
          // Rebuild a plain object from your array of KV pairs
          const contentObj = Object.fromEntries(
            content.map(({ key, value }) => [key, value])
          ) as Record<string, string>;

          // Pull out your userId (now surfaced in the contentObj)
          const userId = contentObj.userId;
          if (!userId) {
            throw new Error("User ID is required");
          }

          // Fetch & validate user
          const user = await prisma.user.findUnique({
            where: { clerkId: userId },
          });
          if (!user) {
            throw new Error("User not found");
          }

          // Save the document
          const document = await prisma.document.create({
            data: {
              userId: user.id,
              content: JSON.stringify(contentObj),
              status: "completed",
              name: "unknown",
              type: "unknown",
              // summary:   metadata.summary || "",
              // createdAt / updatedAt can be omitted if your Prisma schema has @default(now())
            },
          });

          return {
            success: true,
            documentId: document.id,
            message: "Document saved successfully",
          };
        } catch (error: Error | any) {
          console.error("DB save failed:", error);
          return {
            success: false,
            error: error.message,
          };
        }
      });

      return results;
    },
});

export const dbAgent = createAgent({
  name: "database-manager",
  description: "Manages database operations",
  system: `You are a database agent that formats content into structured data being JSON Format and saves it to the database.
           Your job is to analyze the input and determine the best way to structure it for database storage.
           Focus on extracting key-value pairs, entities, and relationships.`,
  model: openai({
    model: "meta-llama/llama-3.3-8b-instruct:free",
    apiKey: process.env.OPEN_ROUTER_API_KEY!,
    baseUrl: "https://openrouter.ai/api/v1",
    defaultParameters: { temperature: 0.1 },
  }),
  tools: [saveToDatabase],
});
