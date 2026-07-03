import { HolidayPeriod } from "@/app/generated/prisma/browser";
import { updateHoliday } from "@/app/lib/actions/holiday";
import { formatDateInput } from "@/app/lib/dateUtils";
import HolidayForm from "./HolidayForm";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function EditHolidayDialog({
  holiday,
}: {
  holiday: HolidayPeriod;
}) {
  return (
    <HolidayForm
      mode="edit"
      action={updateHoliday.bind(null, holiday.id)}
      initialValues={{
        name: holiday.name,
        startDate: formatDateInput(holiday.startDate),
        endDate: formatDateInput(holiday.endDate),
      }}
      trigger={
        <Button variant="ghost" size="icon">
          <Pencil className="size-4" />
        </Button>
      }
    />
  );
}