/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Movies" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imdb_id" TEXT NOT NULL,
    "tmdb_id" INTEGER,
    "year" INTEGER,
    "duration" INTEGER,
    "rating" DOUBLE PRECISION,
    "poster_path" TEXT,
    "backdrop_path" TEXT,
    "backdrop_path_2" TEXT,
    "description" TEXT,
    "genres" TEXT[],
    "trailer_path" TEXT,
    "certification" TEXT,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movies_imdb_id_key" ON "Movies"("imdb_id");
