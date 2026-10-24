-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StageTask" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stageId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "xpReward" INTEGER NOT NULL DEFAULT 20,
    "taskType" TEXT NOT NULL DEFAULT 'manual',
    "checkKey" TEXT,
    "actionUrl" TEXT,
    "actionLabel" TEXT,
    CONSTRAINT "StageTask_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_StageTask" ("description", "id", "order", "stageId", "title", "xpReward") SELECT "description", "id", "order", "stageId", "title", "xpReward" FROM "StageTask";
DROP TABLE "StageTask";
ALTER TABLE "new_StageTask" RENAME TO "StageTask";
CREATE UNIQUE INDEX "StageTask_stageId_order_key" ON "StageTask"("stageId", "order");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
