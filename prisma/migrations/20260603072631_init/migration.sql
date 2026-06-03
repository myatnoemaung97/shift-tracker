/*
  Warnings:

  - You are about to drop the column `hourWage` on the `Job` table. All the data in the column will be lost.
  - Added the required column `hourly_wage` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "hourWage",
ADD COLUMN     "hourly_wage" DOUBLE PRECISION NOT NULL;
