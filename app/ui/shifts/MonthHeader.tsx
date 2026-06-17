"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { clsx } from "clsx";

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

  const isDisabled =
    year === today.getFullYear() && month === today.getMonth() + 1;

  return (
    <div className="p-3 flex justify-between items-center">
      <button
        disabled={isDisabled}
        type="button"
        onClick={() => handleClick("left")}
        className={clsx(
          "w-10 h-10 border border-gray-200 shadow-xs rounded-md flex items-center justify-center",
          isDisabled ? "text-gray-400 cursor-default" : "cursor-pointer",
        )}
      >
        <FaChevronLeft />
      </button>
      <span className="text-lg font-semibold">
        {year}年 {month}月
      </span>
      <button
        type="button"
        onClick={() => handleClick("right")}
        className="w-10 h-10 border border-gray-200 shadow-xs rounded-md flex items-center justify-center cursor-pointer"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
