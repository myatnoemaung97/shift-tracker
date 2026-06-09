import { createJob } from "@/app/lib/actions";
import { jobColors } from "@/app/lib/colorMap";

export default function Page() {
  return (
    <div>
      <form action={createJob} className="flex flex-col">
        <label htmlFor="name">Job Name:</label>
        <input className="border" type="text" id="name" name="name" required />

        <label htmlFor="hourlyWage">Hourly Wage:</label>
        <input
          className="border"
          type="number"
          id="hourlyWage"
          name="hourlyWage"
          required
        />

        <label htmlFor="color">Color:</label>
        <select id="color" name="color" required>
          {/* <option value='red'>Red</option>
          <option value='blue'>Blue</option>
          <option value='green'>Green</option>
          <option value='yellow'>Yellow</option>
          <option value='pink'>Pink</option> */}
          {jobColors.map((color) => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>

        <button className="border" type="submit">
          Create Job
        </button>
      </form>
    </div>
  );
}
