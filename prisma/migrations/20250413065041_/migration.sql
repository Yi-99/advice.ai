/*
  Warnings:

  - You are about to drop the column `avatar` on the `Advisor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Advisor" DROP COLUMN "avatar",
ADD COLUMN     "data" TEXT;
