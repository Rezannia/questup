/*
  Warnings:

  - You are about to drop the column `freeTransport` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `gameRoom` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `investsInIdeas` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `partnerFriendly` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `petFriendly` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `resultOriented` on the `Company` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "website" TEXT,
    "industry" TEXT,
    "size" TEXT,
    "description" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "flexibleHours" BOOLEAN NOT NULL DEFAULT false,
    "remoteWork" BOOLEAN NOT NULL DEFAULT false,
    "learningBudget" BOOLEAN NOT NULL DEFAULT false,
    "transparentSalary" BOOLEAN NOT NULL DEFAULT false,
    "jobSecurity" BOOLEAN NOT NULL DEFAULT false,
    "goodManager" BOOLEAN NOT NULL DEFAULT false,
    "realValues" BOOLEAN NOT NULL DEFAULT false,
    "meaningfulWork" BOOLEAN NOT NULL DEFAULT false,
    "clearCareerPath" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("description", "featured", "flexibleHours", "id", "industry", "learningBudget", "logo", "name", "remoteWork", "size", "userId", "verified", "website") SELECT "description", "featured", "flexibleHours", "id", "industry", "learningBudget", "logo", "name", "remoteWork", "size", "userId", "verified", "website" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_userId_key" ON "Company"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
