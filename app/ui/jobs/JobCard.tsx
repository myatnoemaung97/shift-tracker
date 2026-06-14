import { FaPause, FaPlay, FaStop, FaYenSign } from "react-icons/fa";

import JobInfoCard from "@/app/ui/jobs/JobInfoCard";
import { colorMap, JobColor } from "@/app/lib/colorMap";
import { EditJob, DeleteJob } from "@/app/ui/jobs/buttons";
import { Job } from "@/app/generated/prisma/browser";

export default function JobCard({ job }: { job: Job }) {
  const style: { background: string; border: string; ring: string } =
    colorMap[job.color as JobColor];

  return (
    <div
      className={`mt-4 outline outline-gray-300 border-l-4 ${style.border} rounded-lg p-4 w-lg`}
    >
      <div className="flex items-start justify-between border-b border-gray-300 pb-3">
        <div className="flex flex-col items-start">
          <h2 className="font-bold text-xl mb-2">{job.name}</h2>
          <div className="flex">
            <EditJob id={job.id} />
            <DeleteJob id={job.id} />
          </div>
        </div>
        <div
          className={`w-[20px] h-[20px] rounded-full mb-2 ${style.background}`}
        ></div>
      </div>
      <div className="flex justify-around mt-3">
        <JobInfoCard
          Icon={FaYenSign}
          label="時給"
          value={`¥${String(job.hourlyWage)}`}
        />
        <JobInfoCard
          Icon={FaPlay}
          label="通常の開始"
          value={job.defaultStart ?? "未設定"}
        />
        <JobInfoCard
          Icon={FaStop}
          label="通常の終了"
          value={job.defaultEnd ?? "未設定"}
        />
        <JobInfoCard
          Icon={FaPause}
          label="通常の休憩"
          value={job.defaultRestMinutes ?? "未設定"}
        />
      </div>
    </div>
  );
}
