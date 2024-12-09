/*
  Warnings:

  - You are about to drop the column `giverId` on the `MatchHistory` table. All the data in the column will be lost.
  - You are about to drop the column `receiverId` on the `MatchHistory` table. All the data in the column will be lost.
  - Added the required column `giverUserId` to the `MatchHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverUserId` to the `MatchHistory` table without a default value. This is not possible if the table is not empty.
  - Made the column `region` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "MatchHistory_eventId_giverId_idx";

-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "status" SET DEFAULT 'ACCEPTED';

-- AlterTable
ALTER TABLE "MatchHistory" DROP COLUMN "giverId",
DROP COLUMN "receiverId",
ADD COLUMN     "giverUserId" TEXT NOT NULL,
ADD COLUMN     "receiverUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "region" SET NOT NULL;

-- CreateIndex
CREATE INDEX "MatchHistory_eventId_giverUserId_idx" ON "MatchHistory"("eventId", "giverUserId");
