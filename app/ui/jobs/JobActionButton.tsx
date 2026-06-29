import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Job } from "@/app/generated/prisma/browser";
import ArchiveJobButton from "@/app/ui/jobs/ArchiveJobButton";

export default function JobActionButton({ job }: { job: Job }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>操作</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href={`/jobs/${job.id}/edit`}
              className="flex cursor-pointer items-center gap-2"
            >
              <Pencil className="size-4" />
              編集
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <ArchiveJobButton id={job.id} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
