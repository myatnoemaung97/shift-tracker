"use server";
import { prisma } from "@/app/lib/prisma";
import { z } from "zod";
import { jobColors } from "@/app/lib/colorMap";
import { redirectAndRevalidate } from "@/app/lib/helpers";

const Job = z.object({
  id: z.string(),
  name: z.string(),
  hourlyWage: z.coerce.number(),
  color: z.literal(jobColors),
  userId: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

const CreateJob = Job.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

const UpdateJob = Job.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export async function createJob(formData: FormData) {
  console.log('*****create job function called*****')
  const { name, hourlyWage, color } = CreateJob.parse({
    name: formData.get("name"),
    hourlyWage: formData.get("hourlyWage"),
    color: formData.get("color"),
  });

  const user = await prisma.user.findFirst();

  if (user) {
    try {
      await prisma.job.create({
        data: {
          name: name,
          hourlyWage: hourlyWage,
          color: color,
          userId: user.id,
        },
      });
    } catch (error) {
      console.error(error);
      return {
        message: "Database Error: Failed to Create Invoice.",
      };
    }
  }

  redirectAndRevalidate("/jobs");
}

export async function updateJob(id: string, formData: FormData) {
  const { name, hourlyWage, color } = UpdateJob.parse({
    name: formData.get("name"),
    hourlyWage: formData.get("hourlyWage"),
    color: formData.get("color"),
  });

  try {
    await prisma.job.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        hourlyWage: hourlyWage,
        color: color,
      },
    });
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to Update Invoice." };
  }

  redirectAndRevalidate("/jobs");
}

export async function deleteJob(id: string) {
  throw new Error("Failed to Delete Invoice");

  await prisma.job.delete({
    where: {
      id: id,
    },
  });

  redirectAndRevalidate("/jobs");
}
