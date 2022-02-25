/*
  Warnings:

  - Added the required column `description` to the `OfficialCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OfficialCategory" ADD COLUMN     "description" TEXT NOT NULL;
