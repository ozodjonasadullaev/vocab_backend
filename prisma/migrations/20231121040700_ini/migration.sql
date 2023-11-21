/*
  Warnings:

  - You are about to drop the column `percentage` on the `UserWordProgress` table. All the data in the column will be lost.
  - Added the required column `completedWords` to the `UserLessonProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `givenWords` to the `UserLessonProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `right` to the `UserWordProgress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserLessonProgress" ADD COLUMN     "completedWords" INTEGER NOT NULL,
ADD COLUMN     "givenWords" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserWordProgress" DROP COLUMN "percentage",
ADD COLUMN     "right" INTEGER NOT NULL;
