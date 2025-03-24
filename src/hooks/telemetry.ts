/**
 * Copyright 2024 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import "dotenv/config";
import "@opentelemetry/instrumentation/hook.mjs";
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from "@opentelemetry/semantic-conventions";
import { Version } from "beeai-framework";
import { NodeSDK, node, resources } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { BeeAIInstrumentation } from "@arizeai/openinference-instrumentation-beeai";
import * as beeaiFramework from "beeai-framework";

const beeAIInstrumentation = new BeeAIInstrumentation();

const sdk = new NodeSDK({
  resource: new resources.Resource({
    [ATTR_SERVICE_NAME]: "beeai-framework-starter",
    [ATTR_SERVICE_VERSION]: Version,
  }),
  spanProcessors: [
    new node.SimpleSpanProcessor(
      new OTLPTraceExporter({
        url: "http://127.0.0.1:6006/v1/traces",
      }),
    ),
    new node.SimpleSpanProcessor(new node.ConsoleSpanExporter()),
  ],
});

sdk.start();

beeAIInstrumentation.manuallyInstrument(beeaiFramework);

process.on("beforeExit", async () => {
  await sdk.shutdown();
});
