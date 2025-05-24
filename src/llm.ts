// import { createAiGateway } from "ai-gateway-provider";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

// const CLOUDFLARE_ACCOUNT_ID = Deno.env.get("CLOUDFLARE_ACCOUNT_ID");
// const CLOUDFLARE_AI_GATEWAY_ID = Deno.env.get("CLOUDFLARE_AI_GATEWAY_ID");
// const CLOUDFLARE_AI_GATEWAY_API_KEY = Deno.env.get(
//   "CLOUDFLARE_AI_GATEWAY_API_KEY",
// );
// if (
//   !CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_AI_GATEWAY_ID ||
//   !CLOUDFLARE_AI_GATEWAY_API_KEY
// ) {
//   throw new Error(
//     "Missing required environment variables for Cloudflare AI Gateway",
//   );
// }

const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");
if (!OPENROUTER_API_KEY) {
  throw new Error(
    "Missing required environment variables for OpenRouter",
  );
}

// const aigateway = createAiGateway({
//   accountId: CLOUDFLARE_ACCOUNT_ID,
//   gateway: CLOUDFLARE_AI_GATEWAY_ID,
//   apiKey: CLOUDFLARE_AI_GATEWAY_API_KEY,
// });

const openrouter = createOpenRouter({
  apiKey: OPENROUTER_API_KEY,
});

// export const model = aigateway([
//   openrouter("qwen/qwen3-32b:free", {
//     extraBody: {
//       provider: {
//         order: ["chutes", "open-inference/bf16"],
//       },
//     },
//   }), // Primary model
//   openrouter("qwen/qwen3-32b", {
//     extraBody: {
//       provider: {
//         only: ["cerebras"],
//       },
//     },
//   }), // Fallback model
// ]);

export const model = openrouter.chat("qwen/qwen3-32b", {
  extraBody: {
    provider: {
      only: ["cerebras"],
    },
  },
});
