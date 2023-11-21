/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `UserCourseProgress` table. All the data in the column will be lost.
  - You are about to drop the column `isEnrolled` on the `UserCourseProgress` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `UserLessonProgress` table. All the data in the column will be lost.
  - Added the required column `status` to the `UserCourseProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseProgressId` to the `UserLessonProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `UserLessonProgress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserCourseProgress" DROP COLUMN "isCompleted",
DROP COLUMN "isEnrolled",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserLessonProgress" DROP COLUMN "isCompleted",
ADD COLUMN     "courseProgressId" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserWordProgress" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "lessonProgressId" INTEGER NOT NULL,
    "wordId" INTEGER NOT NULL,
    "lessonId" INTEGER,

    CONSTRAINT "UserWordProgress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserLessonProgress" ADD CONSTRAINT "UserLessonProgress_courseProgressId_fkey" FOREIGN KEY ("courseProgressId") REFERENCES "UserCourseProgress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWordProgress" ADD CONSTRAINT "UserWordProgress_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWordProgress" ADD CONSTRAINT "UserWordProgress_lessonProgressId_fkey" FOREIGN KEY ("lessonProgressId") REFERENCES "UserLessonProgress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWordProgress" ADD CONSTRAINT "UserWordProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWordProgress" ADD CONSTRAINT "UserWordProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;
