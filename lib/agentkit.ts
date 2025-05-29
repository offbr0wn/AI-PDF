// import { dbAgent } from "@/inngest/agents/dbAgent";
import { dbAgent } from "@/inngest/agents/dbAgent";
import { pdfParserAgent } from "@/inngest/agents/pdfAgent";
import { createNetwork, openai } from "@inngest/agent-kit";
// import { createServer } from "@inngest/agent-kit/server";

export const agentNetwork = createNetwork({
  name: "Agent Network",
  agents: [pdfParserAgent, dbAgent],
  defaultModel: openai({
    model: "google/gemma-3-27b-it:free",
    apiKey: process.env.OPEN_ROUTER_API_KEY!,
    baseUrl: "https://openrouter.ai/api/v1",
  }),
  router: ({ callCount }) => {
    if (callCount === 0) {
      return pdfParserAgent;
    }
    if (callCount === 1) {
      return dbAgent;
    }
    // End the network execution after the first agent
    return undefined;
  },
});

