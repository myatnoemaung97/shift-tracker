import { dateToWeekday } from "@/app/lib/calendarUtils";
import { dateToHoliday } from "@/app/lib/calendarUtils";
import { clsx } from "clsx";
import { Job } from "@/app/generated/prisma/browser";
import CreateShiftButton from "@/app/ui/shifts/CreateShiftButton";
import DayLimitWarning from "@/app/ui/shifts/selectedDayPanel/DayLimitWarning";

export default function SelectedDayPanelHeader({
  jobs,
  date,
  totalMinutes,
  totalEarnings,
}: {
  jobs: Job[];
  date: Date;
  totalMinutes: number;
  totalEarnings: number;
}) {
  const holiday = dateToHoliday(date);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col text-sm">
          <span className={clsx("font-semibold", holiday && "text-red-500")}>
            {`${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日`}
            {` (${dateToWeekday(date)})`}
          </span>
          {holiday && <span className="text-red-500 text-xs">{holiday}</span>}
          {totalMinutes > 0 ? (
            <span className="text-xs mt-1">
              合計 {hours}時 {minutes}分 · ¥{totalEarnings}(推定)
            </span>
          ) : (
            <span className="text-xs text-gray-500">休み</span>
          )}
        </div>
        <CreateShiftButton jobs={jobs} date={date} />
      </div>
      {totalMinutes > 480 && <DayLimitWarning />}
    </>
  );
}
