import type { MetadataRoute } from "next";

import { env, isProduction } from "@/lib/env";

// Signed-in and auth screens (docs/AppFlow.md §1) have nothing worth indexing.
const privatePaths = [
  "/dashboard",
  "/workspaces",
  "/settings",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

export default function robots(): MetadataRoute.Robots {
  // Matches the robots meta in the root layout: only production may be crawled.
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: privatePaths },
    sitemap: new URL("/sitemap.xml", env.NEXT_PUBLIC_APP_URL).toString(),
  };
}
