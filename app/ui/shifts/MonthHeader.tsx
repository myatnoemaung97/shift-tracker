"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { clsx } from "clsx";

export default function MonthHeader({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  const today = new Date();
  const pathname = usePathname();
  const router = useRouter();

  function handleClick(direction: "left" | "right") {
    const date = new Date(year, month);

    date.setMonth(date.getMonth() + (direction === "right" ? 1 : -1));

    router.replace(
      `${pathname}?year=${date.getFullYear()}&month=${date.getMonth() + 1}`,
    );
  }

  const isDisabled =
    year === today.getFullYear() && month === today.getMonth();

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
        {year}年 {month + 1}月
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
