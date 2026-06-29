"use client";

import type { Job } from "@/app/generated/prisma/browser";
import { createShift } from "@/app/lib/actions/shifts";
import ShiftForm from "@/app/ui/shifts/ShiftForm";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";

export default function CreateShiftButton({
  jobs,
  date,
}: {
  jobs: Job[];
  date: Date;
}) {
  const action = createShift.bind(null, date);

  return (
    <ShiftForm
      jobs={jobs}
      date={date}
      mode="create"
      action={action}
      trigger={
        <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600">
          <FaPlus />
          シフトを作成
        </Button>
      }
    />
  );
}