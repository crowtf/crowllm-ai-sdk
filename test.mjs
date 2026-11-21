import { createCrowLLM } from './index.js';

const provider = createCrowLLM({ apiKey: 'test-key' });
const model = provider('deepseek-v4-flash');
if (model.modelId !== 'deepseek-v4-flash') throw new Error('unexpected model id: ' + model.modelId);
if (model.provider !== 'crowllm.chat') throw new Error('unexpected provider: ' + model.provider);
if (provider.chatModel('qwen-3.8-27b:free').modelId !== 'qwen-3.8-27b:free') throw new Error('chatModel failed');
let threw = false;
try { createCrowLLM({}); } catch { threw = true; }
if (!threw) throw new Error('missing key should throw');
console.log('ok', model.provider, model.modelId);
