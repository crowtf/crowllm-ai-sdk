# crowllm-ai-sdk

[CrowLLM](https://crowllm.com) provider for the [Vercel AI SDK](https://ai-sdk.dev). CrowLLM is an OpenAI-compatible gateway: one endpoint and one key for 180+ models, with a `:free` shelf next to the paid ids (31 of the 40 `:free` ids were zero-rated on 2026-11-22).

## Install

```bash
npm install crowllm-ai-sdk @ai-sdk/openai-compatible
```

Until the npm release is out, install the tagged build straight from GitHub:

```bash
npm install github:crowwdev/crowllm-ai-sdk#v0.1.0 @ai-sdk/openai-compatible
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
- `grok-4.7:free` — zero-rated; the `:free` suffix is a good signal but not a guarantee, check `/api/pricing` before relying on one

```bash
curl https://crowllm.com/v1/models
```

## License

MIT
