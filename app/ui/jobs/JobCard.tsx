import { colorMap } from "@/app/lib/colorMap";
import { Job } from "@/app/generated/prisma/browser";
import { Coffee, Clock, CalendarClock, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import Link from "next/link";
import JobActionButton from "@/app/ui/jobs/JobActionButton";

export default function JobCard({ job }: { job: Job }) {
  const style: {
    background: string;
    border: string;
    ring: string;
    backgroundSoft: string;
  } = colorMap[job.color];

  return (
    <div
      className={clsx(
        "flex flex-col gap-5 p-3 border border-l-4 border-gray-200 rounded-lg bg-white",
        style.border,
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="font-bold text-base mb-1 md:text-lg">{job.name}</h2>
            <span className="text-xs md:text-sm">
              時給：
              <span className="font-semibold">¥{String(job.hourlyWage)}</span>
            </span>
            <div className="flex justify-start text-xs gap-4 md:text-sm">
              <div className="flex items-center gap-2">
                <Clock className="size-4" />
                <div>
                  <span
                    className={clsx({
                      "font-semibold": job.defaultStart,
                    })}
                  >
                    {job.defaultStart ?? "未設定"}
                  </span>
                  <span>～</span>
                  <span
                    className={clsx({
                      "font-semibold": job.defaultStart,
                    })}
                  >
                    {job.defaultEnd ?? "未設定"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Coffee className="size-4" />
                  <span>休憩:</span>
                </div>

                <span>
                  <span
                    className={clsx({
                      "font-semibold": job.defaultRestMinutes,
                    })}
                  >
                    {job.defaultRestMinutes ?? "未設定"}分{" "}
                  </span>{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="text-xs flex justify-start gap-5 md:text-sm">
            <div>
              <h3 className="mb-1">今月の勤務時間</h3>
              <span className="font-semibold">40時</span>
            </div>
            <div>
              <h3 className="mb-1">今月の予想給与</h3>
              <span className="font-semibold">￥50000</span>
            </div>
          </div>
        </div>
        <JobActionButton job={job} />
      </div>

      <div
        className={clsx(
          "text-xs p-2 rounded-lg flex flex-col items-start gap-2 md:text-sm",
          style.backgroundSoft,
        )}
      >
        <div className="flex items-start gap-2">
          <CalendarClock className="size-4" />
          <h3>次回のシフト</h3>
        </div>
        <span className="font-semibold">20/06 (水) 14:00 ～ 19:00</span>
        <Link
          href="/shifts"
          className="bg-white p-2 rounded-md flex items-center gap-1"
        >
          カレンダーで見る
          <ChevronRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
