import MonthHeader from "@/app/ui/shifts/MonthHeader";
import CalendarGrid from "@/app/ui/shifts/CalendarGrid";
import { ShiftWithJob } from "@/app/lib/types";

export default function Calendar({
  shifts,
  year,
  month,
  day
}: {
  shifts: ShiftWithJob[];
  year: number;
  month: number;
  day: number;
}) {
  return (
    <div className="border border-gray-100 shadow-xl rounded-lg px-1">
      <MonthHeader year={year} month={month} />
      <CalendarGrid shifts={shifts} year={year} month={month} day={day} />
    </div>
  );
}
