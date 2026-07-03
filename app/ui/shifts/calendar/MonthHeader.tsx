"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

export default function MonthHeader({
  year,
  month,
  setSelectedDate,
}: {
  year: number;
  month: number;
  setSelectedDate: (date: Date) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function handleMonthChange(direction: "left" | "right") {
    const date = new Date(year, month);

    date.setMonth(date.getMonth() + (direction === "right" ? 1 : -1));

    router.replace(
      `${pathname}?year=${date.getFullYear()}&month=${date.getMonth() + 1}&selected=urlSelectedDate`,
    );
  }

  function handleTodayButtonClick() {
    const today = new Date();
    router.replace(
      `${pathname}?year=${today.getFullYear()}&month=${today.getMonth() + 1}&selected=${today.getDate()}`,
    );

    setSelectedDate(today);
  }

  return (
    <div className="py-2 px-1 flex justify-between items-center">
      <button
        type="button"
        onClick={() => handleMonthChange("left")}
        className="size-8 md:size-10 border border-gray-200 shadow-xs rounded-md flex items-center justify-center cursor-pointer"
      >
        <FaChevronLeft className="size-3 md:size-4" />
      </button>
      <div className="flex items-center gap-2">
        <span className="text-md md:text-lg font-semibold">
          {year}年 {month + 1}月
        </span>
        <button
          onClick={() => handleTodayButtonClick()}
          className="border border-gray-500 text-sm px-2 py-1 rounded-md bg-white hover:bg-gray-100 transition-colors"
        >
          今日
        </button>
      </div>

      <button
        type="button"
        onClick={() => handleMonthChange("right")}
        className="size-8 md:size-10  border border-gray-200 shadow-xs rounded-md flex items-center justify-center cursor-pointer"
      >
        <FaChevronRight className="size-3 md:size-4" />
      </button>
    </div>
  );
}
