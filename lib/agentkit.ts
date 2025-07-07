// import { dbAgent } from "@/inngest/agents/dbAgent";
import { dbAgent } from "@/inngest/agents/dbAgent";

import { pdfAgent } from "@/inngest/agents/pdfAgent";
import { createNetwork, openai } from "@inngest/agent-kit";
// import { createServer } from "@inngest/agent-kit/server";

export const agentNetwork = createNetwork({
  name: "Agent Network",
  agents: [pdfAgent, dbAgent],
  defaultModel: openai({
    model: "google/gemini-2.0-flash-001",
    apiKey: process.env.OPEN_ROUTER_API_KEY!,
    baseUrl: "https://openrouter.ai/api/v1",
  }),
  router: ({ callCount }) => {
    if (callCount === 0) {
      return pdfAgent;
    }
    if (callCount === 1) {
      return dbAgent;
    }
    // End the network execution after the first agent
    return undefined;
  },
});
