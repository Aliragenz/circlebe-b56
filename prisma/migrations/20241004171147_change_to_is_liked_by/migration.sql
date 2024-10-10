/*
  Warnings:

  - You are about to drop the column `isLiked` on the `threads` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "threads" DROP COLUMN "isLiked",
ADD COLUMN     "likedBy" INTEGER[];
