# 🐝 BeeAI Framework Starter

This starter template lets you quickly start working with the [BeeAI Framework](https://github.com/i-am-bee/beeai-framework) in a second.

📚 See the [documentation](https://i-am-bee.github.io/beeai-framework/) to learn more.

## ✨ Key Features

- 🔒 Safely execute an arbitrary Python Code via [Bee Code Interpreter](https://github.com/i-am-bee/bee-code-interpreter).
- 🔎 Get complete visibility into agents' decisions using our [OpenInference Instrumentation for BeeAI](https://github.com/Arize-ai/openinference/tree/main/js/packages/openinference-instrumentation-beeai) package.
- 🚀 Fully fledged TypeScript project setup with linting and formatting.

## 📦 Requirements

- JavaScript runtime [NodeJS > 18](https://nodejs.org/) (ideally installed via [nvm](https://github.com/nvm-sh/nvm)).
- Container system like [Rancher Desktop](https://rancherdesktop.io/), [Podman](https://podman.io/) (VM must be rootfull machine) or [Docker](https://www.docker.com/).
- LLM Provider either external [WatsonX](https://www.ibm.com/watsonx) (OpenAI, Groq, ...) or local [ollama](https://ollama.com).

## 🛠️ Getting started

1. Clone this repository or [use it as a template](https://github.com/new?template_name=beeai-framework-starter&template_owner=i-am-bee).
2. Install dependencies `npm ci`.
3. Configure your project by filling in missing values in the `.env` file (default LLM provider is locally hosted `Ollama`).
4. Run the agent `npm run start src/agent.ts`

To run an agent with a custom prompt, simply do this `npm run start src/agent.ts <<< 'Hello Bee!'`

🧪 More examples can be found [here](https://github.com/i-am-bee/beeai-framework/blob/main/examples).

> [!TIP]
>
> To use Bee agent with [Python Code Interpreter](https://github.com/i-am-bee/bee-code-interpreter) refer to the [Code Interpreter](#code-interpreter) section.

> [!TIP]
>
> To use Bee agent with [OpenInference Instrumentation for BeeAI](https://github.com/Arize-ai/openinference/tree/main/js/packages/openinference-instrumentation-beeai) refer to the [Observability](#observability) section.

## 🏗 Infrastructure

> [!NOTE]
>
> Docker distribution with support for _compose_ is required, the following are supported:
>
> - [Docker](https://www.docker.com/)
> - [Rancher](https://www.rancher.com/) - macOS users may want to use VZ instead of QEMU
> - [Podman](https://podman.io/) - requires [compose](https://podman-desktop.io/docs/compose/setting-up-compose) and **rootful machine** (if your current machine is rootless, please create a new one, also ensure you have enabled Docker compatibility mode).

## 🔒Code interpreter

The [Bee Code Interpreter](https://github.com/i-am-bee/bee-code-interpreter) is a gRPC service that an agent uses to execute an arbitrary Python code safely.

### Instructions

1. Start all services related to the [`Code Interpreter`](https://github.com/i-am-bee/bee-code-interpreter) `npm run infra:start --profile=code_interpreter`
2. Run the agent `npm run start src/agent_code_interpreter.ts`

> [!NOTE]
>
> Code Interpreter runs on `http://127.0.0.1:50081`.

## 🔎 Observability

Get complete visibility of the agent's inner workings via [OpenInference Instrumentation for BeeAI](https://github.com/Arize-ai/openinference/tree/main/js/packages/openinference-instrumentation-beeai).

### Instructions

> Please use node version >= 20 to run this example.

1. (Optional) In order to see spans in [Phoenix](https://github.com/Arize-ai/phoenix), begin running a Phoenix server. This can be done in one command using docker.

```
docker run -p 6006:6006 -i -t arizephoenix/phoenix
```

or via the command line:

```
brew install i-am-bee/beeai/arize-phoenix
brew services start arize-phoenix
```

see https://docs.beeai.dev/observability/agents-traceability for more details.

2. Run the agent `npm run start src/agent_observe.ts`
3. You should see your spans exported in your console. If you've set up a locally running Phoenix server, head to [**localhost:6006**](http://localhost:6006/projects) to see your spans.
