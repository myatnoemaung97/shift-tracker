import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HolidayPeriod } from "@/app/generated/prisma/browser";
import EditHolidayButton from "@/app/ui/holidays/EditHolidayButton";
import DeleteHolidayButton  from "@/app/ui/holidays/DeleteHolidayButton";

export default function HolidayActionButton({
  period,

}: {
  period: HolidayPeriod;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="p-0" variant="ghost">
          <BsThreeDotsVertical className="size-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>操作</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <EditHolidayButton period={period} />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            {/* <DeleteShiftButton
              id={shift.id}
              year={shift.start.getFullYear()}
              month={shift.start.getMonth() + 1}
            /> */}
            <DeleteHolidayButton id={period.id} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
