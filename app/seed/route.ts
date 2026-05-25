import type { User, Job, Shift } from "@/app/lib/definitions";
import postgres from "postgres";
import { users, jobs } from "@/app/lib/placeholder-data";
// @ts-ignore
import bcrypt from "bcrypt";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

async function seedUsers(sql: any) {
  console.log("Seeding users...");
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedJobs(sql: any) {
  console.log("Seeding jobs...");
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS jobs (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      hourly_wage INTEGER NOT NULL,
      color VARCHAR(7) NOT NULL
    );
  `;

  const insertedJobs = await Promise.all(
    jobs.map(async (job) => {
      return sql`
        INSERT INTO jobs (id, user_id, name, hourly_wage, color)
        VALUES (${job.id}, ${job.user_id}, ${job.name}, ${job.hourly_wage}, ${job.color})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedJobs;
}

// export async function wipe(sql: any) {
//   // 1. Get all table names in the public schema
//   const tables = await sql`
//     SELECT table_name
//     FROM information_schema.tables
//     WHERE table_schema = 'public'
//     AND table_type = 'BASE TABLE';
//   `;

//   // 2. If the database is already empty, do nothing
//   if (tables.length === 0) return;

//   // 3. Map out the table names and join them into a comma-separated string
//   const tableNames = tables.map((t) => `"${t.table_name}"`).join(', ');

//   // 4. Drop all tables forcefully using CASCADE
//   // CASCADE automatically drops objects (like foreign keys) that depend on these tables
//   await sql.unsafe(`DROP TABLE IF EXISTS ${tableNames} CASCADE;`);
// }

export async function wipe(sql: any) {
  await sql`
    TRUNCATE TABLE jobs, users
    RESTART IDENTITY
    CASCADE;
  `;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      // wipe(sql),
      seedUsers(sql),
      seedJobs(sql),
    ]);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
