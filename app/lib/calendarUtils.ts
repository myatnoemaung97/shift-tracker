import { holidays } from "@/app/lib/holidays";
import { ShiftWithJob } from "@/app/lib/types";
import { weekDays } from "@/app/lib/weekDays";

export function cellIndexToDate(
  cellIndex: number,
  year: number,
  month: number,
) {
  const firstDay = new Date(year, month, 1);

  const firstVisibleDate = new Date(
    firstDay.getFullYear(),
    firstDay.getMonth(),
    firstDay.getDate() - firstDay.getDay(),
  );

  const date = new Date(firstVisibleDate);
  date.setDate(firstVisibleDate.getDate() + cellIndex);

  return date;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function dateToHoliday(date: Date): string | undefined {
  return holidays[formatDate(date) as keyof typeof holidays];
}

export function getHolidayName(date: Date): string | undefined {
  return holidays[formatDate(date) as keyof typeof holidays];
}

export function cellIndexToShifts(
  cellIndex: number,
  year: number,
  month: number,
  shiftsByDate: Map<string, ShiftWithJob[]>,
): ShiftWithJob[] {
  const date = cellIndexToDate(cellIndex, year, month);
  const key = formatLocalDate(date);

  return shiftsByDate.get(key) ?? [];
}

export function isSameDay(a: Date | null, b: Date) {
  return (
    a !== null &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function dateToWeekday(date: Date) {
  return weekDays[date.getDay()];
}

export function formatLocalDate(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

export function dateToString(time: Date) {
  return time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
