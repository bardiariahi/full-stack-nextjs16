-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED', 'REJECTED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ActivationType" AS ENUM ('MANUAL', 'SYSTEM');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activatedAt" TIMESTAMP(3),
ADD COLUMN     "activatedBy" TEXT,
ADD COLUMN     "activationType" "ActivationType",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER',
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'PENDING';
