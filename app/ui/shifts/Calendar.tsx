'use client'

import MonthHeader from "@/app/ui/shifts/MonthHeader";
import CalendarGrid from "@/app/ui/shifts/CalendarGrid";
import { useSearchParams, redirect } from "next/navigation";

export default function Calendar() {
  const today = new Date();

  const searchParams = useSearchParams();

  if (!searchParams.get('month') || !searchParams.get('year')) {
    redirect(`/shifts?year=${today.getFullYear()}&month=${today.getMonth() + 1}`);
  }

  return (
    <div className="border border-gray-100 shadow-xl rounded-lg">
      <MonthHeader />
      <CalendarGrid />
    </div>
  );
}
