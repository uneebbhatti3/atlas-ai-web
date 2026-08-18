"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import useTogglePassword from "@/hooks/useTogglePassword";

export function ResetPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
  const { showPassword, handleTogglePassword } = useTogglePassword();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Set a new password</CardTitle>
          <CardDescription>Choose a strong password for your Atlas AI account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="password">New password</FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                  />
                  {showPassword ? (
                    <EyeOff
                      className="absolute top-2 right-2 w-5 h-5 cursor-pointer"
                      onClick={handleTogglePassword}
                    />
                  ) : (
                    <Eye
                      className="absolute top-2 right-2 w-5 h-5 cursor-pointer"
                      onClick={handleTogglePassword}
                    />
                  )}
                </div>
                <FieldDescription>Must be at least 8 characters long.</FieldDescription>
              </Field>
              <Field>
                <Button type="submit" className="w-full">
                  Reset password
                </Button>
                <FieldDescription className="text-center">
                  Back to <Link href="/login">sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
