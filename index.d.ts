import type { OpenAICompatibleProvider, OpenAICompatibleProviderSettings } from '@ai-sdk/openai-compatible';

export interface CrowLLMProviderSettings {
  /** CrowLLM API key. Defaults to process.env.CROWLLM_API_KEY. */
  apiKey?: string;
  /** Defaults to https://crowllm.com/v1 */
  baseURL?: string;
  /** Extra headers sent with every request. */
  headers?: Record<string, string>;
}

export declare function createCrowLLM(settings?: CrowLLMProviderSettings): OpenAICompatibleProvider<string, string, string, string>;

export default createCrowLLM;
export type { OpenAICompatibleProvider, OpenAICompatibleProviderSettings };
