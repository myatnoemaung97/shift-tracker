import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import CalendarView from "@/app/ui/shifts/calendar/CalendarView";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; month?: string; selected?: string }>;
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
      `/shifts?year=${today.getFullYear()}&month=${today.getMonth() + 1}&selected=${today.getDate()}`,
    );
  }

  return (
    <>
      <CalendarView
        shifts={shifts}
        jobs={jobs}
        year={Number(params.year)}
        month={Number(params.month) - 1}
        urlSelected={Number(params.selected)}
      />
    </>
  );
}
