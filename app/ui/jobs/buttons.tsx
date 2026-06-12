import Link from "next/link";
import { deleteJob } from "@/app/lib/actions";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi2";
import { HiPlus } from "react-icons/hi";

export function CreateJob() {
  return (
    <Link
      href="/jobs/create"
      className="flex items-center px-5 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
    >
      <HiPlus className="size-5 me-1" /> <span>勤務先を追加</span>
    </Link>
  );
}

export function EditJob({ id }: { id: string }) {
  return (
    <Link
      href={`/jobs/${id}/edit`}
      className="flex items-center bg-blue-500 text-white py-1 px-2 rounded-sm text-sm md:text-base hover:bg-blue-600 transition-colors"
    >
      <FaRegEdit />
      <span className="ms-1">編集</span>
    </Link>
  );
}

export function DeleteJob({ id }: { id: string }) {
  const deleteJobWithId = deleteJob.bind(null, id);

  return (
    <form action={deleteJobWithId}>
      <button className="flex items-center bg-red-500 text-white py-1 px-2 rounded-sm ml-2 text-sm md:text-base hover:bg-red-600 transition-colors cursor-pointer">
        <HiOutlineTrash />
        <span className="ms-1">削除</span>
      </button>
    </form>
  );
}
