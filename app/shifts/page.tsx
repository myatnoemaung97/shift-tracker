import { redirect } from "next/navigation";
import Calendar from "@/app/ui/shifts/Calendar";
import SelectedDayPanel from "@/app/ui/shifts/SelectedDayPanel";
import JobLegend from "@/app/ui/shifts/JobLegend";
import { prisma } from "@/app/lib/prisma";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; month?: string; day?: string }>;
}) {
  const params = await searchParams;
  const today = new Date();

  const shifts = await prisma.shift.findMany({
    include: {
      job: true,
    },
  });

  const jobs = await prisma.job.findMany();

  if (!params.year || !params.month) {
    redirect(
      `/shifts?year=${today.getFullYear()}&month=${today.getMonth() + 1}&day=${today.getDate()}`,
    );
  }

  return (
    <>
      <Calendar
        shifts={shifts}
        year={Number(params.year)}
        month={Number(params.month) - 1}
        day={Number(params.day)}
      />
      <JobLegend jobs={jobs} />
      <SelectedDayPanel />
    </>
  );
}
