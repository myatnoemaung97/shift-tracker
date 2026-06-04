import {
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineCalendar,
} from "react-icons/hi2";
import JobInfoCard from "@/app/ui/jobs/JobInfoCard";
import { borderColorMap, circleColorMap } from "@/app/lib/colorMap";

export default function JobCard({
  name,
  hourly_wage,
  color,
}: {
  name: string;
  hourly_wage: number;
  color: string;
}) {
  return (
    <div
      className={`mt-4 outline outline-gray-300 border-l-4 ${borderColorMap[color]} rounded-lg p-4 w-lg`}
    >
      <div className="flex items-start justify-between border-b border-gray-300 pb-3">
        <div className="flex flex-col items-start">
          <h2 className="font-bold text-xl mb-2">{name}</h2>
          <div>
            <button className="bg-blue-500 text-white py-1 px-2 rounded-sm text-sm md:text-base">
              Edits
            </button>
            <button className="bg-red-500 text-white py-1 px-2 rounded-sm ml-2 text-sm md:text-base">
              Delete
            </button>
          </div>
        </div>
        <div
          className={`w-[20px] h-[20px] rounded-full mb-2 ${circleColorMap[color]}`}
        ></div>
      </div>
      <div className="flex justify-around mt-3">
        <JobInfoCard
          Icon={HiOutlineClock}
          label="Hourly Wage"
          value={`¥${String(hourly_wage)}`}
        />
        <JobInfoCard
          Icon={HiOutlineChartBar}
          label="Avg. Monthly Earnings"
          value="¥20,000"
        />
        <JobInfoCard
          Icon={HiOutlineCalendar}
          label="This Month"
          value="¥5,000"
        />
      </div>
    </div>
  );
}
