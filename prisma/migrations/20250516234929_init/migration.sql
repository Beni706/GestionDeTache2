-- CreateTable
CREATE TABLE "Utilisateur" (
    "id_utilisateur" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Categorie" (
    "id_categorie" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "id_utilisateur" INTEGER NOT NULL,
    CONSTRAINT "Categorie_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur" ("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tache" (
    "id_tache" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "date_limite" DATETIME NOT NULL,
    "priorite" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'TODO',
    "id_categorie" INTEGER,
    "id_utilisateur" INTEGER NOT NULL,
    CONSTRAINT "Tache_id_categorie_fkey" FOREIGN KEY ("id_categorie") REFERENCES "Categorie" ("id_categorie") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tache_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur" ("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FicherJoint" (
    "id_ficher" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "id_tache" INTEGER NOT NULL,
    CONSTRAINT "FicherJoint_id_tache_fkey" FOREIGN KEY ("id_tache") REFERENCES "Tache" ("id_tache") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");
