/*
  Warnings:

  - You are about to drop the column `status` on the `UserCourseProgress` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `UserLessonProgress` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `UserWordProgress` table. All the data in the column will be lost.
  - Added the required column `percentage` to the `UserCourseProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentage` to the `UserLessonProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentage` to the `UserWordProgress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserCourseProgress" DROP COLUMN "status",
ADD COLUMN     "percentage" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserLessonProgress" DROP COLUMN "status",
ADD COLUMN     "percentage" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserWordProgress" DROP COLUMN "status",
ADD COLUMN     "percentage" INTEGER NOT NULL;
