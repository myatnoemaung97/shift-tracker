"use server";

import { LoginSchema } from "@/app/lib/zod/schemas";
import { LoginState } from "@/app/lib/types";
import { redirect } from "next/navigation";
import { SignupSchema } from "@/app/lib/zod/schemas";
import { SignupState } from "@/app/lib/types";
import { createClient } from "@/app/lib/supabase/server";
import { prisma } from "@/app/lib/prisma";

export async function signup(
  prevState: SignupState | undefined,
  formData: FormData,
): Promise<SignupState> {
  const validatedFields = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values: {
        name: formData.get("name")?.toString() ?? "",
        email: formData.get("email")?.toString() ?? "",
      },
      message: "アカウントを作成できませんでした。入力内容を確認してください。",
      success: false,
    };
  }

  const { name, email, password } = validatedFields.data;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
      // emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return {
      values: { name, email },
      message: error.message,
      success: false,
    };
  }

  /**
   * If you also want to create a Prisma user row immediately, you can do it here.
   * But in many Supabase setups, it's better to create the app user after email verification
   * or based on the authenticated Supabase user ID.
   */

  if (data.user) {
    await prisma.user.create({
      data: {
        id: data.user.id,
        email,
        name,
      },
    });
  }

  return {
    message: "確認メールを送信しました。メールをご確認ください。",
    success: true,
  };
}

export async function login(
  _prevState: LoginState | undefined,
  formData: FormData,
): Promise<LoginState> {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values: {
        email: formData.get("email")?.toString() ?? "",
      },
      message: "ログインできませんでした。入力内容を確認してください。",
    };
  }

  const { email, password } = validatedFields.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      values: { email },
      message: "メールアドレスまたはパスワードが正しくありません。",
    };
  }

  redirect("/");
}

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return user;
}
