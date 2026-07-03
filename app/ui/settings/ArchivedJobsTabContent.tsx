import { Job } from "@/app/generated/prisma/browser";
import ArchivedJobCard from "@/app/ui/jobs/ArchivedJobCard";

export default function ArchivedJobsTabContent( {jobs} : { jobs: Job[] }) {
  return (
    <div className="border border-gray-200 rounded-md p-3 bg-white">
      <div>
        <h1 className="text-lg font-semibold mb-1">アーカイブ済み勤務先</h1>
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
  );
}
