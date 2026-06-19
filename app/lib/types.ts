import { Prisma } from "@/app/generated/prisma/client";

export type ShiftWithJob = Prisma.ShiftGetPayload<{
  include: { job: true };
}>;