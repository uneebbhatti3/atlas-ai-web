"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import useTogglePassword from "@/hooks/useTogglePassword";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const { showPassword, handleTogglePassword } = useTogglePassword();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign in to your account</CardTitle>
          <CardDescription>Enter your email below to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </Field>
              <Field>
                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Link href={"/forgot-password"} className="hover:underline">
                      Forgot password?
                    </Link>
                  </div>
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
                </Field>
                <FieldDescription>Must be at least 8 characters long.</FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Sign in</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/signup">Create one</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
