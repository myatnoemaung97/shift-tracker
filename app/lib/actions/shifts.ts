'use server';

import { revalidatePath } from "next/cache";
import { CreateShift } from "@/app/lib/zod/schemas";
import { ShiftState } from "@/app/lib/types";
import { prisma } from "@/app/lib/prisma";
import { redirectAndRevalidate } from "@/app/lib/helpers";

export async function createShift(
  date: Date,
  _prevState: ShiftState | undefined,
  formData: FormData,
) {
  console.log("createShift");
  const validatedFields = CreateShift.safeParse({
    jobId: formData.get("jobId"),
    start: formData.get("start"),
    end: formData.get("end"),
    restMinutes: formData.get("restMinutes"),
  });

  if (!validatedFields.success) {
    return {
      message: "シフトを作成できませんでした。入力内容を確認してください。",
      errors: validatedFields.error.flatten().fieldErrors,
      values: {
        jobId: formData.get("jobId")?.toString() ?? "",
        start: formData.get("start")?.toString() ?? "",
        end: formData.get("end")?.toString() ?? "",
        restMinutes: formData.get("restMinutes")?.toString() ?? "",
      },
    };
  }

  const { jobId, start, end, restMinutes } = validatedFields.data;

  const [startHours, startMinutes] = start.split(":").map(Number);
  const [endHours, endMinutes] = end.split(":").map(Number);

  const startDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    startHours,
    startMinutes,
  );

  const endDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    endHours,
    endMinutes,
  );

  try {
    await prisma.shift.create({
      data: {
        jobId,
        start: startDate,
        end: endDate,
        restMinutes,
      },
    });
  } catch (error) {
    console.error(error);

    return {
      message: "シフトを作成できませんでした。",
      errors: {},
      values: {
        jobId,
        start,
        end,
        restMinutes: restMinutes.toString(),
      },
    };
  }

  redirectAndRevalidate(
    `/shifts?year=${date.getFullYear()}&month=${date.getMonth() + 1}&selected=${date.getDate()}`,
  );
}

export async function updateShift(
  id: string,
  date: Date,
  _prevState: ShiftState | undefined,
  formData: FormData,
) {
  console.log("updateShift");

  const validatedFields = CreateShift.safeParse({
    jobId: formData.get("jobId"),
    start: formData.get("start"),
    end: formData.get("end"),
    restMinutes: formData.get("restMinutes"),
  });

  if (!validatedFields.success) {
    return {
      message: "シフトを更新できませんでした。入力内容を確認してください。",
      errors: validatedFields.error.flatten().fieldErrors,
      values: {
        jobId: formData.get("jobId")?.toString() ?? "",
        start: formData.get("start")?.toString() ?? "",
        end: formData.get("end")?.toString() ?? "",
        restMinutes: formData.get("restMinutes")?.toString() ?? "",
      },
    };
  }

  const { jobId, start, end, restMinutes } = validatedFields.data;

  const [startHours, startMinutes] = start.split(":").map(Number);
  const [endHours, endMinutes] = end.split(":").map(Number);

  const startDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    startHours,
    startMinutes,
  );

  const endDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    endHours,
    endMinutes,
  );

  try {
    await prisma.shift.update({
      where: { id },
      data: {
        jobId,
        start: startDate,
        end: endDate,
        restMinutes,
      },
    });
  } catch (error) {
    console.error(error);

    return {
      message: "シフトを更新できませんでした。",
      errors: {},
      values: {
        jobId,
        start,
        end,
        restMinutes: restMinutes.toString(),
      },
    };
  }

  redirectAndRevalidate(
    `/shifts?year=${date.getFullYear()}&month=${date.getMonth() + 1}&selected=${date.getDate()}`,
  );
}

export async function deleteShift(id: string, year: number, month: number) {
  console.log("deleteShift");
  await prisma.shift.delete({
    where: {
      id: id,
    },
  });

  revalidatePath(`/shifts?year=${year}&month=${month}`);
}
