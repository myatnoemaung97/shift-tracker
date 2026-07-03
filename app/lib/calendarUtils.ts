import { holidays } from "@/app/lib/holidays";
import { ShiftWithJob } from "@/app/lib/types";
import { weekDays } from "@/app/lib/weekDays";
import { HolidayPeriod } from "@/app/generated/prisma/browser";

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

export function calculateWeeklyHours(
  shifts: ShiftWithJob[],
  endDate: Date,
): number {
  const startDate = new Date(endDate);
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(startDate.getDate() - 6);

  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  let total = 0;

  for (const shift of shifts) {
    if (shift.start >= startDate && shift.start <= end) {
      const workedHours =
        (shift.end.getTime() - shift.start.getTime()) / 1000 / 60 / 60 -
        shift.restMinutes / 60;

      total += workedHours;
    }
  }

  return total;
}

export function findLimitExceedingWeeks(
  calendarStartDate: Date,
  calendarEndDate: Date,
  shifts: ShiftWithJob[],
): Set<string> {
  const exceededDates = new Set<string>();

  const current = new Date(calendarStartDate);
  current.setHours(0, 0, 0, 0);

  const last = new Date(calendarEndDate);
  last.setHours(0, 0, 0, 0);

  while (current <= last) {
    // Calculate the 7-day window
    const windowStart = new Date(current);
    windowStart.setDate(windowStart.getDate() - 6);

    let totalHours = 0;

    for (const shift of shifts) {
      const shiftDate = new Date(shift.start);
      shiftDate.setHours(0, 0, 0, 0);

      if (shiftDate >= windowStart && shiftDate <= current) {
        totalHours +=
          (shift.end.getTime() - shift.start.getTime()) / (1000 * 60 * 60) -
          shift.restMinutes / 60;
      }
    }

    // If exceeded, mark every day in the 7-day period
    if (totalHours > 28) {
      const d = new Date(windowStart);

      while (d <= current) {
        exceededDates.add(formatLocalDate(d));
        d.setDate(d.getDate() + 1);
      }
    }

    current.setDate(current.getDate() + 1);
  }

  return exceededDates;
}

export function isDateInHoliday(date: Date, holiday: HolidayPeriod) {
  const current = new Date(date);
  current.setHours(0, 0, 0, 0);

  const start = new Date(holiday.startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(holiday.endDate);
  end.setHours(23, 59, 59, 999);

  return current >= start && current <= end;
}
