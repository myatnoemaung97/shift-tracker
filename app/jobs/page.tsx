import JobCard from "@/app/ui/jobs/JobCard";
import { prisma } from "@/app/lib/prisma";
import { CreateJob } from "@/app/ui/jobs/buttons";

export default async function Page() {
  const jobs = (await prisma.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
  }));

  return (
    <div>
      <div className="mb-3">
        <div className="mb-4">
          <h1 className="font-bold text-2xl md:text-3xl">勤務先一覧</h1>
        </div>
        <div className="flex justify-start">
          <CreateJob />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {jobs.map((job) => {
          return <JobCard key={job.id} job={job} />;
        })}
      </div>
    </div>
  );
}
