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
import { DeleteShiftButton } from "@/app/ui/shifts/buttons";
import { ShiftWithJob } from "@/app/lib/types";
import { Job } from "@/app/generated/prisma/browser";
import EditShiftButton from "@/app/ui/shifts/EditShiftButton";

export default function ShiftActionButton({
  shift,
  jobs,
}: {
  shift: ShiftWithJob;
  jobs: Job[];
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
            <EditShiftButton jobs={jobs} shift={shift} />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <DeleteShiftButton
              id={shift.id}
              year={shift.start.getFullYear()}
              month={shift.start.getMonth() + 1}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
