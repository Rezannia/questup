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
    "freeTransport" BOOLEAN NOT NULL DEFAULT false,
    "learningBudget" BOOLEAN NOT NULL DEFAULT false,
    "petFriendly" BOOLEAN NOT NULL DEFAULT false,
    "gameRoom" BOOLEAN NOT NULL DEFAULT false,
    "partnerFriendly" BOOLEAN NOT NULL DEFAULT false,
    "investsInIdeas" BOOLEAN NOT NULL DEFAULT false,
    "resultOriented" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("description", "id", "industry", "logo", "name", "size", "userId", "website") SELECT "description", "id", "industry", "logo", "name", "size", "userId", "website" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_userId_key" ON "Company"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
