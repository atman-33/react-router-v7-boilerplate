-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "first" TEXT NOT NULL,
    "last" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "twitter" TEXT NOT NULL,
    "notes" TEXT,
    "favorite" BOOLEAN NOT NULL DEFAULT false
);
