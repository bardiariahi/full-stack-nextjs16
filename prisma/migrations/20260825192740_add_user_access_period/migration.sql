/*
  Warnings:

  - You are about to drop the column `activatedBy` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "activatedBy",
ADD COLUMN     "activatedById" TEXT;

-- CreateIndex
CREATE INDEX "Session_expiresAt_idx" ON "Session"("expiresAt");

-- CreateIndex
CREATE INDEX "User_status_idx" ON "User"("status");

-- CreateIndex
CREATE INDEX "User_activeUntil_idx" ON "User"("activeUntil");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activatedById_fkey" FOREIGN KEY ("activatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
