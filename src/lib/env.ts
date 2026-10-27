/**
 * The only place that reads `process.env` (AGENTS.md §5).
 *
 * `NEXT_PUBLIC_*` values must be read with their full literal name so Next.js can inline them
 * into the client bundle. `VERCEL_ENV` is set by Vercel on the server only; locally it is
 * undefined, which this app treats as "not production".
 */

type VercelEnv = "production" | "preview" | "development";

function requireUrl(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing environment variable ${name}. Add it to .env.local.`);
  }
  if (!URL.canParse(value)) {
    throw new Error(`${name} must be an absolute URL, received "${value}".`);
  }
  return value;
}

function parseVercelEnv(value: string | undefined): VercelEnv | undefined {
  if (value === "production" || value === "preview" || value === "development") {
    return value;
  }
  return undefined;
}

export const env = {
  NEXT_PUBLIC_APP_URL: requireUrl("NEXT_PUBLIC_APP_URL", process.env.NEXT_PUBLIC_APP_URL),
  NEXT_PUBLIC_API_URL: requireUrl("NEXT_PUBLIC_API_URL", process.env.NEXT_PUBLIC_API_URL),
  // Optional: Microsoft Clarity is skipped when this is not set.
  NEXT_PUBLIC_CLARITY_PROJECT_ID: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || undefined,
  VERCEL_ENV: parseVercelEnv(process.env.VERCEL_ENV),
} as const;

export const isProduction = env.VERCEL_ENV === "production";
