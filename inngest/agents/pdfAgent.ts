import { createAgent, openai } from "@inngest/agent-kit";

export const pdfParserAgent = createAgent({
  name: "pdf-parser",
  description: "Extracts structured content from PDF documents",
  system: `summarize the content of the PDF document in a single sentence`,
  model: openai({
    model: "google/gemma-3-27b-it:free",
    apiKey: process.env.OPEN_ROUTER_API_KEY!,
    baseUrl: "https://openrouter.ai/api/v1",
    defaultParameters: { temperature: 0.1 }, // Low temperature for consistency
  }),
});
