import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

async function seed() {
  await sql`DROP TABLE IF EXISTS comments`;

  await sql`

CREATE TABLE comments (

    id SERIAL PRIMARY KEY,

    content TEXT NOT NULL

    )

`;

  await sql`

INSERT INTO comments (content) VALUES

    ('This is the  comment 1.'),

    ('This is the second comment number 2.'),

    ('This is the third comment.')

`;
}

export async function GET() {
  try {
    await seed();

    return new Response("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);

    return new Response("Failed to seed database.", {
      status: 500,
    });
  }
}
