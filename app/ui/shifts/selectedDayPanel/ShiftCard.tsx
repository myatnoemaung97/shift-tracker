import { ShiftWithJob } from "@/app/lib/types";
import { dateToString } from "@/app/lib/calendarUtils";
import { colorMap } from "@/app/lib/colorMap";
import { clsx } from "clsx";
import ShiftActionButton  from "@/app/ui/shifts/selectedDayPanel/ShiftActionButton";
import { calculateShiftEarnings } from "@/app/lib/shiftUtils";
import { Job } from "@/app/generated/prisma/browser";

export default function ShiftCard({ shift, jobs }: { shift: ShiftWithJob; jobs: Job[] }) {
  const estimatedSalary = calculateShiftEarnings(shift);

  return (
    <div className="flex justify-between items-start p-2 border border-gray-100 rounded-lg">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              "size-3 rounded-full",
              colorMap[shift.job.color].background,
            )}
          ></div>
          <span className="text-xs">{shift.job.name}</span>
        </div>
        <span className="text-sm font-semibold">
          {dateToString(shift.start) + " - " + dateToString(shift.end)}
        </span>
        <span className="text-xs">
           休憩 {shift.restMinutes}分 · ¥{estimatedSalary}(推定)
        </span>
      </div>
      <ShiftActionButton jobs={jobs} shift={shift} />
    </div>
  );
}
