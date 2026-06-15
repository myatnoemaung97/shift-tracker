"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  useSearchParams,
  redirect,
  useRouter,
  usePathname,
} from "next/navigation";

export default function MonthHeader() {
  const today = new Date();
  const searchParams = useSearchParams();
  const year = Number(searchParams.get("year"));
  const month = Number(searchParams.get("month"));
  const { replace } = useRouter();
  const pathname = usePathname();

  function handleClick(direction: "left" | "right") {
    const date = new Date(year, month - 1);

    date.setMonth(date.getMonth() + (direction === "right" ? 1 : -1));

    const params = new URLSearchParams(searchParams);

    params.set("year", date.getFullYear().toString());
    params.set("month", (date.getMonth() + 1).toString());

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="p-3 flex justify-between items-center">
      <button
        disabled={
          year === today.getFullYear() && month === today.getMonth() + 1
        }
        type="button"
        onClick={() => handleClick("left")}
        className="w-10 h-10 border border-gray-100 shadow-xs rounded-md flex items-center justify-center cursor-pointer"
      >
        <FaChevronLeft />
      </button>
      <span className="text-lg font-semibold">
        {year}年{month}月
      </span>
      <button
        type="button"
        onClick={() => handleClick("right")}
        className="w-10 h-10 border border-gray-100 shadow-xs rounded-md flex items-center justify-center cursor-pointer"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
