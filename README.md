# crowllm-ai-sdk

[CrowLLM](https://crowllm.com) provider for the [Vercel AI SDK](https://ai-sdk.dev). CrowLLM is an OpenAI-compatible gateway: one endpoint and one key for 180+ models, with a zero-rated `:free` shelf next to the paid ids.

## Install

```bash
npm install crowllm-ai-sdk @ai-sdk/openai-compatible
```

## Usage

```ts
import { createCrowLLM } from 'crowllm-ai-sdk';
import { generateText } from 'ai';

const crowllm = createCrowLLM({ apiKey: process.env.CROWLLM_API_KEY });

const { text } = await generateText({
  model: crowllm('deepseek-v4-flash'),
  prompt: 'Explain a CORS preflight in two sentences.',
});
```

The key can also come from `CROWLLM_API_KEY`; the base URL defaults to `https://crowllm.com/v1` and can be overridden with `baseURL`.

## Models

Any id from the public catalog works. Commonly used ids:

- `deepseek-v4-flash` — fast and cheap default
- `glm-5.3`, `kimi-k3` — coding-oriented
- `claude-opus-4-7`, `gpt-5.6-sol`, `gemini-3.7-flash` — frontier general models
- `qwen-3.8-27b:free` — zero-rated; ids ending in `:free` need no card

```bash
curl https://crowllm.com/v1/models
```

## License

MIT
