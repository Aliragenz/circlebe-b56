/*
  Warnings:

  - Added the required column `isLiked` to the `threads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "threads" ADD COLUMN     "isLiked" BOOLEAN NOT NULL;
