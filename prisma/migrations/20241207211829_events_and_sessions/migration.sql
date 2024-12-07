-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('upcoming', 'active', 'ended');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "loginCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "region" TEXT DEFAULT 'africa';

-- CreateTable
CREATE TABLE "SecretSantaEvent" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'ended',
    "date" TIMESTAMP(3) NOT NULL,
    "participants" INTEGER NOT NULL,
    "isPast" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "SecretSantaEvent_pkey" PRIMARY KEY ("id")
);
