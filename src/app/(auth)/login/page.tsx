import { LoginForm } from "@/features/(auth)/components/login-form";
import type { Metadata } from "next";

/**
 * Metadata for the Login route.
 *
 * Lives in a layout (Server Component) because the page itself is a Client
 * Component and Next.js does not allow `export const metadata` there.
 */
export const metadata: Metadata = {
  // Rendered by the root title template as: "Sign in — Atlas AI"
  title: "Sign in",

  description:
    "Sign in to your Atlas AI account. Access your workspace, organise your documents, and continue building your personal knowledge base ready for retrieval-augmented AI.",

  // Canonical URL for this page
  alternates: {
    canonical: "/login",
  },

  // Open Graph — controls how the link unfurls on social platforms
  openGraph: {
    title: "Sign in to Atlas AI",
    description:
      "Log in and access your personal knowledge workspace. Organise documents, run a RAG pipeline, and explore AI — one layer at a time.",
    url: "/login",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Atlas AI — sign in and continue building",
      },
    ],
  },

  // Twitter / X card
  twitter: {
    title: "Sign in to Atlas AI",
    description:
      "Log in and access your personal knowledge workspace. Organise documents, run a RAG pipeline, and explore AI — one layer at a time.",
    images: ["/twitter-image.png"],
  },

  // Prevent search engines from indexing the auth flow itself.
  // The product and its value are explained on the homepage.
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
