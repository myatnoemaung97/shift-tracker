export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
};

export type Job = {
    id: string;
    user_id: string;
    name: string;
    hourly_wage: number;
    color: string;
    created_at: Date;
}

export type Shift = {
    id: string;
    job_id: string;
    user_id: string;
    date: Date;
    start_time: Date;
    end_time: Date;
    break_minutes: number;
    created_at: Date;
}