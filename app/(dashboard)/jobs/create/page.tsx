import CreateJobForm from "@/app/ui/jobs/create-form";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

export default function Page() {
  return (
    <>
      <div className="flex justify-start">
        <Link href="/jobs" className="flex items-center text-gray-600">
          <IoIosArrowBack />
          <span className="ms-2">勤務先一覧へ戻る</span>
        </Link>
      </div>
      <h1 className="font-bold text-2xl md:text-3xl mt-3 mb-3">勤務先を追加</h1>
      <CreateJobForm />
    </>
  );
}
