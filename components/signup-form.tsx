"use client";

import * as React from "react";
import { useActionState } from "react";
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
import { signup } from "@/app/lib/actions/auth";
import { SignupState } from "@/app/lib/types";
import Link from "next/link";

const initialState: SignupState = {
  errors: {},
  values: {
    name: "",
    email: "",
  },
  message: "",
  success: false,
};

export function SignupForm(props: React.ComponentProps<typeof Card>) {
  const [state, formAction, pending] = useActionState(signup, initialState);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>アカウント作成</CardTitle>
        <CardDescription>
          以下の情報を入力してアカウントを作成してください
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">氏名</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="山田 太郎"
                defaultValue={state.values?.name ?? ""}
                aria-invalid={!!state.errors?.name}
              />
              {state.errors?.name?.map((error) => (
                <FieldDescription key={error} className="text-destructive">
                  {error}
                </FieldDescription>
              ))}
            </Field>

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
              <FieldDescription>
                ご連絡のために使用します。メールアドレスを第三者に共有することはありません。
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">パスワード</FieldLabel>
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
              <FieldDescription>8文字以上で入力してください。</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">
                パスワード（確認用）
              </FieldLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                aria-invalid={!!state.errors?.confirmPassword}
              />
              {state.errors?.confirmPassword?.map((error) => (
                <FieldDescription key={error} className="text-destructive">
                  {error}
                </FieldDescription>
              ))}
              <FieldDescription>
                確認のため、もう一度パスワードを入力してください。
              </FieldDescription>
            </Field>

            {state.message && (
              <FieldDescription
                className={
                  state.success ? "text-green-600" : "text-destructive"
                }
              >
                {state.message}
              </FieldDescription>
            )}

            <Field>
              <Button className="bg-indigo-500 hover:bg-indigo-600" type="submit" disabled={pending}>
                {pending ? "作成中..." : "アカウントを作成"}
              </Button>

              <FieldDescription className="px-6 text-center">
                すでにアカウントをお持ちですか？{" "}
                <Link href="/login">ログイン</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
