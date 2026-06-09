import { Client } from "pg";

export default async function TEST() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  console.log("connected");

  return (
    <div>
      <h1>Test Page</h1>
    </div>
  );
}
