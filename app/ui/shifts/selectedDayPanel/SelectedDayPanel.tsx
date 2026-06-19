import { ShiftWithJob } from "@/app/lib/types";
import SelectedDayPanelHeader from "@/app/ui/shifts/selectedDayPanel/SelectedDayPanelHeader";

export default function SelectedDayPanel({date, shifts}: {date: Date, shifts: ShiftWithJob[]}) {

  console.log(shifts)
  return (
    <div className="w-full h-[500px] mt-2 p-2 flex flex-col border border-gray-100 shadow-md rounded-lg">
      <div>
        <SelectedDayPanelHeader date={date} noOfShifts={shifts.length} />
      </div>
      {shifts.map((shift) => (
        <div key={shift.id}>
          {shift.job.name}
        </div>
      ))}
    </div>
  );
}