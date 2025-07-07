// import { agentNetwork } from "@/lib/agentkit";
import { inngest } from "@/lib/inngest";
import { agentNetwork } from "@/lib/agentkit";

export const pdfParserFunction = inngest.createFunction(
  { id: "pdf-parser-function" },
  { event: "app/pdf" },
  async ({ event }) => {
    const { data } = event;

    const result = await agentNetwork.run(
      `
      Analyze the document provided and extract its contents based on the detected document type.

      **Input Data:**
      - fileUrl: ${data.fileURL}
      - userId: ${data.userId}
      - documentId: ${data.documentId}
     
     

      **Task:**
      1.  **Detect Document Type:** Classify the document as "invoice", "receipt", "resume", "flight_ticket", or "other".
      2.  **Extract Content:** Use the appropriate schema to extract the data.
      3.  **Save to Database:** Call the saveToDatabase tool with the structured data.
      `
    );

    return {
      result,
    };
  }
);
