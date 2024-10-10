/*
  Warnings:

  - You are about to drop the `Follows` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ThreadImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followingId_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_threadId_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "ThreadImages" DROP CONSTRAINT "ThreadImages_threadId_fkey";

-- DropForeignKey
ALTER TABLE "threads" DROP CONSTRAINT "threads_threadId_fkey";

-- DropTable
DROP TABLE "Follows";

-- DropTable
DROP TABLE "Likes";

-- DropTable
DROP TABLE "ThreadImages";
