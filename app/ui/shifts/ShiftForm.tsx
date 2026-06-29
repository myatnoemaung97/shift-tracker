"use client";

import type { Job } from "@/app/generated/prisma/browser";
import { dateToWeekday, getHolidayName } from "@/app/lib/calendarUtils";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { clsx } from "clsx";
import { colorMap } from "@/app/lib/colorMap";
import { useActionState } from "react";
import type { ShiftState } from "@/app/lib/types";

type ShiftFormValues = {
  jobId?: string;
  start?: string;
  end?: string;
  restMinutes?: string;
};

type ShiftFormProps = {
  jobs: Job[];
  date: Date;
  mode: "create" | "edit";
  action: (
    state: ShiftState | undefined,
    formData: FormData,
  ) => Promise<ShiftState | undefined>;
  initialValues?: ShiftFormValues;
  trigger: React.ReactNode;
};

export default function ShiftForm({
  jobs,
  date,
  mode,
  action,
  initialValues,
  trigger,
}: ShiftFormProps) {
  const holiday = getHolidayName(date);
  const weekday = dateToWeekday(date);
  const weekend = date.getDay() === 0 || date.getDay() === 6;

  const initialState: ShiftState = {
    message: null,
    errors: {},
    values: initialValues ?? {},
  };

  const [state, formAction, pending] = useActionState(action, initialState);

  const isEdit = mode === "edit";

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle className="font-semibold">
              {isEdit ? "シフトを編集" : "シフトを作成"}
            </DialogTitle>

            <DialogDescription
              className={clsx(
                "font-semibold",
                (holiday || weekend) && "text-red-500",
              )}
            >
              {`${date.toLocaleDateString()} (${weekday})`}
              {holiday && <span> · {holiday}</span>}
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-3">
            {/* job */}
            <Field>
              <Label htmlFor="jobId">
                勤務先<span className="text-red-500 text-xs">(必須)</span>
              </Label>

              <Select
                name="jobId"
                defaultValue={state?.values.jobId ?? initialValues?.jobId ?? ""}
              >
                <SelectTrigger
                  id="jobId"
                  className={clsx(
                    "w-full",
                    state?.errors.jobId && "border-red-500",
                  )}
                  aria-invalid={!!state?.errors.jobId}
                  aria-describedby={
                    state?.errors.jobId ? "jobId-error" : undefined
                  }
                >
                  <SelectValue placeholder="勤務先を選択" />
                </SelectTrigger>

                <SelectContent position="popper">
                  <SelectGroup>
                    {jobs.map(
                      (job) =>
                        (!job.archived || mode === 'edit') && ( 
                          <SelectItem key={job.id} value={job.id}>
                            <div className="flex items-center gap-2">
                              <div
                                className={clsx(
                                  "size-2 rounded-full",
                                  colorMap[job.color].background,
                                )}
                              />
                              <span className={clsx({
                                "text-muted-foreground": job.archived,
                              })}>
                                {job.name}
                                { job.archived && <span className="text-muted-foreground">（アーカイブ済み）</span> }
                              </span>
                            </div>
                          </SelectItem>
                        ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {state?.errors.jobId?.[0] && (
                <p id="jobId-error" className="mt-1 text-xs text-red-500">
                  {state?.errors.jobId[0]}
                </p>
              )}
            </Field>

            {/* start */}
            <Field>
              <Label htmlFor="start">
                開始時間<span className="text-red-500 text-xs">(必須)</span>
              </Label>
              <Input
                type="time"
                id="start"
                name="start"
                defaultValue={state?.values.start ?? initialValues?.start ?? ""}
                className={clsx(state?.errors.start && "border-red-500")}
                aria-invalid={!!state?.errors.start}
                aria-describedby={
                  state?.errors.start ? "start-error" : undefined
                }
              />
              {state?.errors.start?.[0] && (
                <p id="start-error" className="mt-1 text-xs text-red-500">
                  {state?.errors.start[0]}
                </p>
              )}
            </Field>

            {/* end */}
            <Field>
              <Label htmlFor="end">
                終了時間<span className="text-red-500 text-xs">(必須)</span>
              </Label>
              <Input
                type="time"
                id="end"
                name="end"
                defaultValue={state?.values.end ?? initialValues?.end ?? ""}
                className={clsx(state?.errors.end && "border-red-500")}
                aria-invalid={!!state?.errors.end}
                aria-describedby={state?.errors.end ? "end-error" : undefined}
              />
              {state?.errors.end?.[0] && (
                <p id="end-error" className="mt-1 text-xs text-red-500">
                  {state?.errors.end[0]}
                </p>
              )}
            </Field>

            {/* rest */}
            <Field>
              <Label htmlFor="restMinutes">休憩時間(分)</Label>
              <Input
                type="number"
                id="restMinutes"
                name="restMinutes"
                min={0}
                defaultValue={
                  state?.values.restMinutes ?? initialValues?.restMinutes ?? ""
                }
                className={clsx(state?.errors.restMinutes && "border-red-500")}
                aria-invalid={!!state?.errors.restMinutes}
                aria-describedby={
                  state?.errors.restMinutes ? "restMinutes-error" : undefined
                }
              />
              {state?.errors.restMinutes?.[0] && (
                <p id="restMinutes-error" className="mt-1 text-xs text-red-500">
                  {state?.errors.restMinutes[0]}
                </p>
              )}
            </Field>
          </FieldGroup>

          {state?.message && (
            <p className="pb-3 text-sm text-red-500">{state?.message}</p>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                キャンセル
              </Button>
            </DialogClose>

            <Button
              className="bg-indigo-500 hover:bg-indigo-600"
              type="submit"
              disabled={pending}
            >
              {pending
                ? isEdit
                  ? "保存中..."
                  : "作成中..."
                : isEdit
                  ? "保存"
                  : "作成"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
