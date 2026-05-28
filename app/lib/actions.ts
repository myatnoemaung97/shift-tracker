'use server';
import postgres from "postgres";


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


export async function createJob(FormData: FormData) {
    try{
        const name = FormData.get("name") as string;
        const hourly_wage = parseFloat(FormData.get("hourly_wage") as string);
        const color = FormData.get("color") as string;

        await sql`
            INSERT INTO jobs (user_id, name, hourly_wage, color, created_at)
            VALUES ('11111111-1111-1111-1111-111111111111', ${name}, ${hourly_wage}, ${color}, CURRENT_TIMESTAMP)
        `;
       
    } catch (error) {
        console.error("Error creating job:", error);
        throw error;
    }
}

