"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { HolidayPeriod } from "@/app/generated/prisma/browser";
import { updateHoliday } from "@/app/lib/actions/holiday";
import HolidayForm from "@/app/ui/holidays/HolidayForm";
import { formatDateInput } from "@/app/lib/dateUtils";

export default function EditHolidayButton({
  period,
}: {
  period: HolidayPeriod;
}) {
  const action = updateHoliday.bind(null, period.id);

  return (
    <HolidayForm
      mode="edit"
      action={action}
      initialValues={{
        name: period.name,
        startDate: formatDateInput(period.startDate),
        endDate: formatDateInput(period.endDate),
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
