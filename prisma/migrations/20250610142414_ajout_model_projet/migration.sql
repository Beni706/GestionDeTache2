/*
  Warnings:

  - You are about to drop the column `id_utilisateur` on the `Categorie` table. All the data in the column will be lost.
  - Added the required column `id_projet` to the `Categorie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_projet` to the `Tache` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Projet" (
    "id_projet" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "id_utilisateur" INTEGER NOT NULL,
    CONSTRAINT "Projet_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur" ("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Categorie" (
    "id_categorie" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "id_projet" INTEGER NOT NULL,
    CONSTRAINT "Categorie_id_projet_fkey" FOREIGN KEY ("id_projet") REFERENCES "Projet" ("id_projet") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Categorie" ("id_categorie", "nom") SELECT "id_categorie", "nom" FROM "Categorie";
DROP TABLE "Categorie";
ALTER TABLE "new_Categorie" RENAME TO "Categorie";
CREATE TABLE "new_Tache" (
    "id_tache" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "date_limite" DATETIME,
    "priorite" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'TODO',
    "id_categorie" INTEGER,
    "id_utilisateur" INTEGER NOT NULL,
    "id_projet" INTEGER NOT NULL,
    CONSTRAINT "Tache_id_categorie_fkey" FOREIGN KEY ("id_categorie") REFERENCES "Categorie" ("id_categorie") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tache_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur" ("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tache_id_projet_fkey" FOREIGN KEY ("id_projet") REFERENCES "Projet" ("id_projet") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tache" ("date_limite", "description", "id_categorie", "id_tache", "id_utilisateur", "priorite", "status", "titre") SELECT "date_limite", "description", "id_categorie", "id_tache", "id_utilisateur", "priorite", "status", "titre" FROM "Tache";
DROP TABLE "Tache";
ALTER TABLE "new_Tache" RENAME TO "Tache";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
