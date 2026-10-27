import { cacheLife } from "next/cache";

// Cache Components rejects `new Date()` during prerender. "use cache" captures the year into the
// static shell; it refreshes when the cache expires or on the next deploy.
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
