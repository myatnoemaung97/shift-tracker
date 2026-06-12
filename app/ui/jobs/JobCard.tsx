import {
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineCalendar,
} from "react-icons/hi2";
import JobInfoCard from "@/app/ui/jobs/JobInfoCard";
import { colorMap, JobColor } from "@/app/lib/colorMap";
import { EditJob, DeleteJob } from "@/app/ui/jobs/buttons";

export default function JobCard({
  id,
  name,
  hourly_wage,
  color,
}: {
  id: string;
  name: string;
  hourly_wage: number;
  color: string;
}) {
  const style: { background: string; border: string; ring: string } =
    colorMap[color as JobColor];

  return (
    <div
      className={`mt-4 outline outline-gray-300 border-l-4 ${style.border} rounded-lg p-4 w-lg`}
    >
      <div className="flex items-start justify-between border-b border-gray-300 pb-3">
        <div className="flex flex-col items-start">
          <h2 className="font-bold text-xl mb-2">{name}</h2>
          <div className="flex">
            <EditJob id={id} />
            <DeleteJob id={id} />
          </div>
        </div>
        <div
          className={`w-[20px] h-[20px] rounded-full mb-2 ${style.background}`}
        ></div>
      </div>
      <div className="flex justify-around mt-3">
        <JobInfoCard
          Icon={HiOutlineClock}
          label="時給"
          value={`¥${String(hourly_wage)}`}
        />
        <JobInfoCard
          Icon={HiOutlineChartBar}
          label="Avg. Monthly Earnings"
          value="¥20,000"
        />
        <JobInfoCard
          Icon={HiOutlineCalendar}
          label="今月"
          value="¥5,000"
        />
      </div>
    </div>
  );
}
