import type { Job } from "@/app/generated/prisma/browser";
import { updateJob } from "@/app/lib/actions";


export default function EditJobForm({job} : { job: Job}) {
  const updateJobWithId = updateJob.bind(null, job.id)

  return (
    
      <form action={updateJobWithId} className="flex flex-col">
        <label htmlFor="name">Job Name:</label>
        <input className="border" type="text" id="name" name="name" defaultValue={job.name} required />

        <label htmlFor="hourlyWage">Hourly Wage:</label>
        <input
          className="border"
          type="number"
          id="hourlyWage"
          name="hourlyWage"
          defaultValue={job.hourlyWage}
          required
        />

        <label htmlFor="color">Color:</label>
        <select id="color" name="color" defaultValue={job.color} required>
          <option value='red'>Red</option>
          <option value='blue'>Blue</option>
          <option value='green'>Green</option>
          <option value='yellow'>Yellow</option>
          <option value='pink'>Pink</option>
        </select>

        <button className="border" type="submit">
          Create Job
        </button>
      </form>
    
  );
}
