import { prisma } from "@/app/lib/prisma"

export default async function Calendar() {

  const jobs = await prisma.job

  const shifts = await prisma.job.findMany()

  return (
    <div>
      <h1 className="font-bold text-2xl md:text-3xl">Shifts</h1>

      <div className="grid grid-cols-7 border">
        {Array.from({ length: 31 }, (_, i) => (
          <div key={i} className="p-4 border">
            <h2 className="font-semibold text-lg">{i}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}
