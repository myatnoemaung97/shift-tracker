import { Job } from "@/app/generated/prisma/browser";
import { colorMap, JobColor } from "@/app/lib/colorMap";
import { clsx } from "clsx";

export default function JobLegend({ jobs }: { jobs: Job[] }) {
  return (
    <div className="flex gap-3 mt-2 items-center flex-wrap">
      {jobs.map((job) => (
        <div
          key={job.id}
          className={clsx("flex items-center justify-start", {
            "text-muted-foreground": job.archivedAt,
          })}
        >
          <div
            className={`size-3 rounded-full text-white mr-1 ${colorMap[job.color as JobColor].background}`}
          ></div>
          <span className="text-sm font-medium">
            {job.name}
            {job.archivedAt && (
              <span className="text-xs text-muted-foreground">
                （アーカイブ済み）
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
