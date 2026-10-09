import { chatCompletion } from "../src/server/openaiClient.ts";

async function testOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
  const baseUrl = process.env.OPENAI_BASE_URL?.trim() || "https://api.openai.com/v1";

  console.log("=== OpenAI API Connection Test ===");
  if (!apiKey) {
    console.error("❌ OPENAI_API_KEY is missing in .env");
    process.exit(1);
  }

  console.log(`📡 Base URL: ${baseUrl}`);
  console.log(`🤖 Model: ${model}`);
  console.log(`🔑 Key detected: Yes (${apiKey.length} chars, starts with "${apiKey.substring(0, 7)}...")`);

  try {
    console.log("⏳ Sending test ping completion request...");
    const start = Date.now();
    const reply = await chatCompletion([
      {
        role: "user",
        content: "Please reply with only: pong",
      },
    ]);
    const duration = Date.now() - start;

    console.log(`✅ Success! Response received in ${duration}ms:`);
    console.log(`   "${reply.trim()}"`);
    console.log("===================================");
  } catch (error) {
    console.error("❌ Request failed:");
    console.error(error instanceof Error ? error.message : error);
    console.log("===================================");
    process.exit(1);
  }
}

testOpenAI();
