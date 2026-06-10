import Link from "next/link";
import { deleteJob } from "@/app/lib/actions";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi2";

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
      className="flex items-center bg-blue-500 text-white py-1 px-2 rounded-sm text-sm md:text-base"
    >
      < FaRegEdit />
      <span className="ms-1">Edit</span>
    </Link>
  );
}

export function DeleteJob({ id }: { id: string }) {
  const deleteJobWithId = deleteJob.bind(null, id)

  return (
    <form action={deleteJobWithId}>
      <button className="flex items-center bg-red-500 text-white py-1 px-2 rounded-sm ml-2 text-sm md:text-base">
        <HiOutlineTrash />
        <span className="ms-1">Delete</span>
      </button>
    </form>
  );
}
