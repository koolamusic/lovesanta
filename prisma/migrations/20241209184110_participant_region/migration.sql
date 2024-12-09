-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "region" TEXT NOT NULL DEFAULT 'africa';
