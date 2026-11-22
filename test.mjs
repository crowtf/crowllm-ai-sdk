import { createServer } from 'node:http';

import { generateText } from 'ai';

import { createCrowLLM } from './index.js';

const provider = createCrowLLM({ apiKey: 'test-key' });
const model = provider('deepseek-v4-flash');
if (model.modelId !== 'deepseek-v4-flash') throw new Error('unexpected model id: ' + model.modelId);
if (model.provider !== 'crowllm.chat') throw new Error('unexpected provider: ' + model.provider);
if (provider.chatModel('qwen-3.8-27b:free').modelId !== 'qwen-3.8-27b:free') throw new Error('chatModel failed');
let threw = false;
try { createCrowLLM({}); } catch { threw = true; }
if (!threw) throw new Error('missing key should throw');

// Wire-level check against a local OpenAI-compatible mock: the base URL, the
// bearer token and the request body are what a real CrowLLM call would send.
let seenAuth = '';
let seenModel = '';
const server = createServer((req, res) => {
  let body = '';
  req.on('data', (chunk) => (body += chunk));
  req.on('end', () => {
    if (req.url !== '/v1/chat/completions') {
      res.writeHead(404);
      res.end(JSON.stringify({ error: { message: 'not found' } }));
      return;
    }
    seenAuth = req.headers.authorization ?? '';
    seenModel = JSON.parse(body).model;
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(
      JSON.stringify({
        id: 'chatcmpl-mock',
        object: 'chat.completion',
        created: 1,
        model: seenModel,
        choices: [{ index: 0, message: { role: 'assistant', content: 'hello from mock' }, finish_reason: 'stop' }],
        usage: { prompt_tokens: 1, completion_tokens: 3, total_tokens: 4 },
      })
    );
  });
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();
const mockProvider = createCrowLLM({ apiKey: 'test-key', baseURL: `http://127.0.0.1:${port}/v1` });
const { text } = await generateText({ model: mockProvider('deepseek-v4-flash'), prompt: 'hi' });
server.close();

if (text !== 'hello from mock') throw new Error('unexpected mock response: ' + text);
if (seenAuth !== 'Bearer test-key') throw new Error('unexpected Authorization header: ' + seenAuth);
if (seenModel !== 'deepseek-v4-flash') throw new Error('unexpected wire model: ' + seenModel);

console.log('ok', model.provider, model.modelId, '| wire:', seenAuth, seenModel);
