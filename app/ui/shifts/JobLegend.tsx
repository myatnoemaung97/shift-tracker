import { Job } from "@/app/generated/prisma/browser";
import { colorMap, JobColor } from "@/app/lib/colorMap";

export default function JobLegend({ jobs }: { jobs: Job[] }) {
  return (
    <div className="flex gap-5 mt-2 items-center flex-wrap">
      {jobs.map((job) => (
        <div key={job.id} className="flex items-center justify-start">
          <span className="text-sm">{job.name}</span>
          <div
            className={`size-3 rounded-full text-white ml-1 ${colorMap[job.color as JobColor].background}`}
          ></div>
        </div>
      ))}
    </div>
  );
}
