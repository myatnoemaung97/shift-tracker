import { ShiftWithJob } from "@/app/lib/types";

export function calculateWorkedMinutes(shift: ShiftWithJob) {
  return (
    (shift.end.getTime() - shift.start.getTime()) / (1000 * 60) -
    shift.restMinutes
  );
}

export function calculateShiftEarnings(shift: ShiftWithJob) {
  const workedMinutes = calculateWorkedMinutes(shift);
  return Math.round((workedMinutes / 60) * shift.job.hourlyWage);
}

export function calculateShiftTotals(shifts: ShiftWithJob[]) {
  return shifts.reduce(
    (acc, shift) => {
      const workedMinutes = calculateWorkedMinutes(shift);

      acc.totalMinutes += workedMinutes;
      acc.totalEarnings += (workedMinutes / 60) * shift.job.hourlyWage;

      return acc;
    },
    {
      totalMinutes: 0,
      totalEarnings: 0,
    },
  );
}
