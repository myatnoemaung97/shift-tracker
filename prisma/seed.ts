import { prisma } from "@/app/lib/prisma";

async function main() {
  const user = await prisma.user.findFirst();

  if (!user) {
    throw new Error(
      "No user found. Create an account first before running the seed.",
    );
  }

  await prisma.shift.deleteMany();
  await prisma.job.deleteMany();

  const lawson = await prisma.job.create({
    data: {
      name: "Lawson",
      color: "red",
      hourlyWage: 1300,
      defaultStart: "09:00",
      defaultEnd: "17:00",
      defaultRestMinutes: 60,
      userId: user.id,
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
      userId: user.id,
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
      userId: user.id,
    },
  });

  const convenienceStore = await prisma.job.create({
    data: {
      name: "FamilyMart",
      color: "yellow",
      hourlyWage: 1150,
      defaultStart: "08:00",
      defaultEnd: "16:00",
      defaultRestMinutes: 60,
      archivedAt: new Date(2026, 2, 15), // March 15, 2026
      userId: user.id,
    },
  });

  const cafe = await prisma.job.create({
    data: {
      name: "Cafe",
      color: "purple",
      hourlyWage: 1250,
      defaultStart: "07:30",
      defaultEnd: "15:30",
      defaultRestMinutes: 45,
      archivedAt: new Date(2026, 4, 10), // May 10, 2026
      userId: user.id,
    },
  });

  const tutoring = await prisma.job.create({
    data: {
      name: "English Tutor",
      color: "orange",
      hourlyWage: 1800,
      defaultStart: "18:00",
      defaultEnd: "20:00",
      defaultRestMinutes: 0,
      archivedAt: new Date(2026, 0, 20), // January 20, 2026
      userId: user.id,
    },
  });

  await prisma.shift.createMany({
    data: [
      // Week 1
      {
        start: new Date(2026, 5, 1, 9, 0),
        end: new Date(2026, 5, 1, 17, 0),
        restMinutes: 60,
        jobId: lawson.id,
      },
      {
        start: new Date(2026, 5, 2, 17, 0),
        end: new Date(2026, 5, 2, 22, 0),
        restMinutes: 15,
        jobId: restaurant.id,
      },
      {
        start: new Date(2026, 5, 4, 10, 0),
        end: new Date(2026, 5, 4, 18, 0),
        restMinutes: 30,
        jobId: hotel.id,
      },
      {
        start: new Date(2026, 5, 6, 9, 0),
        end: new Date(2026, 5, 6, 13, 0),
        restMinutes: 15,
        jobId: lawson.id,
      },
      {
        start: new Date(2026, 5, 6, 15, 0),
        end: new Date(2026, 5, 6, 20, 0),
        restMinutes: 15,
        jobId: restaurant.id,
      },

      // Week 2
      {
        start: new Date(2026, 5, 8, 9, 0),
        end: new Date(2026, 5, 8, 17, 0),
        restMinutes: 60,
        jobId: lawson.id,
      },
      {
        start: new Date(2026, 5, 10, 18, 0),
        end: new Date(2026, 5, 10, 22, 0),
        restMinutes: 15,
        jobId: restaurant.id,
      },
      {
        start: new Date(2026, 5, 12, 10, 0),
        end: new Date(2026, 5, 12, 18, 0),
        restMinutes: 30,
        jobId: hotel.id,
      },
      {
        start: new Date(2026, 5, 13, 9, 0),
        end: new Date(2026, 5, 13, 17, 0),
        restMinutes: 60,
        jobId: lawson.id,
      },

      // Week 3
      {
        start: new Date(2026, 5, 15, 11, 0),
        end: new Date(2026, 5, 15, 19, 0),
        restMinutes: 45,
        jobId: restaurant.id,
      },
      {
        start: new Date(2026, 5, 17, 10, 0),
        end: new Date(2026, 5, 17, 18, 0),
        restMinutes: 30,
        jobId: hotel.id,
      },
      {
        start: new Date(2026, 5, 18, 9, 0),
        end: new Date(2026, 5, 18, 17, 0),
        restMinutes: 60,
        jobId: lawson.id,
      },

      // Triple shift showcase
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

      // Week 4
      {
        start: new Date(2026, 5, 22, 9, 0),
        end: new Date(2026, 5, 22, 17, 0),
        restMinutes: 60,
        jobId: lawson.id,
      },
      {
        start: new Date(2026, 5, 23, 17, 0),
        end: new Date(2026, 5, 23, 22, 0),
        restMinutes: 15,
        jobId: restaurant.id,
      },
      {
        start: new Date(2026, 5, 25, 10, 0),
        end: new Date(2026, 5, 25, 18, 0),
        restMinutes: 30,
        jobId: hotel.id,
      },
      {
        start: new Date(2026, 5, 27, 9, 0),
        end: new Date(2026, 5, 27, 17, 0),
        restMinutes: 60,
        jobId: lawson.id,
      },

      // End of month
      {
        start: new Date(2026, 5, 28, 18, 0),
        end: new Date(2026, 5, 28, 22, 0),
        restMinutes: 15,
        jobId: restaurant.id,
      },
      {
        start: new Date(2026, 5, 29, 10, 0),
        end: new Date(2026, 5, 29, 18, 0),
        restMinutes: 30,
        jobId: hotel.id,
      },
      {
        start: new Date(2026, 5, 30, 9, 0),
        end: new Date(2026, 5, 30, 17, 0),
        restMinutes: 60,
        jobId: lawson.id,
      },
    ],
  });

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
