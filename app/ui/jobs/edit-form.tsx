"use client";

import type { Job } from "@/app/generated/prisma/browser";
import { updateJob } from "@/app/lib/actions";
import { colorMap } from "@/app/lib/colorMap";
import { useState } from "react";
import { clsx } from "clsx";
import { FaCheck } from "react-icons/fa6";

export default function EditJobForm({ job }: { job: Job }) {
  const [selectedColor, setSelectedColor] = useState(job.color);
  const updateJobWithId = updateJob.bind(null, job.id);

  return (
    <form
      action={updateJobWithId}
      className="flex flex-col border border-gray-100 shadow-2xl rounded-lg p-3"
    >
      <label htmlFor="name">
        <span className="font-semibold">勤務先の名前:</span>
        <span className="text-red-500">*</span>
      </label>
      <input
        className="border mt-1 border border-gray-300 rounded h-10 ps-2"
        type="text"
        id="name"
        name="name"
        required
        defaultValue={job.name}
      />

      <label htmlFor="hourlyWage" className="mt-2">
        <span className="font-semibold">時給（円）:</span>
        <span className="text-red-500">*</span>
      </label>
      <input
        className="border mt-1 border border-gray-300 rounded h-10 ps-2"
        type="number"
        id="hourlyWage"
        name="hourlyWage"
        defaultValue={job.hourlyWage}
        required
      />

      <label htmlFor="color" className="mt-2">
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
      <button
        className="border mt-5 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-400 transition:colors"
        type="submit"
      >
        勤務先を編集
      </button>
    </form>
  );
}
