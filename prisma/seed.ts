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
      // =========================
      // Week 1 (Normal)
      // =========================
      {
        start: new Date(2026, 6, 1, 9, 0),
        end: new Date(2026, 6, 1, 17, 0),
        restMinutes: 60,
        jobId: lawson.id,
      },
      {
        start: new Date(2026, 6, 3, 17, 0),
        end: new Date(2026, 6, 3, 22, 0),
        restMinutes: 15,
        jobId: restaurant.id,
      },

      // =========================
      // Rolling week exceeding 28 hours
      // July 6 - July 12
      // Total = 33 hours
      // =========================
      {
        start: new Date(2026, 6, 6, 9, 0),
        end: new Date(2026, 6, 6, 17, 0),
        restMinutes: 60, // 7h
        jobId: lawson.id,
      },
      {
        start: new Date(2026, 6, 7, 10, 0),
        end: new Date(2026, 6, 7, 18, 0),
        restMinutes: 60, // 7h
        jobId: hotel.id,
      },
      {
        start: new Date(2026, 6, 9, 17, 0),
        end: new Date(2026, 6, 9, 22, 0),
        restMinutes: 0, // 5h
        jobId: restaurant.id,
      },
      {
        start: new Date(2026, 6, 10, 9, 0),
        end: new Date(2026, 6, 10, 17, 0),
        restMinutes: 60, // 7h
        jobId: hotel.id,
      },
      {
        start: new Date(2026, 6, 12, 9, 0),
        end: new Date(2026, 6, 12, 16, 0),
        restMinutes: 0, // 7h
        jobId: cafe.id,
      },

      // =========================
      // Normal week
      // =========================
      {
        start: new Date(2026, 6, 15, 10, 0),
        end: new Date(2026, 6, 15, 16, 0),
        restMinutes: 30, // 5.5h
        jobId: hotel.id,
      },

      // =========================
      // Daily limit exceeded
      // July 18
      // Working = 9.5h
      // =========================
      {
        start: new Date(2026, 6, 18, 9, 0),
        end: new Date(2026, 6, 18, 19, 0),
        restMinutes: 30,
        jobId: lawson.id,
      },

      // =========================
      // Rest of month (Normal)
      // =========================
      {
        start: new Date(2026, 6, 21, 17, 0),
        end: new Date(2026, 6, 21, 22, 0),
        restMinutes: 15,
        jobId: restaurant.id,
      },
      {
        start: new Date(2026, 6, 23, 10, 0),
        end: new Date(2026, 6, 23, 18, 0),
        restMinutes: 60,
        jobId: hotel.id,
      },
      {
        start: new Date(2026, 6, 25, 9, 0),
        end: new Date(2026, 6, 25, 17, 0),
        restMinutes: 60,
        jobId: lawson.id,
      },
      {
        start: new Date(2026, 6, 28, 17, 0),
        end: new Date(2026, 6, 28, 22, 0),
        restMinutes: 15,
        jobId: restaurant.id,
      },
      {
        start: new Date(2026, 6, 30, 10, 0),
        end: new Date(2026, 6, 30, 18, 0),
        restMinutes: 60,
        jobId: hotel.id,
      },
    ],
  });

  await prisma.holidayPeriod.createMany({
    data: {
      name: "夏休み",
      startDate: new Date(2026, 6, 21), // July 21, 2026
      endDate: new Date(2026, 7, 31), // August 31, 2026
      userId: user.id,
    },
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
