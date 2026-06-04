import JobCard from "@/app/ui/jobs/JobCard";
import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

export const dynamic = "force-dynamic"

export default async function Page() {
  const jobs = await prisma.job.findMany();

  return (
    <div className="p-2">
      <div className="mb-3">
        <div className="mb-4">
          <h1 className="font-bold text-2xl md:text-3xl">Jobs</h1>
          <h2 className="text-md md:text-lg text-gray-500">
            Overview of your jobs and earnings
          </h2>
        </div>
        <Link
          href="/jobs/create"
          className="px-5 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
        >
          + Add Job
        </Link>
      </div>

      <div className="flex flex-wrap gap-4">
        {jobs.map((job) => {
          return (
            <JobCard
              key={job.id}
              name={job.name}
              hourly_wage={job.hourly_wage}
              color={job.color}
            />
          );
        })}
      </div>
    </div>
  );
}
