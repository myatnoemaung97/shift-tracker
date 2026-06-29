import { archiveJob } from "@/app/lib/actions/jobs";
import { ArchiveX } from "lucide-react";

export default function ArchiveJobButton({ id }: { id: string }) {
  const action = archiveJob.bind(null, id);

  return (
    <form action={action}>
      <button
        type="submit"
        className="flex items-center gap-2 w-full text-left text-xs hover:bg-accent rounded-sm cursor-pointer"
      >
        <ArchiveX className="size-4" />
        アーカイブ
      </button>
    </form>
  );
}
