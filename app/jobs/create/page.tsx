import CreateJobForm from "@/app/ui/jobs/create-form";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

export default function Page() {
  return (
    <>
      <Link href="/jobs" className="flex items-center text-gray-600">
        <IoIosArrowBack />
        <span className="ms-2">Back to Jobs</span>
      </Link>
      <h1 className="font-bold text-2xl md:text-3xl mt-2 mb-2">Create New Job</h1>
      <CreateJobForm />
    </>
  );
}
