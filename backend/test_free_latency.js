const OpenAI = require("openai");
require('dotenv').config();

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function testModel(modelName) {
  const start = Date.now();
  try {
    const completion = await client.chat.completions.create({
      model: modelName,
      max_tokens: 150,
      messages: [
        { role: "user", content: "Say hello in one word." }
      ]
    });
    console.log(`[${modelName}] Success in ${((Date.now() - start)/1000).toFixed(2)}s:`, completion.choices[0].message.content.trim());
  } catch (err) {
    console.log(`[${modelName}] Failed in ${((Date.now() - start)/1000).toFixed(2)}s:`, err.message);
  }
}

async function main() {
  await testModel("meta-llama/llama-3.2-3b-instruct:free");
  await testModel("meta-llama/llama-3.3-70b-instruct:free");
  await testModel("deepseek/deepseek-v4-flash:free");
}
main();
