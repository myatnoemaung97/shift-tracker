import clsx from "clsx";
import CalendarCell from "@/app/ui/shifts/CalendarCell";
import { cellIndexToDate, cellIndexToShifts } from "@/app/lib/calendarUtils";
import { ShiftWithJob } from "@/app/lib/types";

export default function CalendarGrid({
  shifts,
  year,
  month,
  day,
}: {
  shifts: ShiftWithJob[];
  year: number;
  month: number;
  day: number;
}) {
  const daysInAWeek: Array<{ day: number; name: string }> = [
    { day: 0, name: "日" },
    { day: 1, name: "月" },
    { day: 2, name: "火" },
    { day: 3, name: "水" },
    { day: 4, name: "木" },
    { day: 5, name: "金" },
    { day: 6, name: "土" },
  ];

  const shiftsByDate = new Map<string, ShiftWithJob[]>();

  for (const shift of shifts) {
    const key = new Date(shift.start).toISOString().split("T")[0];

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
        {daysInAWeek.map(({ day, name }) => (
          <div
            className={clsx(
              "font-bold text-end me-1 text-[10px] md:text-[16px]",
              {
                "text-red-500": day === 0 || day === 6,
              },
            )}
            key={day}
          >
            {name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-1 divide-x divide-y divide-gray-200 ">
        {cells.map(({ index, date }) => (
          <CalendarCell
            key={index}
            date={date}
            year={year}
            month={month}
            day={day}
            shifts={cells[index].shifts}
          />
        ))}
      </div>
    </>
  );
}
