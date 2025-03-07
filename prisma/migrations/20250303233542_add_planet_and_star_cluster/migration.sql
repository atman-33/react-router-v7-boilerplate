-- CreateTable
CREATE TABLE "Planet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "StarCluster" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PlanetStarCluster" (
    "planetId" TEXT NOT NULL,
    "starClusterId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("planetId", "starClusterId"),
    CONSTRAINT "PlanetStarCluster_planetId_fkey" FOREIGN KEY ("planetId") REFERENCES "Planet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlanetStarCluster_starClusterId_fkey" FOREIGN KEY ("starClusterId") REFERENCES "StarCluster" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
