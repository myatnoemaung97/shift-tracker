/*
  Warnings:

  - You are about to drop the `HolidayPeriod` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HolidayPeriod" DROP CONSTRAINT "HolidayPeriod_user_id_fkey";

-- DropTable
DROP TABLE "HolidayPeriod";

-- CreateTable
CREATE TABLE "holiday_periods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "holiday_periods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "holiday_periods" ADD CONSTRAINT "holiday_periods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
