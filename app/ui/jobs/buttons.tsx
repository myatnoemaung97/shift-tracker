import Link from "next/link";
import { deleteJob } from "@/app/lib/actions";

export function CreateJob() {
  return (
    <Link
      href="/jobs/create"
      className="px-5 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
    >
      + Add Job
    </Link>
  );
}

export function EditJob({ id }: { id: string }) {
  return (
    <Link
      href={`/jobs/${id}/edit`}
      className="bg-blue-500 text-white py-1 px-2 rounded-sm text-sm md:text-base"
    >
      Edit
    </Link>
  );
}

export function DeleteJob({ id }: { id: string }) {
  const deleteJobWithId = deleteJob.bind(null, id)

  return (
    <form action={deleteJobWithId}>
      <button className="bg-red-500 text-white py-1 px-2 rounded-sm ml-2 text-sm md:text-base">
        Delete
      </button>
    </form>
  );
}
