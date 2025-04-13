-- AlterTable
ALTER TABLE "Advisor" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "chatCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "config" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "createdBy" TEXT;
