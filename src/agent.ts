import "dotenv/config.js";
import { ReActAgent } from "beeai-framework/agents/react/agent";
import { FrameworkError } from "beeai-framework/errors";
import { TokenMemory } from "beeai-framework/memory/tokenMemory";
import { OpenMeteoTool } from "beeai-framework/tools/weather/openMeteo";
import { DuckDuckGoSearchTool } from "beeai-framework/tools/search/duckDuckGoSearch";
import { createConsoleReader } from "./helpers/reader.js";
import { ChatModel } from "beeai-framework/backend/chat";
import { FullModelName } from "beeai-framework/backend/utils";
import { ProviderName } from "beeai-framework/backend/constants";

const CHAT_MODEL_NAME = process.env.LLM_CHAT_MODEL_NAME as FullModelName | ProviderName;

const agent = new ReActAgent({
  llm: await ChatModel.fromName(CHAT_MODEL_NAME),
  memory: new TokenMemory(),
  tools: [new OpenMeteoTool(), new DuckDuckGoSearchTool()],
});

const reader = createConsoleReader({ fallback: "What is the current weather in Las Vegas?" });
for await (const { prompt } of reader) {
  try {
    const response = await agent
      .run(
        { prompt },
        {
          execution: {
            maxIterations: 8,
            maxRetriesPerStep: 3,
            totalMaxRetries: 10,
          },
        },
      )
      .observe((emitter) => {
        emitter.on("update", (data) => {
          reader.write(`Agent 🤖 (${data.update.key}) :`, data.update.value);
        });
      });

    reader.write(`Agent 🤖 :`, response.result.text);
  } catch (error) {
    reader.write(`Error`, FrameworkError.ensure(error).dump());
  }
}
