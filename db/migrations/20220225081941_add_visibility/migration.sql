/*
  Warnings:

  - You are about to drop the column `available` on the `CustomCategory` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CustomCategoryVisibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "CustomCategory" DROP COLUMN "available",
ADD COLUMN     "visibility" "CustomCategoryVisibility" NOT NULL DEFAULT E'PRIVATE';
