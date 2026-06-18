import clsx from "clsx";
import CalendarCell from "@/app/ui/shifts/CalendarCell";
import { cellIndexToDate } from "@/app/lib/calendarUtils";

export default function Calendar({year, month} : { year: number, month: number}) {
  const daysInAWeek: Array<{ day: number; name: string }> = [
    { day: 0, name: "日" },
    { day: 1, name: "月" },
    { day: 2, name: "火" },
    { day: 3, name: "水" },
    { day: 4, name: "木" },
    { day: 5, name: "金" },
    { day: 6, name: "土" },
  ];

  const cells = Array.from({ length: 42 }, (_, i) => ({
    index: i,
    date: cellIndexToDate(i, year, month),
  }));

  return (
    <>
      <div className="grid grid-cols-7 gap-2 border-b border-gray-200">
        {daysInAWeek.map(({ day, name }) => (
          <div
            className={clsx("font-bold text-end me-1", {
              "text-red-500": day === 0 || day === 6,
            })}
            key={day}
          >
            {name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2 divide-x divide-y divide-gray-200 ">
        {cells.map(({ index, date }) => (
          <CalendarCell key={index} date={date} year={year} month={month} />
        ))}
      </div>
    </>
  );
}
