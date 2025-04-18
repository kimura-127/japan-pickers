/*
  Warnings:

  - Added the required column `arrivalTime` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureTime` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "arrivalTime" TEXT NOT NULL,
ADD COLUMN     "departureTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "phone" DROP NOT NULL;
