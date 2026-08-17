import React from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://atlasai.app";
const SITE_NAME = "Atlas AI";
const SITE_DESCRIPTION =
  "A personal knowledge workspace for organizing documents, building searchable knowledge bases, and exploring retrieval-augmented AI — designed as a long-term engineering laboratory.";

/**
 * Root metadata — inherited and overridden by every page.
 * Pages should export their own `metadata` to set title/description/og.
 */
export const metadata: Metadata = {
  // --- Indexing base URL (resolves relative paths in og:image etc.) ---
  metadataBase: new URL(SITE_URL),

  // --- Title ---
  // Pages override `title` with a string; the template adds the site name.
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },

  // --- Core ---
  description: SITE_DESCRIPTION,
  keywords: [
    "Atlas AI",
    "knowledge workspace",
    "document management",
    "retrieval-augmented generation",
    "RAG",
    "vector search",
    "embeddings",
    "AI workspace",
    "personal knowledge base",
    "engineering laboratory",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Uneeb Bhatti" }],
  creator: "Uneeb Bhatti",
  publisher: "Atlas AI",
  category: "Technology",

  // --- Canonical + alternates ---
  alternates: {
    canonical: "/",
  },

  // --- Open Graph ---
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: {
      default: SITE_NAME,
      template: `%s — ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Atlas AI — personal knowledge workspace",
        type: "image/png",
      },
    ],
  },

  // --- Twitter / X ---
  twitter: {
    card: "summary_large_image",
    site: "@atlasai",
    creator: "@uneebbhatti",
    title: {
      default: SITE_NAME,
      template: `%s — ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/twitter-image.png",
        width: 1200,
        height: 628,
        alt: "Atlas AI — personal knowledge workspace",
      },
    ],
  },

  // --- Icons ---
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },

  // --- PWA manifest ---
  manifest: "/manifest.json",

  // --- Robots ---
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/** Viewport is exported separately — Next.js 14+ recommendation. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EDE7D8" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1D29" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", inter.variable, geistSans.variable, geistMono.variable)}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
