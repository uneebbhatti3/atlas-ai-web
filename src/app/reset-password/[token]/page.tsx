import type { Metadata } from "next";
import { ResetPasswordForm } from "@/features/(auth)/components/reset-password-form";
import { GalleryVerticalEndIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Set a new password for your Atlas AI account.",
  alternates: {
    canonical: "/reset-password",
  },
  openGraph: {
    title: "Reset password — Atlas AI",
    description: "Set a new password for your Atlas AI account.",
    url: "/reset-password",
  },
  twitter: {
    title: "Reset password — Atlas AI",
    description: "Set a new password for your Atlas AI account.",
  },
  // Token URLs must never be indexed — they are single-use and user-specific.
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
