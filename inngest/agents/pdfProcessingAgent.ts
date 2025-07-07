import { createAgent, createTool, openai } from "@inngest/agent-kit";
import { z } from "zod";
import pdf from "pdf-parse";

export const ProcessPDFParams = z.object({
  fileUrl: z.string().url(),
});

const processPDF = createTool({
  name: "processPDF",
  description: "Fetches a PDF from a URL, extracts its text, and returns the text, page count, and file size.",
  parameters: ProcessPDFParams,
  handler: async (input) => {
    const response = await fetch(input.fileUrl);
    const fileBuffer = await response.arrayBuffer();
    const data = await pdf(fileBuffer);

    return {
      rawText: data.text,
      pages: data.numpages,
      sizeMB: (fileBuffer.byteLength / (1024 * 1024)).toFixed(2),
    };
  },
});

export const pdfProcessingAgent = createAgent({
  name: "pdf-processing-agent",
  description: "Processes a PDF to extract its raw text and metadata.",
  system: "You are a PDF processing agent. Your job is to take a file URL, fetch the PDF, and extract its text and metadata using the processPDF tool.",
  model: openai({
    model: "google/gemini-2.5-flash-preview-05-20",
    apiKey: process.env.OPEN_ROUTER_API_KEY!,
    baseUrl: "https://openrouter.ai/api/v1",
    defaultParameters: { temperature: 0 },
  }),
  tools: [processPDF],
});
