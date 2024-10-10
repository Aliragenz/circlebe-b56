/*
  Warnings:

  - You are about to drop the column `likedBy` on the `threads` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "threads" DROP COLUMN "likedBy",
ADD COLUMN     "isLiked" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "replies" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "replies_pkey" PRIMARY KEY ("id")
);
