import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/features/(auth)/components/forgot-password-form";
import { GalleryVerticalEndIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Forgot password",
  description:
    "Reset your Atlas AI password. Enter your email address and we'll send you a secure link to choose a new one.",
  alternates: {
    canonical: "/forgot-password",
  },
  openGraph: {
    title: "Forgot password — Atlas AI",
    description:
      "Enter your email address and we'll send you a secure link to reset your Atlas AI password.",
    url: "/forgot-password",
  },
  twitter: {
    title: "Forgot password — Atlas AI",
    description:
      "Enter your email address and we'll send you a secure link to reset your Atlas AI password.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
