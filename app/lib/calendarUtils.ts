import { holidays } from "@/app/lib/holidays";

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

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function isHoliday(date: Date): boolean {
  return formatDate(date) in holidays;
}

export function getHolidayName(date: Date): string | undefined {
  return holidays[formatDate(date) as keyof typeof holidays];
}
