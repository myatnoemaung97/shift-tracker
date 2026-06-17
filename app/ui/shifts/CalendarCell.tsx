import { clsx } from "clsx";
import { useSearchParams } from "next/navigation";
import { isHoliday, getHolidayName } from "@/app/lib/calendarUtils";

export default function CalendarCell({ date }: { date: Date }) {
  const searchParams = useSearchParams();
  const urlYear = Number(searchParams.get("year"));
  const urlMonth = Number(searchParams.get("month"));
  const today = new Date();

  const isToday =
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate();
  const IsNotPartOfMonth =
    (!isToday && date.getMonth() !== urlMonth - 1) ||
    date.getFullYear() !== urlYear;
  const isWeekend =
    !isToday &&
    !IsNotPartOfMonth &&
    (date.getDay() === 0 || date.getDay() === 6);
  const isAHoliday = isHoliday(date);

  return (
    <div
      className={clsx("text-end text-sm h-[45px] md:h-[65px]", {
        "text-gray-400": IsNotPartOfMonth,

        "text-red-500": isWeekend,
        "text-indigo-500 font-bold": isToday,
      })}
    >
      <div className="flex flex-col">
        <span className={clsx("me-1", { "text-red-500": isAHoliday })}>
          {date.getDate()}
        </span>
        {isAHoliday && (
          <span className="text-red-500 text-[8px] md:text-[10px]">{getHolidayName(date)}</span>
        )}
      </div>
    </div>
  );
}
