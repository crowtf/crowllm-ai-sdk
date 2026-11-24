# crowllm-ai-sdk

[CrowLLM](https://crowllm.com) provider for the [Vercel AI SDK](https://ai-sdk.dev). CrowLLM is an OpenAI-compatible gateway: one endpoint and one key for models from several labs, with a `:free` shelf next to the paid ids (31 of the 39 free-suffixed ids billed at zero when this was written; the shelf rotates, so check `/api/pricing`).

## Install

```bash
npm install crowllm-ai-sdk @ai-sdk/openai-compatible
```

Prefer a pinned build from GitHub instead of npm:

```bash
npm install github:crowtf/crowllm-ai-sdk#v0.1.1 @ai-sdk/openai-compatible
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

## Releases

See [Releases](https://github.com/crowtf/crowllm-ai-sdk/releases); the latest tag installs with `npm install github:crowtf/crowllm-ai-sdk#v0.1.1`.


## License

MIT
