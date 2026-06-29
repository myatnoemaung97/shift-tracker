/*
  Warnings:

  - You are about to drop the column `archived` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "archived",
ADD COLUMN     "archived_at" TIMESTAMP(3);
