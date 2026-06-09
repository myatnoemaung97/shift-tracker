import { prisma } from "@/app/lib/prisma";

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@gmail.com" },
    update: {},
    create: {
      email: "alice@gmail.com",
      name: "Alice",
      password: "password123",
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@gmail.com" },
    update: {},
    create: {
      email: "bob@gmail.com",
      name: "Bob",
      password: "password123",
    },
  });

  const lawson = await prisma.job.upsert({
    where: { name: "Lawson" },
    update: {},
    create: {
      name: "Lawson",
      color: "red",
      hourlyWage: 1300,
      userId: alice.id,
    },
  });

  const hotel = await prisma.job.upsert({
    where: { name: "Hotel" },
    update: {},
    create: {
      name: "Hotel",
      color: "blue",
      hourlyWage: 1500,
      userId: alice.id,
    },
  });

  const restaurant = await prisma.job.upsert({
    where: { name: "Restaurant" },
    update: {},
    create: {
      name: "Restaurant",
      color: "green",
      hourlyWage: 1200,
      userId: alice.id,
    },
  });

  prisma.shift.deleteMany({});

  const shift1 = await prisma.shift.createMany({
    data: [
      {
        start: new Date("2026-06-01T09:00:00Z"),
        end: new Date("2026-06-01T17:00:00Z"),
        restMinutes: 60,
        jobId: lawson.id,
      },
      {
        start: new Date("2026-06-02T10:00:00Z"),
        end: new Date("2026-06-02T18:00:00Z"),
        restMinutes: 30,
        jobId: hotel.id,
      },
      {
        start: new Date("2026-06-03T11:00:00Z"),
        end: new Date("2026-06-03T19:00:00Z"),
        restMinutes: 45,
        jobId: restaurant.id,
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
