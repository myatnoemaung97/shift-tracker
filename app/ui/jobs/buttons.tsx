import Link from "next/link";
import { Plus } from "lucide-react";
import { ArchiveRestore } from "lucide-react";
import { restoreJob } from "@/app/lib/actions/jobs";

export function CreateJobButton() {
  return (
    <Link
      href="/jobs/create"
      className="flex items-center px-5 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
    >
      <Plus className="size-4 me-1" />{" "}
      <span className="text-sm">勤務先を追加</span>
    </Link>
  );
}

export function RestoreJobButton({ id }: { id: string }) {
  const action = restoreJob.bind(null, id);

  return (
    <form action={action}>
      <button className="inline-flex items-center gap-2 rounded-md border border-indigo-500 px-3 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <ArchiveRestore className="size-4" />
        <span>復元</span>
      </button>
    </form>
  );
}
