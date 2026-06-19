"use client";

import MonthHeader from "@/app/ui/shifts/calendar/MonthHeader";
import CalendarGrid from "@/app/ui/shifts/calendar/CalendarGrid";
import { ShiftWithJob } from "@/app/lib/types";
import { Job } from "@/app/generated/prisma/browser";
import JobLegend from "@/app/ui/shifts/JobLegend";
import SelectedDayPanel from "@/app/ui/shifts/selectedDayPanel/SelectedDayPanel";
import { useState } from "react";

export default function CalendarView({
  shifts,
  jobs,
  year,
  month,
}: {
  shifts: ShiftWithJob[];
  jobs: Job[];
  year: number;
  month: number;
}) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(
    today.getFullYear() === year && today.getMonth() === month ? today : null,
  );

  const panelShifts = shifts.filter((shift) => {
    const start = shift.start;

    return (
      start.getFullYear() === selectedDate?.getFullYear() &&
      start.getMonth() === selectedDate?.getMonth() &&
      start.getDate() === selectedDate?.getDate()
    );
  });

  return (
    <>
      <div className="border border-gray-100 shadow-md rounded-lg px-1">
        <MonthHeader year={year} month={month} />
        <CalendarGrid
          shifts={shifts}
          year={year}
          month={month}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <JobLegend jobs={jobs} />
      {selectedDate && (
        <SelectedDayPanel date={selectedDate} shifts={panelShifts} />
      )}
    </>
  );
}
