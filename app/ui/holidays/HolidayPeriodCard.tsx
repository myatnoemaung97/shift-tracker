import { HolidayPeriod } from "@/app/generated/prisma/browser";
import { holidayIcons } from "@/app/lib/constants/holiday";
import HolidayActionButton from "@/app/ui/holidays/HolidayActionButton";

export default function HolidayPeriodCard({
  period,
}: {
  period: HolidayPeriod;
}) {
  const icon = holidayIcons[period.name] ?? "📅";

  const totalDays =
    Math.round(
      (period.endDate.getTime() - period.startDate.getTime()) /
        (1000 * 60 * 60 * 24),
    ) + 1; // +1 to include both start and end day

  return (
    <div className="border-b p-2 flex justify-between items-start">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold">
          {icon} {period.name}
        </span>
        <span>
          {period.startDate.toLocaleDateString("ja-JP")} -{" "}
          {period.endDate.toLocaleDateString("ja-JP")}
        </span>
        <span className="text-sm text-gray-500">{totalDays}日間</span>
      </div>
      <HolidayActionButton period={period} />
    </div>
  );
}
