import JobCard from "@/app/ui/jobs/JobCard";
import { prisma } from "@/app/lib/prisma";
import { CreateJobButton } from "@/app/ui/jobs/buttons";

export default async function Page() {
  const jobs = (await prisma.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      archivedAt: null,
    },
  }));

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h1 className="font-bold text-2xl md:text-3xl">勤務先一覧</h1>
        <CreateJobButton />
      </div>

      <div className="grid grid-cols-1 md:grid-colsd-2 gap-4">
        {jobs.map((job) => {
          return <JobCard key={job.id} job={job} />;
        })}
      </div>
    </div>
  );
}
