import { Job } from "@/app/generated/prisma/browser";
import { colorMap } from "@/app/lib/colorMap";
import { clsx } from "clsx";

export default function JobLegend({ jobs }: { jobs: Job[] }) {
  const sortedJobs = [...jobs].sort((a, b) => {
    if (a.archivedAt && !b.archivedAt) return 1;
    if (!a.archivedAt && b.archivedAt) return -1;
    return 0;
  });

  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-3">
      {sortedJobs.map((job) => (
        <div
          key={job.id}
          className={clsx("flex items-center justify-start", {
            "text-muted-foreground": job.archivedAt,
          })}
        >
          <div
            className={clsx(
              "mr-1 size-3 rounded-full",
              colorMap[job.color].background,
            )}
          />

          <span className="text-xs md:text-sm font-medium">
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
