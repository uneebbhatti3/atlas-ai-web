import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

// Only public routes belong here. Add marketing pages as they ship.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL("/", env.NEXT_PUBLIC_APP_URL).toString(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
