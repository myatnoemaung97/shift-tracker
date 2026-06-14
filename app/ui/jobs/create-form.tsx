"use client";

import { createJob, State } from "@/app/lib/actions";
import { colorMap } from "@/app/lib/colorMap";
import { useState, useActionState } from "react";
import clsx from "clsx";
import { FaCheck } from "react-icons/fa6";

export default function Page() {
  const initialState: State = { message: null, errors: {}, values: {} };
  const [state, formAction] = useActionState(createJob, initialState);
  const [selectedColor, setSelectedColor] = useState(
    state?.values?.color ?? "",
  );

  return (
    <form
      action={formAction}
      className="flex flex-col border border-gray-100 shadow-2xl rounded-lg p-3"
    >
      <label htmlFor="name">
        <span className="font-semibold">勤務先の名前</span>
        <span className="text-red-500">(必須)</span>
        <span className="font-semibold">:</span>
      </label>
      <input
        className="border mt-1 border border-gray-300 rounded h-10 ps-2"
        type="text"
        id="name"
        name="name"
        defaultValue={state?.values?.name}
        aria-describedby="name-error"
        required
      />
      <div id="name-error" aria-live="polite" aria-atomic="true">
        {state?.errors?.name &&
          state.errors.name.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <label htmlFor="hourlyWage" className="mt-4">
        <span className="font-semibold">時給(¥)</span>
        <span className="text-red-500">(必須)</span>
        <span className="font-semibold">:</span>
      </label>
      <input
        className="border mt-1 border border-gray-300 rounded h-10 ps-2"
        type="number"
        id="hourlyWage"
        name="hourlyWage"
        defaultValue={state?.values?.hourlyWage}
        aria-describedby="name-error"
        required
      />
      <div id="name-error" aria-live="polite" aria-atomic="true">
        {state?.errors?.hourlyWage &&
          state.errors.hourlyWage.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
        <div className="flex flex-col">
          <label htmlFor="defaultStart">
            <span className="font-semibold">
              通常の開始 <span className="font-normal">(任意)</span>:
            </span>
          </label>
          <input
            className="border mt-1 border border-gray-300 rounded h-10 ps-2"
            type="time"
            id="defaultStart"
            name="defaultStart"
            defaultValue={state?.values?.defaultStart}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="defaultEnd">
            <span className="font-semibold">
              通常の終了 <span className="font-normal">(任意)</span>:
            </span>
          </label>
          <input
            className="border mt-1 border border-gray-300 rounded h-10 ps-2"
            type="time"
            id="defaultEnd"
            name="defaultEnd"
            defaultValue={state?.values?.defaultEnd}
          />
        </div>
      </div>

      <label htmlFor="defaultRestMinutes" className="mt-4">
        <span className="font-semibold">通常の休憩(分)</span>
        <span className="ms-1">(任意)</span>
        <span className="font-semibold">:</span>
      </label>
      <input
        className="border mt-1 border border-gray-300 rounded h-10 ps-2"
        type="number"
        id="defaultRestMinutes"
        name="defaultRestMinutes"
        defaultValue={state?.values?.defaultRestMinutes}
      />

      <label htmlFor="color" className="mt-4">
        <span className="font-semibold">色:</span>
        <span className="text-red-500">*</span>
      </label>
      <input type="hidden" name="color" value={selectedColor} />

      <div className="flex gap-3 mt-2">
        {Object.entries(colorMap).map(([color, styles]) => (
          <button
            type="button"
            key={color}
            className={clsx(
              "size-7 rounded-full flex items-center justify-center cursor-pointer",
              styles.background,
              color == selectedColor && [
                "ring-2",
                "ring-offset-2",
                styles.ring,
              ],
            )}
            onClick={() => setSelectedColor(color)}
          >
            {color == selectedColor && (
              <FaCheck className="size-3 text-white" />
            )}
          </button>
        ))}
      </div>
      <span className="text-sm text-gray-500 mt-1">
        選択した色は、カレンダーや一覧で勤務先を見分けるために使用されます。
      </span>
      <div id="name-error" aria-live="polite" aria-atomic="true">
        {state?.errors?.color &&
          state.errors.color.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div id="name-error" aria-live="polite" aria-atomic="true">
        {state?.message && <p className="mt-2 text-sm text-red-500">{state.message}</p>}
      </div>

      <button
        className="border mt-5 py-2 rounded bg-indigo-500 text-white cursor-pointer hover:bg-indigo-600 transition:colors"
        type="submit"
      >
        勤務先を追加
      </button>
    </form>
  );
}
