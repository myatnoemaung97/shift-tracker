import { Job } from "@/app/lib/definitions";
import {
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineCalendar,
} from "react-icons/hi2";
import JobInfoCard from "@/app/ui/jobs/JobInfoCard";

export default function JobCard(
  {name, hourly_wage, color}: {
    name: string;
    hourly_wage: number;
    color: string;
  }
) {
  return (
    <div className="mt-4 outline outline-gray-300 border-l-4 border-l-red-500 rounded-lg p-4 w-lg">
      <div className="flex items-start justify-between border-b border-gray-300 pb-3">
        <div>
          <h2 className="font-bold text-xl mb-2">{name}</h2>
          <span className="bg-red-500/30 py-1 px-3 rounded-full text-sm">
            Retail
          </span>
        </div>
        <div className="flex flex-col items-end">
          <div className={`w-[20px] h-[20px] rounded-full mb-2 bg-${color}-500`}></div>
          <div>
            <button className="bg-blue-500 text-white py-1 px-2 rounded-sm text-sm md:text-base">
              Edit
            </button>
            <button className="bg-red-500 text-white py-1 px-2 rounded-sm ml-2 text-sm md:text-base">
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-3">
        <JobInfoCard Icon={HiOutlineClock} label="Hourly Wage" value={`¥${String(hourly_wage)}`} />
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
