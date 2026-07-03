"use client";

import { clsx } from "clsx";
import { dateToHoliday } from "@/app/lib/calendarUtils";
import { ShiftWithJob } from "@/app/lib/types";
import { colorMap } from "@/app/lib/colorMap";
import { useRouter } from "next/navigation";
import { calculateShiftTotals } from "@/app/lib/shiftUtils";
import { FaTriangleExclamation } from "react-icons/fa6";
import { HolidayPeriod } from "@/app/generated/prisma/browser";
import { FaCircle } from "react-icons/fa6";
import { holidayIcons } from "@/app/lib/constants/holiday";

export default function CalendarCell({
  date,
  year,
  month,
  isSelected,
  shifts,
  setSelectedDate,
  weeklyHours,
  isWeeklyLimitExceeded,
  holidayPeriod,
}: {
  date: Date;
  year: number;
  month: number;
  isSelected: boolean;
  shifts: ShiftWithJob[];
  setSelectedDate: (date: Date) => void;
  weeklyHours: number;
  isWeeklyLimitExceeded: boolean;
  holidayPeriod: HolidayPeriod | undefined;
}) {
  const today = new Date();
  const router = useRouter();

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

  const isAHoliday = dateToHoliday(date);

  const totalMinutes = calculateShiftTotals(shifts).totalMinutes;

  function handleClick(clickedDate: Date) {
    setSelectedDate(clickedDate);

    if (clickedDate.getMonth() !== month) {
      router.replace(
        `/shifts?year=${clickedDate.getFullYear()}&month=${clickedDate.getMonth() + 1}&selected=${clickedDate.getDate()}`,
      );
    } else {
      window.history.replaceState(
        null,
        "",
        `/shifts?year=${clickedDate.getFullYear()}&month=${clickedDate.getMonth() + 1}&selected=${clickedDate.getDate()}`,
      );
    }
  }

  return (
    <button
      onClick={() => handleClick(date)}
      className={clsx(
        "relative flex flex-col justify-between items-end text-end text-sm cursor-pointer h-[35px] md:h-[65px] hover:border hover:border-indigo-500 transition-colors",
        {
          "text-gray-400": IsNotPartOfMonth,

          "text-red-500": isWeekend,
          "text-indigo-500 font-bold ": isToday,
          "bg-red-200": isWeeklyLimitExceeded,
          "ring-2 ring-inset !ring-indigo-500": isSelected,
        },
      )}
    >
      <div className="absolute top-1 left-1 flex items-center text-[6px] md:text-[14px] md:gap-1">
        {totalMinutes > 480 && (
          <FaTriangleExclamation className="text-yellow-400" />
        )}
        {holidayPeriod && (
        <div>
          {holidayIcons[holidayPeriod.name]}
        </div>
      )}
      </div>

      
      <div className="flex flex-col items-center me-1">
        {isToday && (
          <div
            className={clsx("bg-indigo-500 size-1 rounded-full", {
              "mt-1": isSelected,
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
        <div className="flex gap-1 justify-end items-start mt-1">
          {shifts.map((shift) => (
            <div
              className={`size-1 md:size-3 rounded-full ${colorMap[shift.job.color].background}`}
              key={shift.id}
            ></div>
          ))}
        </div>
      </div>
    </button>
  );
}
