"use client";

import clsx from "clsx";
import CalendarCell from "@/app/ui/shifts/calendar/CalendarCell";
import {
  cellIndexToDate,
  cellIndexToShifts,
  isSameDay,
} from "@/app/lib/calendarUtils";
import { ShiftWithJob } from "@/app/lib/types";
import { weekDays } from "@/app/lib/weekDays";
import { formatLocalDate } from "@/app/lib/calendarUtils";

export default function CalendarGrid({
  shifts,
  year,
  month,
  selectedDate,
  setSelectedDate,
}: {
  shifts: ShiftWithJob[];
  year: number;
  month: number;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}) {
  const shiftsByDate = new Map<string, ShiftWithJob[]>();

for (const shift of shifts) {
  const key = formatLocalDate(shift.start);

  if (!shiftsByDate.has(key)) {
    shiftsByDate.set(key, []);
  }

  shiftsByDate.get(key)!.push(shift);
}

  const cells = Array.from({ length: 42 }, (_, i) => ({
    index: i,
    date: cellIndexToDate(i, year, month),
    shifts: cellIndexToShifts(i, year, month, shiftsByDate),
  }));

  return (
    <>
      <div className="grid grid-cols-7 gap-2 border-b border-gray-200">
        {weekDays.map((day, index) => (
          <div
            className={clsx(
              "font-bold text-end me-1 text-[10px] md:text-[16px]",
              {
                "text-red-500": index === 0 || index === 6,
              },
            )}
            key={day}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-1 divide-x divide-y divide-gray-200 ">
        {cells.map(({ index, date, shifts }) => (
          <CalendarCell
            key={index}
            date={date}
            year={year}
            month={month}
            isSelected={isSameDay(selectedDate, date)}
            shifts={shifts}
            setSelectedDate={setSelectedDate}
          />
        ))}
      </div>
    </>
  );
}
