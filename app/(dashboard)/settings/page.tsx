import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/app/lib/prisma";
import { getUser } from "@/app/lib/actions/auth";
import ArchivedJobCard from "@/app/ui/jobs/ArchivedJobCard";

export default async function Page() {
  const user = await getUser();

  const jobs = await prisma.job.findMany({
    where: {
      userId: user.id,
      archivedAt: {
        not: null,
      } 
    },
    orderBy: {
      archivedAt: "desc",
    },
  });

  return (
    <>
      <Tabs defaultValue="archived">
        <TabsList variant="line">
          <TabsTrigger value="1">プロフィール</TabsTrigger>
          <TabsTrigger value="2">アカウント</TabsTrigger>
          <TabsTrigger value="3">通知</TabsTrigger>
          <TabsTrigger value="archived">アーカイブ済み勤務先</TabsTrigger>
        </TabsList>
        <TabsContent value="archived">
          <div className="border border-gray-200 rounded-md p-3 bg-white">
            <div>
              <h1 className="text-lg font-semibold mb-1">
                アーカイブ済み勤務先
              </h1>
              <span className="text-sm text-muted-foreground">
                アーカイブ済み勤務先の一覧です。必要に応じて復元できます。
              </span>
            </div>
            <div className="flex flex-col border broder mt-3 rounded-md">
              {jobs.map((job) => (
                <ArchivedJobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </>
  );
}
