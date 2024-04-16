/*
  Warnings:

  - You are about to drop the column `contet` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "contet",
ADD COLUMN     "content" TEXT;
