/*
  Warnings:

  - The values [olive] on the enum `JobColor` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "JobColor_new" AS ENUM ('red', 'blue', 'green', 'yellow', 'orange', 'amber', 'emerald', 'cyan', 'purple', 'pink', 'slate');
ALTER TABLE "Job" ALTER COLUMN "color" TYPE "JobColor_new" USING ("color"::text::"JobColor_new");
ALTER TYPE "JobColor" RENAME TO "JobColor_old";
ALTER TYPE "JobColor_new" RENAME TO "JobColor";
DROP TYPE "public"."JobColor_old";
COMMIT;
