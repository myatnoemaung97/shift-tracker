"use server";

import { cookies } from "next/headers";
import { prisma } from "@/app/lib/prisma";
import { createClient } from "@/app/lib/supabase/server";
import { redirectAndRevalidate } from "@/app/lib/helpers";
import { CreateHoliday, UpdateHoliday } from "@/app/lib/zod/schemas";
import type { HolidayState } from "@/app/lib/types";

/* ===========================
   Create Holiday
=========================== */

export async function createHoliday(
  prevState: HolidayState | undefined,
  formData: FormData,
) {
  const validatedFields = CreateHoliday.safeParse({
    name: formData.get("name"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values: {
        name: formData.get("name")?.toString() ?? "",
        startDate: formData.get("startDate")?.toString() ?? "",
        endDate: formData.get("endDate")?.toString() ?? "",
      },
      message: "長期休暇を作成できませんでした。",
    };
  }

  const { name, startDate, endDate } = validatedFields.data;

  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      errors: {},
      values: {},
      message: "ログインが必要です。",
    };
  }

  try {
    await prisma.holidayPeriod.create({
      data: {
        name,
        startDate,
        endDate,
        userId: user.id,
      },
    });
  } catch (err) {
    console.error(err);

    return {
      errors: {},
      values: {
        name,
        startDate: formData.get("startDate")?.toString() ?? "",
        endDate: formData.get("endDate")?.toString() ?? "",
      },
      message: "長期休暇を作成できませんでした。",
    };
  }

  (await cookies()).set("toast", "長期休暇を追加しました。", {
    maxAge: 3,
  });

  redirectAndRevalidate("/settings");
}

/* ===========================
   Update Holiday
=========================== */

export async function updateHoliday(
  id: string,
  prevState: HolidayState | undefined,
  formData: FormData,
) {
  const validatedFields = UpdateHoliday.safeParse({
    name: formData.get("name"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values: {
        name: formData.get("name")?.toString() ?? "",
        startDate: formData.get("startDate")?.toString() ?? "",
        endDate: formData.get("endDate")?.toString() ?? "",
      },
      message: "長期休暇を更新できませんでした。",
    };
  }

  const { name, startDate, endDate } = validatedFields.data;

  try {
    await prisma.holidayPeriod.update({
      where: {
        id,
      },
      data: {
        name,
        startDate,
        endDate,
      },
    });
  } catch (err) {
    console.error(err);

    return {
      errors: {},
      values: {
        name,
        startDate: formData.get("startDate")?.toString() ?? "",
        endDate: formData.get("endDate")?.toString() ?? "",
      },
      message: "長期休暇を更新できませんでした。",
    };
  }

  (await cookies()).set("toast", "長期休暇を更新しました。", {
    maxAge: 3,
  });

  redirectAndRevalidate("/settings");
}

export async function deleteHoliday(id: string) {
  await prisma.holidayPeriod.delete({
    where: {
      id,
    },
  });

  (await cookies()).set("toast", "長期休暇を削除しました。", {
    maxAge: 3,
  });

  redirectAndRevalidate("/settings");
}
