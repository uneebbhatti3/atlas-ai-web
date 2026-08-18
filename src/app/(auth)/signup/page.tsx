import { SignupForm } from "@/features/(auth)/components/signup-form";
import type { Metadata } from "next";

/**
 * Metadata for the Sign Up route.
 *
 * Lives in a layout (Server Component) because the page itself is a Client
 * Component and Next.js does not allow `export const metadata` there.
 */
export const metadata: Metadata = {
  // Rendered by the root title template as: "Sign up — Atlas AI"
  title: "Sign up",

  description:
    "Create your free Atlas AI account. Set up a workspace, organise your documents into projects, and build a personal knowledge base ready for retrieval-augmented AI.",

  // Canonical URL for this page
  alternates: {
    canonical: "/signup",
  },

  // Open Graph — controls how the link unfurls on social platforms
  openGraph: {
    title: "Sign up for Atlas AI",
    description:
      "Create an account and start building your personal knowledge workspace. Organise documents, run a RAG pipeline, and explore AI — one layer at a time.",
    url: "/signup",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Atlas AI — sign up and start building",
      },
    ],
  },

  // Twitter / X card
  twitter: {
    title: "Sign up for Atlas AI",
    description:
      "Create an account and start building your personal knowledge workspace. Organise documents, run a RAG pipeline, and explore AI — one layer at a time.",
    images: ["/twitter-image.png"],
  },

  // Prevent search engines from indexing the auth flow itself.
  // The product and its value are explained on the homepage.
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <SignupForm />
      </div>
    </div>
  );
}
