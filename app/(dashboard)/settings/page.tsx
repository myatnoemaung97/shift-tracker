import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/app/lib/prisma";
import { getUser } from "@/app/lib/actions/auth";
import ArchivedJobsTabContent from "@/app/ui/settings/ArchivedJobsTabContent";
import HolidayPeriodsTabContent from "@/app/ui/settings/HolidayPeriodsTabContent";
import AccountSettingsTabContent from "@/app/ui/settings/AccountSettingsTabContent";

export default async function Page() {
  const user = await getUser();

  const jobs = await prisma.job.findMany({
    where: {
      userId: user.id,
      archivedAt: {
        not: null,
      },
    },
    orderBy: {
      archivedAt: "desc",
    },
  });

  const holidayPeriods = await prisma.holidayPeriod.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      startDate: "desc",
    },
  });

  return (
    <>
      <Tabs defaultValue="account">
        <TabsList variant="line">
          <TabsTrigger value="account">アカウント</TabsTrigger>
          <TabsTrigger value="holidays">長期休暇</TabsTrigger>
          <TabsTrigger value="archived">アーカイブ済み勤務先</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AccountSettingsTabContent />
        </TabsContent>
        <TabsContent value="archived">
          <ArchivedJobsTabContent jobs={jobs} />
        </TabsContent>
        <TabsContent value="holidays">
          <HolidayPeriodsTabContent holidayPeriods={holidayPeriods} />
        </TabsContent>
      </Tabs>
    </>
  );
}
