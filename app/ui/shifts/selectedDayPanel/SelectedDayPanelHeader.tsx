import { dateToWeekday } from "@/app/lib/calendarUtils";
import {CreateShift} from "@/app/ui/shifts/buttons";

export default function SelectedDayPanelHeader({
  date,
  noOfShifts,
}: {
  date: Date;
  noOfShifts: number;
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <span className="font-semibold">
          {`${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日`}
          {` (${dateToWeekday(date)})`}
        </span>
        <span className="text-gray-500">{noOfShifts}件のシフト</span>
      </div>
      <CreateShift />
    </div>
  );
}
