/*
  Warnings:

  - You are about to drop the `replies` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userName]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userName` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "threads" ADD COLUMN     "threadId" INTEGER;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "userName" SET NOT NULL;

-- DropTable
DROP TABLE "replies";

-- CreateTable
CREATE TABLE "ThreadImages" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "threadId" INTEGER NOT NULL,

    CONSTRAINT "ThreadImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "userId" INTEGER NOT NULL,
    "threadId" INTEGER NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("userId","threadId")
);

-- CreateTable
CREATE TABLE "Follows" (
    "followingId" INTEGER NOT NULL,
    "followerId" INTEGER NOT NULL,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("followerId","followingId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadImages" ADD CONSTRAINT "ThreadImages_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
