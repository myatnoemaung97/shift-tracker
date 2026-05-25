import type { User, Job, Shift } from "@/app/lib/definitions";

export const users: User[] = [
    {
        id: "11111111-1111-1111-1111-111111111111",
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        created_at: new Date(),
    },
    {
        id: "22222222-2222-2222-2222-222222222222",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: "password456",
        created_at: new Date(),
    },
    // {
    //     id: "sdf-2342-4f23-9sdf-2342sdf-dkfjg9sdf",
    //     name: "Bob Johnson",
    //     email: "bob.johnson@example.com",
    //     password: "password789",
    //     created_at: new Date(),
    // }
];

export const jobs: Job[] = [
    {
        id: "310544b2-4001-4271-9855-fec4b6a6442a",
        user_id: users[0].id,
        name: "Mikage Life",
        hourly_wage: 1300,
        color: "#FF5733",
        created_at: new Date(),
    },
    {
        id: "910544b2-4001-4271-9855-fec4b6a6442b",
        user_id: users[1].id,
        name: "Restaurant",
        hourly_wage: 1200,
        color: "#33FF57",
        created_at: new Date(),
    },
    {
        id: "510544b2-4001-4271-9855-fec4b6a6442c",
        user_id: users[1].id,
        name: "Hotel",
        hourly_wage: 1150,
        color: "#3357FF",
        created_at: new Date(),
    }
];