-- AlterTable
ALTER TABLE "User" ADD COLUMN "preferredLocation" TEXT;
ALTER TABLE "User" ADD COLUMN "preferredWorkMode" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL DEFAULT 'تهران',
    "type" TEXT NOT NULL DEFAULT 'full-time',
    "level" TEXT NOT NULL DEFAULT 'mid',
    "salary" TEXT,
    "skills" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "workMode" TEXT NOT NULL DEFAULT 'onsite',
    "isStable" BOOLEAN NOT NULL DEFAULT false,
    "companySize" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("active", "companyId", "createdAt", "description", "id", "level", "location", "salary", "skills", "title", "type", "updatedAt") SELECT "active", "companyId", "createdAt", "description", "id", "level", "location", "salary", "skills", "title", "type", "updatedAt" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
