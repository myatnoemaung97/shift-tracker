"use client";

import * as React from "react";
import { useActionState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { login } from "@/app/lib/actions/auth";
import { LoginState } from "@/app/lib/types";

const initialState: LoginState = {
  errors: {},
  values: {
    email: "",
  },
  message: "",
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>ログイン</CardTitle>
          <CardDescription>
            メールアドレスとパスワードを入力してください
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">メールアドレス</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  defaultValue={state.values?.email ?? ""}
                  aria-invalid={!!state.errors?.email}
                />
                {state.errors?.email?.map((error) => (
                  <FieldDescription key={error} className="text-destructive">
                    {error}
                  </FieldDescription>
                ))}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">パスワード</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    パスワードをお忘れですか？
                  </Link>
                </div>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  aria-invalid={!!state.errors?.password}
                />
                {state.errors?.password?.map((error) => (
                  <FieldDescription key={error} className="text-destructive">
                    {error}
                  </FieldDescription>
                ))}
              </Field>

              {state.message && (
                <FieldDescription className="text-destructive">
                  {state.message}
                </FieldDescription>
              )}

              <Field>
                <Button
                  className="bg-indigo-500 hover:bg-indigo-600"
                  type="submit"
                  disabled={pending}
                >
                  {pending ? "ログイン中..." : "ログイン"}
                </Button>

                {/* <Button variant="outline" type="button" disabled>
                  Googleでログイン
                </Button> */}

                <FieldDescription className="text-center">
                  アカウントをお持ちでないですか？{" "}
                  <Link href="/signup">新規登録</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
