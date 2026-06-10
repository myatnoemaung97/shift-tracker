import EditJobForm from "@/app/ui/jobs/edit-form";
import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const job = await prisma.job.findUnique({
    where: {
      id: id,
    },
  });

  if (!job) {
    notFound();
  }

  return <EditJobForm job={job} />;
}
