import MonthHeader from "@/app/ui/shifts/MonthHeader";
import CalendarGrid from "@/app/ui/shifts/CalendarGrid";

export default function Calendar({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  return (
    <div className="border border-gray-100 shadow-xl rounded-lg px-2">
      <MonthHeader year={year} month={month} />
      <CalendarGrid year={year} month={month} />
    </div>
  );
}
