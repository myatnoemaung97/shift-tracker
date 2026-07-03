import HolidayForm from "@/app/ui/holidays/HolidayForm";
import { createHoliday } from "@/app/lib/actions/holiday";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CreateHolidayDialog() {
  return (
    <HolidayForm
      mode="create"
      action={createHoliday}
      trigger={
        <Button className="bg-indigo-500 hover:bg-indigo-600 text-white hover:text-white">
          <Plus className="size-4" />
          長期休暇を追加
        </Button>
      }
    />
  );
}