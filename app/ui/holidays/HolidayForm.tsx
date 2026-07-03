"use client";

import { useActionState } from "react";
import { clsx } from "clsx";

import type { HolidayState } from "@/app/lib/types";

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

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type HolidayFormValues = {
  name?: string;
  startDate?: string;
  endDate?: string;
};

type HolidayFormProps = {
  mode: "create" | "edit";

  action: (
    state: HolidayState | undefined,
    formData: FormData,
  ) => Promise<HolidayState | undefined>;

  initialValues?: HolidayFormValues;

  trigger: React.ReactNode;
};

export default function HolidayForm({
  mode,
  action,
  initialValues,
  trigger,
}: HolidayFormProps) {
  const isEdit = mode === "edit";

  const initialState: HolidayState = {
    message: null,
    errors: {},
    values: initialValues ?? {},
  };

  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle className="font-semibold">
              {isEdit ? "長期休暇を編集" : "長期休暇を追加"}
            </DialogTitle>

            <DialogDescription>
              長期休暇を設定すると、その期間中は週40時間で計算されます。
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            {/* Name */}

            <Field>
              <Label htmlFor="name">
                名称
                <span className="text-red-500 text-xs">（必須）</span>
              </Label>

              <Input
                id="name"
                name="name"
                list="holiday-suggestions"
                placeholder="例：夏休み"
                defaultValue={state?.values.name ?? initialValues?.name ?? ""}
              />

              <datalist id="holiday-suggestions">
                <option value="夏休み" />
                <option value="冬休み" />
                <option value="春休み" />
              </datalist>

              {state?.errors.name?.[0] && (
                <p className="mt-1 text-xs text-red-500">
                  {state?.errors.name[0]}
                </p>
              )}
            </Field>

            {/* Start */}

            <Field>
              <Label htmlFor="startDate">
                開始日
                <span className="text-red-500 text-xs">（必須）</span>
              </Label>

              <Input
                id="startDate"
                name="startDate"
                type="date"
                defaultValue={
                  state?.values.startDate ?? initialValues?.startDate ?? ""
                }
                className={clsx(state?.errors.startDate && "border-red-500")}
              />

              {state?.errors.startDate?.[0] && (
                <p className="mt-1 text-xs text-red-500">
                  {state?.errors.startDate[0]}
                </p>
              )}
            </Field>

            {/* End */}

            <Field>
              <Label htmlFor="endDate">
                終了日
                <span className="text-red-500 text-xs">（必須）</span>
              </Label>

              <Input
                id="endDate"
                name="endDate"
                type="date"
                defaultValue={
                  state?.values.endDate ?? initialValues?.endDate ?? ""
                }
                className={clsx(state?.errors.endDate && "border-red-500")}
              />

              {state?.errors.endDate?.[0] && (
                <p className="mt-1 text-xs text-red-500">
                  {state?.errors.endDate[0]}
                </p>
              )}
            </Field>
          </FieldGroup>

          {state?.message && (
            <p className="pb-3 text-sm text-red-500">{state?.message}</p>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                キャンセル
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={pending}
              className="bg-indigo-500 hover:bg-indigo-600"
            >
              {pending
                ? isEdit
                  ? "保存中..."
                  : "追加中..."
                : isEdit
                  ? "保存"
                  : "追加"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
