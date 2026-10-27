/*
  Warnings:

  - You are about to drop the column `title` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "title",
ALTER COLUMN "authorId" SET DEFAULT 3,
ALTER COLUMN "postId" SET DEFAULT 1;
