import { buildLlmsTxt } from "@/features/landing";

// No request-time APIs, so Next.js prerenders this at build time.
export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
