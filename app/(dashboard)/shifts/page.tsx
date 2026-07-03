import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import CalendarView from "@/app/ui/shifts/calendar/CalendarView";
import { getUser } from "@/app/lib/actions/auth";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; month?: string; selected?: string }>;
}) {
  const params = await searchParams;
  const today = new Date();

  const user = await getUser();

  const shifts = await prisma.shift.findMany({
    where: {
      job: {
        userId: user.id,
      },
    },
    include: {
      job: true,
    },
  });

  const holidayPeriods = await prisma.holidayPeriod.findMany({
    where: {
      userId: user.id,
    },
  });

  const jobs = await prisma.job.findMany({
    where: {
      userId: user.id,
    },
  });

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
        holidayPeriods={holidayPeriods}
      />
    </>
  );
}
