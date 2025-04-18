/*
  Warnings:

  - You are about to drop the column `vehicleId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_vehicleId_fkey";

-- DropIndex
DROP INDEX "Booking_vehicleId_idx";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "vehicleId";

-- DropTable
DROP TABLE "Vehicle";
