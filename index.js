import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

/**
 * Create a CrowLLM provider for the AI SDK.
 *
 * CrowLLM is an OpenAI-compatible gateway: one endpoint and one key for every
 * model, with a zero-rated `:free` shelf next to the paid ids.
 *
 * @param {{ apiKey?: string, baseURL?: string, headers?: Record<string, string> }} [settings]
 */
export function createCrowLLM(settings = {}) {
  const apiKey = settings.apiKey ?? process.env.CROWLLM_API_KEY;
  if (!apiKey) {
    throw new Error('CrowLLM API key is required: pass { apiKey } or set CROWLLM_API_KEY');
  }
  return createOpenAICompatible({
    name: 'crowllm',
    apiKey,
    baseURL: settings.baseURL ?? 'https://crowllm.com/v1',
    ...(settings.headers ? { headers: settings.headers } : {}),
  });
}

export default createCrowLLM;
