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

  await prisma.shift.deleteMany({});
  await prisma.job.deleteMany({});

  const lawson = await prisma.job.create({
    data: {
      name: "Lawson",
      color: "red",
      hourlyWage: 1300,
      defaultStart: "9:00",
      defaultEnd: "17:00",
      defaultRestMinutes: 60,
      userId: alice.id,
    },
  });

  const hotel = await prisma.job.create({
    data: {
      name: "Hotel",
      color: "blue",
      hourlyWage: 1500,
      defaultStart: "10:00",
      defaultEnd: "18:00",
      defaultRestMinutes: 30,
      userId: alice.id,
    },
  });

  const restaurant = await prisma.job.create({
    data: {
      name: "Restaurant",
      color: "green",
      hourlyWage: 1200,
      defaultStart: "11:00",
      defaultEnd: "19:00",
      defaultRestMinutes: 45,
      userId: alice.id,
    },
  });

  await prisma.shift.createMany({
    data: [
      {
        start: new Date(2026, 5, 1, 9, 0),
        end: new Date(2026, 5, 1, 17, 0),
        restMinutes: 60,
        jobId: lawson.id,
      },
      {
        start: new Date(2026, 5, 2, 10, 0),
        end: new Date(2026, 5, 2, 18, 0),
        restMinutes: 30,
        jobId: hotel.id,
      },
      {
        start: new Date(2026, 5, 3, 11, 0),
        end: new Date(2026, 5, 3, 19, 0),
        restMinutes: 45,
        jobId: restaurant.id,
      },
      // Double shift
      {
        start: new Date(2026, 5, 4, 9, 0),
        end: new Date(2026, 5, 4, 13, 0),
        restMinutes: 15,
        jobId: lawson.id,
      },
      {
        start: new Date(2026, 5, 4, 15, 0),
        end: new Date(2026, 5, 4, 20, 0),
        restMinutes: 30,
        jobId: hotel.id,
      },
      {
        start: new Date(2026, 5, 5, 9, 0),
        end: new Date(2026, 5, 5, 17, 0),
        restMinutes: 60,
        jobId: lawson.id,
      },
      {
        start: new Date(2026, 5, 6, 11, 0),
        end: new Date(2026, 5, 6, 19, 0),
        restMinutes: 45,
        jobId: restaurant.id,
      },
      {
        start: new Date(2026, 5, 8, 10, 0),
        end: new Date(2026, 5, 8, 18, 0),
        restMinutes: 30,
        jobId: hotel.id,
      },
      {
        start: new Date(2026, 5, 10, 9, 0),
        end: new Date(2026, 5, 10, 17, 0),
        restMinutes: 60,
        jobId: lawson.id,
      },
      {
        start: new Date(2026, 5, 12, 18, 0),
        end: new Date(2026, 5, 12, 22, 0),
        restMinutes: 15,
        jobId: restaurant.id,
      },
      {
        start: new Date(2026, 5, 14, 9, 0),
        end: new Date(2026, 5, 14, 17, 0),
        restMinutes: 60,
        jobId: hotel.id,
      },
      {
        start: new Date(2026, 5, 16, 11, 0),
        end: new Date(2026, 5, 16, 19, 0),
        restMinutes: 45,
        jobId: restaurant.id,
      },
      {
        start: new Date(2026, 5, 18, 9, 0),
        end: new Date(2026, 5, 18, 17, 0),
        restMinutes: 60,
        jobId: lawson.id,
      },
      // Triple shift
      {
        start: new Date(2026, 5, 20, 8, 0),
        end: new Date(2026, 5, 20, 12, 0),
        restMinutes: 15,
        jobId: lawson.id,
      },
      {
        start: new Date(2026, 5, 20, 13, 0),
        end: new Date(2026, 5, 20, 17, 0),
        restMinutes: 15,
        jobId: hotel.id,
      },
      {
        start: new Date(2026, 5, 20, 18, 0),
        end: new Date(2026, 5, 20, 22, 0),
        restMinutes: 15,
        jobId: restaurant.id,
      },
      {
        start: new Date(2026, 5, 22, 10, 0),
        end: new Date(2026, 5, 22, 18, 0),
        restMinutes: 30,
        jobId: hotel.id,
      },
      {
        start: new Date(2026, 5, 24, 9, 0),
        end: new Date(2026, 5, 24, 17, 0),
        restMinutes: 60,
        jobId: lawson.id,
      },
      {
        start: new Date(2026, 5, 25, 17, 0),
        end: new Date(2026, 5, 25, 22, 0),
        restMinutes: 15,
        jobId: restaurant.id,
      },
      {
        start: new Date(2026, 5, 27, 10, 0),
        end: new Date(2026, 5, 27, 18, 0),
        restMinutes: 30,
        jobId: hotel.id,
      },
      {
        start: new Date(2026, 5, 29, 9, 0),
        end: new Date(2026, 5, 29, 17, 0),
        restMinutes: 60,
        jobId: lawson.id,
      },
      {
        start: new Date(2026, 5, 30, 11, 0),
        end: new Date(2026, 5, 30, 19, 0),
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
