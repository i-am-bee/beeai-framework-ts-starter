import "./hooks/telemetry.js";
import "dotenv/config.js";
import { ReActAgent } from "beeai-framework/agents/react/agent";
import { FrameworkError } from "beeai-framework/errors";
import { TokenMemory } from "beeai-framework/memory/tokenMemory";
import { OpenMeteoTool } from "beeai-framework/tools/weather/openMeteo";
import { WikipediaTool } from "beeai-framework/tools/search/wikipedia";
import { ChatModel } from "beeai-framework/backend/chat";
import process from "node:process";

const agent = new ReActAgent({
  llm: await ChatModel.fromName(process.env.LLM_CHAT_MODEL_NAME as any),
  memory: new TokenMemory(),
  tools: [new OpenMeteoTool(), new WikipediaTool()],
});

const prompt = `What is the current weather in Las Vegas?`;

try {
  const response = await agent.run(
    { prompt },
    {
      execution: {
        maxIterations: 8,
        maxRetriesPerStep: 3,
        totalMaxRetries: 10,
      },
    },
  );

  console.log(`Agent 🤖 : `, response.result.text);
} catch (error) {
  console.log(`Error`, FrameworkError.ensure(error).dump());
}
