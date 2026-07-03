import { Job } from "@/app/generated/prisma/browser";
import { formatLocalDate } from "@/app/lib/calendarUtils";
import { clsx } from "clsx";
import { colorMap } from "@/app/lib/colorMap";
import { RestoreJobButton } from "./buttons";

export default function ArchivedJobCard({ job }: { job: Job }) {
  return (
    <div className="border-b p-2 flex justify-between items-center">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div
            className={clsx(
              "size-3 rounded-full",
              colorMap[job.color].background,
            )}
          ></div>
          <h2 className="text-md font-semibold g-0">{job.name}</h2>
        </div>
        <div className="flex gap-2 text-xs">
          <span>時給：¥{job.hourlyWage}</span>
          <span>作成日: {formatLocalDate(job.createdAt)}</span>

          <span>アーカイブ日: {formatLocalDate(job?.archivedAt!)}</span>
        </div>
      </div>
      <RestoreJobButton id={job.id} />
    </div>
  );
}
