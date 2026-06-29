import EditJobForm from "@/app/ui/jobs/edit-form";
import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { colorMap, JobColor } from "@/app/lib/colorMap";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const job = await prisma.job.findUnique({
    where: {
      id: id,
    },
  });

  const styles = colorMap[job?.color as JobColor]

  if (!job) {
    notFound();
  }

  return (
    <>
      <div className="flex justify-start">
        <Link href="/jobs" className="flex items-center text-gray-600">
          <IoIosArrowBack />
          <span className="ms-2">勤務先一覧へ戻る</span>
        </Link>
      </div>
      <div className="flex items-center">
        <h1 className="font-bold text-2xl md:text-3xl mt-3 mb-3">
          勤務先を編集
        </h1>
        <div className={`size-8 ms-3 rounded-full ${styles.background}`}></div>
      </div>

      <EditJobForm job={job} />
    </>
  );
}
