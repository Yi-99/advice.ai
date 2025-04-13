/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Advisor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Advisor" DROP COLUMN "createdBy",
ALTER COLUMN "config" DROP DEFAULT,
ALTER COLUMN "config" SET DATA TYPE TEXT;
