import { JobColor } from "@/app/generated/prisma/browser";
import { z } from "zod";

/**
 * HH:mm format
 * examples: 09:00, 17:30, 23:59
 */
const timeString = z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
  error: "時刻を入力してください。",
});

/**
 * Convert blank number input ("") to undefined.
 * Useful for optional form fields like defaultRestMinutes.
 */
const optionalNonNegativeNumber = z
  .union([z.coerce.number(), z.literal("")])
  .transform((value) => (value === "" ? undefined : value))
  .pipe(
    z
      .number()
      .min(0, {
        error: "0以上の値を入力してください。",
      })
      .optional(),
  );

/**
 * Convert blank number input ("") to 0.
 * Useful for shift restMinutes where empty should mean 0.
 */
const nonNegativeNumberWithBlankAsZero = z
  .union([z.coerce.number(), z.literal("")])
  .transform((value) => (value === "" ? 0 : value))
  .pipe(
    z.number().min(0, {
      error: "0以上の値を入力してください。",
    }),
  );

/* =========================
   Job
========================= */

export const Job = z.object({
  id: z.string(),
  name: z.string().trim().min(1, {
    error: "勤務先の名前は必須です。",
  }),
  hourlyWage: z.coerce.number().gt(0, {
    error: "時給は0より大きい必要があります。",
  }),
  color: z.nativeEnum(JobColor),
  defaultStart: timeString.optional().or(z.literal("")),
  defaultEnd: timeString.optional().or(z.literal("")),
  defaultRestMinutes: optionalNonNegativeNumber,
  userId: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

/**
 * For create form input
 */
export const CreateJob = z.object({
  name: z.string().trim().min(1, {
    error: "勤務先の名前は必須です。",
  }),
  hourlyWage: z.coerce.number().gt(0, {
    error: "時給は0より大きい必要があります。",
  }),
  color: z.nativeEnum(JobColor, {
    error: "色を選択してください。",
  }),
  defaultStart: z.union([timeString, z.literal("")]).optional(),
  defaultEnd: z.union([timeString, z.literal("")]).optional(),
  defaultRestMinutes: optionalNonNegativeNumber,
});

/**
 * For update form input
 * same shape as CreateJob for now
 */
export const UpdateJob = CreateJob;

/* =========================
   Shift
========================= */

export const Shift = z.object({
  id: z.string(),
  jobId: z.string().trim().min(1, {
    error: "勤務先を選択してください。",
  }),
  start: z.iso.datetime(),
  end: z.iso.datetime(),
  restMinutes: z.coerce.number().min(0, {
    error: "休憩時間は0以上である必要があります。",
  }),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const SignupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "氏名を入力してください。")
      .max(100, "氏名が長すぎます。"),

    email: z
      .string()
      .trim()
      .pipe(z.email("正しいメールアドレスを入力してください。")),

    password: z.string().min(6, "パスワードは6文字以上で入力してください。"),

    confirmPassword: z.string().min(1, "確認用パスワードを入力してください。"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "パスワードが一致しません。",
  });

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .pipe(z.email("正しいメールアドレスを入力してください。")),
  password: z.string().min(1, "パスワードを入力してください。"),
});

/**
 * For create shift form input
 * start/end are HH:mm strings from <input type="time" />
 */
export const CreateShift = z
  .object({
    jobId: z.string().trim().min(1, {
      error: "勤務先を選択してください。",
    }),
    start: timeString,
    end: timeString,
    restMinutes: nonNegativeNumberWithBlankAsZero,
  })
  .superRefine((data, ctx) => {
    const [startHours, startMinutes] = data.start.split(":").map(Number);
    const [endHours, endMinutes] = data.end.split(":").map(Number);

    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    if (endTotalMinutes <= startTotalMinutes) {
      ctx.addIssue({
        code: "custom",
        path: ["end"],
        message: "終了時間は開始時間より後である必要があります。",
      });
      return;
    }

    const workedMinutes = endTotalMinutes - startTotalMinutes;

    if (data.restMinutes > workedMinutes) {
      ctx.addIssue({
        code: "custom",
        path: ["restMinutes"],
        message: "休憩時間が勤務時間を超えています。",
      });
    }
  });

/**
 * For update shift form input
 * same shape as CreateShift for now
 */
export const UpdateShift = CreateShift;

/* =========================
   Inferred TS types (optional but useful)
========================= */

export type JobInput = z.infer<typeof Job>;
export type CreateJobInput = z.infer<typeof CreateJob>;
export type UpdateJobInput = z.infer<typeof UpdateJob>;

export type ShiftInput = z.infer<typeof Shift>;
export type CreateShiftInput = z.infer<typeof CreateShift>;
export type UpdateShiftInput = z.infer<typeof UpdateShift>;
