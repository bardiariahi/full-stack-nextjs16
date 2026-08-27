-- AlterEnum
ALTER TYPE "UserStatus" ADD VALUE 'INACTIVE';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activeFrom" TIMESTAMP(3),
ADD COLUMN     "activeUntil" TIMESTAMP(3);
