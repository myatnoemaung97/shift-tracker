"use server";

import { prisma } from "@/app/lib/prisma";
import { redirectAndRevalidate } from "@/app/lib/helpers";
import { CreateJob, UpdateJob } from "@/app/lib/zod/schemas";
import { JobState } from "@/app/lib/types";
import { createClient } from "@/app/lib/supabase/server";
import { cookies } from "next/headers";

export async function createJob(
  prevState: JobState | undefined,
  formData: FormData,
) {
  const validatedFields = CreateJob.safeParse({
    name: formData.get("name"),
    hourlyWage: formData.get("hourlyWage"),
    color: formData.get("color"),
    defaultStart: formData.get("defaultStart"),
    defaultEnd: formData.get("defaultEnd"),
    defaultRestMinutes: formData.get("defaultRestMinutes"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values: {
        name: formData.get("name")?.toString() ?? "",
        hourlyWage: formData.get("hourlyWage")?.toString() ?? "",
        color: formData.get("color")?.toString() ?? "",
        defaultStart: formData.get("defaultStart")?.toString() ?? "",
        defaultEnd: formData.get("defaultEnd")?.toString() ?? "",
        defaultRestMinutes:
          formData.get("defaultRestMinutes")?.toString() ?? "",
      },
      message: "勤務先を作成できませんでした。入力内容を確認してください。",
    };
  }

  const {
    name,
    hourlyWage,
    color,
    defaultStart,
    defaultEnd,
    defaultRestMinutes,
  } = validatedFields.data;

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { message: "ログインが必要です。" };
  }
  if (user) {
    try {
      await prisma.job.create({
        data: {
          name: name,
          hourlyWage: hourlyWage,
          color: color,
          userId: user.id,
          defaultStart: defaultStart?.toString() || null,
          defaultEnd: defaultEnd?.toString() || null,
          defaultRestMinutes: defaultRestMinutes || null,
        },
      });
    } catch (error) {
      console.error(error);
      return {
        message: "勤務先を作成できませんでした。入力内容を確認してください。",
      };
    }
  }

  (await cookies()).set("toast", "勤務先を作成しました。", { maxAge: 3 });
  redirectAndRevalidate("/jobs");
}

export async function updateJob(
  id: string,
  prevState: JobState | undefined,
  formData: FormData,
) {
  const validatedFields = UpdateJob.safeParse({
    name: formData.get("name"),
    hourlyWage: formData.get("hourlyWage"),
    color: formData.get("color"),
    defaultStart: formData.get("defaultStart"),
    defaultEnd: formData.get("defaultEnd"),
    defaultRestMinutes: formData.get("defaultRestMinutes"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values: {
        name: formData.get("name")?.toString() ?? "",
        hourlyWage: formData.get("hourlyWage")?.toString() ?? "",
        color: formData.get("color")?.toString() ?? "",
        defaultStart: formData.get("defaultStart")?.toString() ?? "",
        defaultEnd: formData.get("defaultEnd")?.toString() ?? "",
        defaultRestMinutes:
          formData.get("defaultRestMinutes")?.toString() ?? "",
      },
      message: "勤務先を更新できませんでした。入力内容を確認してください。",
    };
  }

  const {
    name,
    hourlyWage,
    color,
    defaultStart,
    defaultEnd,
    defaultRestMinutes,
  } = validatedFields.data;

  try {
    await prisma.job.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        hourlyWage: hourlyWage,
        color: color,
        defaultStart: defaultStart?.toString() || null,
        defaultEnd: defaultEnd?.toString() || null,
        defaultRestMinutes: defaultRestMinutes || null,
      },
    });
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to Update Invoice." };
  }

  (await cookies()).set("toast", "勤務先を更新しました。", { maxAge: 3 });
  redirectAndRevalidate("/jobs");
}

export async function archiveJob(id: string) {
  await prisma.job.update({
    where: {
      id,
    },
    data: {
      archivedAt: new Date(),
    },
  });

  (await cookies()).set("toast", "勤務先を非表示にしました。", { maxAge: 3 });
  redirectAndRevalidate("/jobs");
}

export async function restoreJob(id: string) {
  await prisma.job.update({
    where: {
      id,
    },
    data: {
      archivedAt: null,
    },
  });

  (await cookies()).set("toast", "勤務先を復元しました。", { maxAge: 3 });
  redirectAndRevalidate("/settings");
}
