import JobCard from "@/app/ui/jobs/JobCard";
import { prisma } from "@/app/lib/prisma";
import { CreateJob } from "@/app/ui/jobs/buttons";

export default async function Page() {
  const jobs = await prisma.job.findMany();

  return (
    <div className="p-2">
      <div className="mb-3">
        <div className="mb-4">
          <h1 className="font-bold text-2xl md:text-3xl">Jobs</h1>
        </div>
        <CreateJob />
      </div>

      <div className="flex flex-wrap gap-4">
        {jobs.map((job) => {
          return (
            <JobCard
              key={job.id}
              id={job.id}
              name={job.name}
              hourly_wage={job.hourlyWage}
              color={job.color}
            /> 
          );
        })}
      </div>
    </div>
  );
}
