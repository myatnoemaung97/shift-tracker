"use client";

import type { Job } from "@/app/generated/prisma/browser";
import type { ShiftWithJob } from "@/app/lib/types";
import { updateShift } from "@/app/lib/actions/shifts";
import ShiftForm from "@/app/ui/shifts/ShiftForm";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

function formatTimeForInput(date: Date) {
  return date.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function EditShiftButton({
  jobs,
  shift,
}: {
  jobs: Job[];
  shift: ShiftWithJob;
}) {
  const action = updateShift.bind(null, shift.id, shift.start);

  return (
    <ShiftForm
      jobs={jobs}
      date={shift.start}
      mode="edit"
      action={action}
      initialValues={{
        jobId: shift.jobId,
        start: formatTimeForInput(shift.start),
        end: formatTimeForInput(shift.end),
        restMinutes: shift.restMinutes.toString(),
      }}
      trigger={
        <Button variant="ghost" className="w-full justify-start px-2 text-xs">
          <Pencil className="size-3" />
          編集
        </Button>
      }
    />
  );
}
