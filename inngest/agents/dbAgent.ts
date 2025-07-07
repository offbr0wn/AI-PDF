import { prisma } from "@/lib/db";
import { createAgent, createTool, openai } from "@inngest/agent-kit";

import { z } from "zod";

export const SaveToDatabaseParams = z.object({
  userId: z.string().min(1),
  documentType: z.enum([
    "invoice",
    "receipt",
    "resume",
    "flight_ticket",
    "other",
  ]),
  content: z
    .array(
      z.object({
        key: z.string().min(1),
        value: z.string().min(0),
      })
    )
    .nonempty(),
  metadata: z.object({
    documentId: z.string().min(1).describe("Passed into the data "),
    type: z.string().min(1),
    fileName: z.string().min(1),
    fileUrl: z.string().min(1),
    summary: z.string().min(1),
    notes: z.string(),
    keywords: z.array(z.string()).nonempty(),
    sizeMB: z.string().min(1),
    pages: z.string().min(1),
  }),
});

const saveToDatabase = createTool({
  name: "saveToDatabase",
  description: "Saves structured data to the mongodb",
  parameters: SaveToDatabaseParams,

  handler: async (input, { network, step }) => {
    // Extract required fields
    const userId = input.userId;
    if (!userId) {
      return { status: "ERROR", error: "Missing userId" };
    }
    if (network?.state?.data) {
      network.state.data.security_agent_answer = input;
      network.state.data.saveToDatabase = input.userId;
    }

    return step?.run("Add-Data-To-DB", async () => {
      try {
        const document = await prisma.document.update({
          where: { id: input.metadata.documentId },
          data: {
            documentType: input.documentType,
            content: input.content || [],
            fileName: input.metadata.fileName,
            fileUrl: input.metadata.fileUrl,
            type: input.metadata.type,
            status: "completed",
            metadata: {
              summary: input.metadata.summary,
              notes: input.metadata.notes,
              keywords: input.metadata.keywords,
              sizeMB: input.metadata.sizeMB,
              pages: input.metadata.pages,
            },
          },
        });
        return {
          status: "SUCCESS",
          documentId: document.id,
          message: "Data saved successfully",
        };
      } catch (err) {
        return { status: "ERROR", error: err };
      }
    });
  },
});

export const dbAgent = createAgent({
  name: "database-manager",
  description: "Structures and stores classified document data",
  system: `
/*
You are the Database Manager Agent. Your role is to take the structured data extracted by the parser, format it for database insertion according to the Zod schema, and perform a final quality check and then run tools function to save the data to the database. 

Your input is the direct JSON output from the PDF Parser Agent.


**Your Tasks:**
1.  **Flatten the Data:** Transform the extracted_content object from the input into a flat array of key-value pairs for the content field. Use dot notation for nested objects (e.g., total_amount.value). All values must be converted to strings.
2.  **Determine Review Status:** Set status to REQUIRES_REVIEW if the input requires_review is true. If so, populate the metadata.notes field with the reasons (e.g., "Low classification confidence" or "Low confidence for fields: customer_name"). Otherwise, the status is SUCCESS.
3.  **Construct saveParams:** Build the saveParams object that perfectly matches the saveToDatabase Zod schema.
4.  **Final Output:** Return a single JSON object containing the status and the saveParams. Do NOT call the tool yourself.

**Example Input:**
{
  "userId": "user_123",
  "documentType": "invoice",
  "requires_review": false,
  "extracted_content": {
    "invoice_number": "INV-123",
    "total_amount": { "value": 150.75, "currency": "USD" }
  },
  "metadata": { ... },
  "confidence_scores": { ... }
}

**Example Output SUCCESS:**
{
  "status": "SUCCESS",
  "saveParams": {
    "userId": "user_123",
    "documentType": "invoice",
    "content": [
      { "key": "invoice_number", "value": "INV-123" },
      { "key": "total_amount.value", "value": "150.75" },
      { "key": "total_amount.currency", "value": "USD" }
    ],
    "metadata": { ... }
  }
}
*/
  `,
  model: openai({
    model: "google/gemini-2.5-flash-preview-05-20",
    apiKey: process.env.OPEN_ROUTER_API_KEY!,
    baseUrl: "https://openrouter.ai/api/v1",
    defaultParameters: { temperature: 0 },
  }),
  tools: [saveToDatabase],
});
