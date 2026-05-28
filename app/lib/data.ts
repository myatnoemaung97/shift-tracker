import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

export async function fetchJobs() {
    try {
        const jobs = await sql`
            SELECT * FROM jobs;
         `;

        return jobs;
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw error;
    }
}