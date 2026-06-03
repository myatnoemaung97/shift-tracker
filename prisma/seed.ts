import { prisma } from "@/app/lib/prisma";

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@gmail.com" },
    update: {},
    create: {
      email: "alice@gmail.com",
      name: "Alice",
      password: "password123",
    }
  })

  const bob = await prisma.user.upsert({
    where: { email: "bob@gmail.com" },
    update: {},
    create: {
      email: "bob@gmail.com",
      name: "Bob",
      password: "password123",
    }
  })

  const lawson = await prisma.job.upsert({
    where: { name: "Lawson" },
    update: {},
    create: {
      name: "Lawson",
      color: "red",
      hourly_wage: 1300,
      userId: alice.id,
    }
  })

  const hotel = await prisma.job.upsert({
    where: { name: "Hotel" },
    update: {},
    create: {
      name: "Hotel",
      color: "blue",
      hourly_wage: 1500,
      userId: alice.id,
    }
  })
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