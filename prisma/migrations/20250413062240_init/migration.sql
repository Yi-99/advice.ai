/*
  Warnings:

  - The `avatar` column on the `Advisor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Advisor" DROP COLUMN "avatar",
ADD COLUMN     "avatar" BYTEA;
