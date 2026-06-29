/*
  Warnings:

  - Changed the type of `color` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "JobColor" AS ENUM ('red', 'blue', 'green', 'yellow', 'olive', 'pink');

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "color",
ADD COLUMN     "color" "JobColor" NOT NULL;
