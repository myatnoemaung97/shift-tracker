"use server";
import { prisma } from "@/app/lib/prisma";
import { z } from "zod";
import { colorMap } from "@/app/lib/colorMap";
import { redirectAndRevalidate } from "@/app/lib/helpers";

const Job = z.object({
  id: z.string(),
  name: z.string().trim().min(1, {
    error: "勤務先の名前は必須です。",
  }),
  hourlyWage: z.coerce.number().gt(0, {
    error: "時給は0以上である必要があります。",
  }),
  color: z.literal(Object.keys(colorMap), {
    error: "色を選択してください。",
  }),
  defaultStart: z.string().optional(),
  defaultEnd: z.string().optional(),
  defaultRestMinutes: z.coerce.number().optional(),
  userId: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

const CreateJob = Job.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

const UpdateJob = Job.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export type State = {
  errors?: {
    name?: string[];
    hourlyWage?: string[];
    color?: string[];
  };
  values?: {
    name?: string;
    hourlyWage?: string;
    color?: string;
    defaultStart?: string;
    defaultEnd?: string;
    defaultRestMinutes?: string;
  };
  message?: string | null;
};

export async function createJob(
  prevState: State | undefined,
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

  const user = await prisma.user.findFirst();

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

  redirectAndRevalidate("/jobs");
}

export async function updateJob(
  id: string,
  prevState: State | undefined,
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

  redirectAndRevalidate("/jobs");
}

export async function deleteJob(id: string) {
  await prisma.job.delete({
    where: {
      id: id,
    },
  });

  redirectAndRevalidate("/jobs");
}
