import type { User, Job, Shift } from "@/app/lib/definitions";
import postgres from "postgres";
import { users, jobs, shifts } from "@/app/lib/placeholder-data";
// @ts-ignore
import bcrypt from "bcrypt";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

async function seedUsers(sql: any) {
  // await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  // await sql`DROP TABLE IF EXISTS users CASCADE`;
  // await sql`
  //   CREATE TABLE IF NOT EXISTS users (
  //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  //     name VARCHAR(255) NOT NULL,
  //     email TEXT NOT NULL UNIQUE,
  //     password TEXT NOT NULL,
  //     created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  //   );
  // `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password, created_at)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.created_at})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedJobs(sql: any) {
  // await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  // await sql`DROP TABLE IF EXISTS jobs CASCADE`;
  // await sql`
  //   CREATE TABLE IF NOT EXISTS jobs (
  //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  //     user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  //     name VARCHAR(255) NOT NULL,
  //     hourly_wage INTEGER NOT NULL,
  //     color VARCHAR(7) NOT NULL,
  //     created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  //   );
  // `;
 

  const insertedJobs = await Promise.all(
    jobs.map(async (job) => {
      return sql`
        INSERT INTO jobs (id, user_id, name, hourly_wage, color, created_at)
        VALUES (${job.id}, ${job.user_id}, ${job.name}, ${job.hourly_wage}, ${job.color}, ${job.created_at})
        ON CONFLICT (id) REPLACE;
      `;
    }),
  );

  console.log("Inserted jobs:", insertedJobs);

  return insertedJobs;
}

async function seedShifts(sql: any) {
  // await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  // await sql`DROP TABLE IF EXISTS shifts CASCADE`;
  // await sql`
  //   CREATE TABLE IF NOT EXISTS shifts (
  //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  //     job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  //     date DATE NOT NULL,
  //     start_time TIME NOT NULL,
  //     end_time TIME NOT NULL,
  //     break_minutes INTEGER NOT NULL,
  //     created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  //   );
  // `;

  // Add shift seeding logic here if needed

  const insertedShifts = await Promise.all(
    shifts.map(async (shift) => {
      return sql`
        INSERT INTO shifts (id, job_id, date, start_time, end_time, break_minutes, created_at)
        VALUES (${shift.id}, ${shift.job_id}, ${shift.date}, ${shift.start_time}, ${shift.end_time}, ${shift.break_minutes}, ${shift.created_at})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedShifts;
}

export async function wipe(sql: any) {
  await sql`
    TRUNCATE TABLE jobs, users, shifts
    RESTART IDENTITY
    CASCADE;
  `;
}

export async function GET() {
  
  try {
    const result = await sql.begin((sql) => [
      seedUsers(sql),
      seedJobs(sql),
      seedShifts(sql),
    ]);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Error seeding database:", error);
    return Response.json({ error }, { status: 500 });
  }
}
