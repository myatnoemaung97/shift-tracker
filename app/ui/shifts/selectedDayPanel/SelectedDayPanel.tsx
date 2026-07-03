import { ShiftWithJob } from "@/app/lib/types";
import SelectedDayPanelHeader from "@/app/ui/shifts/selectedDayPanel/SelectedDayPanelHeader";
import ShiftCard from "@/app/ui/shifts/selectedDayPanel/ShiftCard";
import { HolidayPeriod, Job } from "@/app/generated/prisma/browser";
import { calculateShiftTotals } from "@/app/lib/shiftUtils";
import Image from "next/image";

export default function SelectedDayPanel({
  date,
  shifts,
  jobs,
  holidayPeriod,
}: {
  date: Date;
  shifts: ShiftWithJob[];
  jobs: Job[];
  holidayPeriod: HolidayPeriod | undefined;
}) {
  const totals = calculateShiftTotals(shifts);

  return (
    <div className="w-full mt-3 p-2 flex flex-col border border-gray-100 shadow-md rounded-lg bg-white">
      <SelectedDayPanelHeader
        jobs={jobs}
        date={date}
        totalMinutes={Math.round(totals.totalMinutes)}
        totalEarnings={Math.round(totals.totalEarnings)}
        holidayPeriod={holidayPeriod}
      />
      {totals.totalEarnings > 0 ? (
        <div className="flex flex-col gap-2 mt-2">
          {shifts.map((shift) => (
            <ShiftCard key={shift.id} shift={shift} jobs={jobs} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <Image
            src="/no_shift.png"
            width={150}
            height={150}
            alt="No Shifts"
            className=""
          />
          <span className="text-sm text-gray-500">この日の予定はまだ登録されていません</span>
        </div>
      )}
    </div>
  );
}
