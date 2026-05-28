import { fetchJobs } from "@/app/lib/data";
import { Job } from "@/app/lib/definitions";

export default async function Page() {

  const jobs = await fetchJobs();

  console.log(jobs)

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Jobs Page</h1>
    </div>
  );
}
