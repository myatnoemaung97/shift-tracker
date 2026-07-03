import { Prisma } from "@/app/generated/prisma/client";

export type ShiftWithJob = Prisma.ShiftGetPayload<{
  include: { job: true };
}>;

export type JobState = {
  errors?: {
    name?: string[];
    hourlyWage?: string[];
    color?: string[];
    defaultRestMinutes?: string[];
  };
  values?: {
    name?: string;
    hourlyWage?: string;
    color?: string;
    defaultStart?: string;
    defaultEnd?: string;
    defaultRestMinutes?: string;
  };
  message?: string | null;
};

export type ShiftState = {
  message: string | null;
  errors: {
    jobId?: string[];
    start?: string[];
    end?: string[];
    restMinutes?: string[];
  };
  values: {
    jobId?: string;
    start?: string;
    end?: string;
    restMinutes?: string;
  };
};

export type SignupState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  values?: {
    name?: string;
    email?: string;
  };
  message?: string;
  success?: boolean;
};

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  values?: {
    email?: string;
  };
  message?: string;
};

export type HolidayState = {
  errors: {
    name?: string[];
    startDate?: string[];
    endDate?: string[];
  };

  values: {
    name?: string;
    startDate?: string;
    endDate?: string;
  };

  message: string | null;
};