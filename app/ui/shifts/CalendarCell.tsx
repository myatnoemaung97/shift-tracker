"use client";

import { clsx } from "clsx";
import { isHoliday } from "@/app/lib/calendarUtils";
import { ShiftWithJob } from "@/app/lib/types";
import { colorMap, JobColor } from "@/app/lib/colorMap";
import { useRouter } from "next/navigation";

export default function CalendarCell({
  date,
  year,
  month,
  day,
  shifts,
}: {
  date: Date;
  year: number;
  month: number;
  day: number;
  shifts: ShiftWithJob[];
}) {
  const router = useRouter();
  const today = new Date();
  const styles = colorMap[shifts[0]?.job.color as JobColor];

  const isToday =
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate();

  const IsNotPartOfMonth =
    (!isToday && date.getMonth() !== month) || date.getFullYear() !== year;

  const isWeekend =
    !isToday &&
    !IsNotPartOfMonth &&
    (date.getDay() === 0 || date.getDay() === 6);

  const isAHoliday = isHoliday(date);

  const isSelectedDay =
    date.getDate() === day &&
    date.getMonth() === month &&
    date.getFullYear() === year;

  function handleClick() {
    router.push(
      `/shifts?year=${date.getFullYear()}&month=${date.getMonth() + 1}&day=${date.getDate()}`,
    );
  }

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "flex flex-col justify-between items-end text-end text-sm cursor-pointer h-[40px] md:h-[65px] hover:border hover:border-indigo-500 transition-colors",
        {
          "text-gray-400": IsNotPartOfMonth,

          "text-red-500": isWeekend,
          "text-indigo-500 font-bold ": isToday,
          "border-2 border-indigo-500": isSelectedDay,
        },
      )}
    >
      <div className="flex flex-col items-center me-1">
        {isToday && (
          <div
            className={clsx("bg-indigo-500 size-1 rounded-full", {
              "mt-1": isSelectedDay,
            })}
          ></div>
        )}
        <span
          className={clsx(" text-[10px] md:text-[14px]", {
            "text-red-500": isAHoliday,
            "font-extrabold": isToday,
            "mt-1": !isToday,
          })}
        >
          {date.getDate()}
        </span>
      </div>
      <div className="pb-1 pe-1">
        <div className="flex gap-1 justify-end items-start">
          {shifts.map((shift) => (
            <div
              className={`size-2 md:size-4 rounded-full ${styles.background}`}
              key={shift.id}
            ></div>
          ))}
        </div>
      </div>
    </button>
  );
}
