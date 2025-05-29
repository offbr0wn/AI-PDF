// import { agentNetwork } from "@/lib/agentkit";
import { inngest } from "@/lib/inngest";
import { agentNetwork } from "@/lib/agentkit";

export const pdfParserFunction = inngest.createFunction(
  { id: "pdf-parser-function" },
  { event: "app/pdf" },
  async ({ event }) => {
    // Extract PDF text from event data
    const { userId } = event.data;
    const result = await agentNetwork.run(
      `Parse this PDF document  ${event.data.source} and this is the userId: ${userId}`
    );

    const pdfAgent = result?.state.results[0].output[0];
    const dbAgent = result?.state;
    return {
      pdfAgent,
      dbAgent,
    };
  }
);
