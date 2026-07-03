"use client";

import MonthHeader from "@/app/ui/shifts/calendar/MonthHeader";
import CalendarGrid from "@/app/ui/shifts/calendar/CalendarGrid";
import { ShiftWithJob } from "@/app/lib/types";
import { Job } from "@/app/generated/prisma/browser";
import JobLegend from "@/app/ui/shifts/JobLegend";
import SelectedDayPanel from "@/app/ui/shifts/selectedDayPanel/SelectedDayPanel";
import { useState } from "react";
import { HolidayPeriod } from "@/app/generated/prisma/browser";
import { isDateInHoliday } from "@/app/lib/calendarUtils";

export default function CalendarView({
  shifts,
  jobs,
  year,
  month,
  urlSelected,
  holidayPeriods,
}: {
  shifts: ShiftWithJob[];
  jobs: Job[];
  year: number;
  month: number;
  urlSelected: number;
  holidayPeriods: HolidayPeriod[];
}) {
  const [selectedDate, setSelectedDate] = useState(
    new Date(year, month, urlSelected),
  );

  const panelShifts = shifts.filter((shift) => {
    const start = shift.start;

    return (
      start.getFullYear() === selectedDate?.getFullYear() &&
      start.getMonth() === selectedDate?.getMonth() &&
      start.getDate() === selectedDate?.getDate()
    );
  });

  const holidayPeriod = holidayPeriods.find((holiday) =>
    isDateInHoliday(selectedDate, holiday),
  );

  return (
    <>
      <div className="border border-gray-100 shadow-md rounded-lg px-1 bg-white">
        <MonthHeader
          year={year}
          month={month}
          setSelectedDate={setSelectedDate}
        />
        <CalendarGrid
          shifts={shifts}
          year={year}
          month={month}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          holidayPeriods={holidayPeriods}
        />
      </div>
      <JobLegend jobs={jobs} />
      {selectedDate && (
        <SelectedDayPanel
          date={selectedDate}
          shifts={panelShifts}
          jobs={jobs}
          holidayPeriod={holidayPeriod}
        />
      )}
    </>
  );
}
