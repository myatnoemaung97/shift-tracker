import CreateHolidayDialog from "@/app/ui/holidays/CreateHolidayDialog";
import HolidayPeriodCard from "@/app/ui/holidays/HolidayPeriodCard";
import { HolidayPeriod } from "@/app/generated/prisma/browser";

export default function HolidayPeriodsTabContent({ holidayPeriods } : { holidayPeriods: HolidayPeriod[] }) {
  return (
    <div className="border border-gray-200 rounded-md p-3 bg-white">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h1 className="text-lg font-semibold mb-1">長期休暇</h1>
          <span className="text-sm text-muted-foreground">
            長期休暇の期間を設定すると、その期間中は週40時間の上限で計算されます。
          </span>
        </div>
        <CreateHolidayDialog />
      </div>
      <div className="flex flex-col border broder mt-3 rounded-md">
        {holidayPeriods.map((period) => (
          <HolidayPeriodCard key={period.id} period={period} />
        ))}
      </div>
    </div>
  );
}
