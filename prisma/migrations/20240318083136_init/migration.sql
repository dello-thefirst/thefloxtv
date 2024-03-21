/*
  Warnings:

  - You are about to drop the `Movies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT;

-- DropTable
DROP TABLE "Movies";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Movie" (
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
    "overview" TEXT,
    "genres" TEXT[],
    "trailer_path" TEXT,
    "certification" TEXT,
    "media_type" TEXT,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Series" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imdb_id" TEXT NOT NULL,
    "tmdb_id" INTEGER,
    "year" INTEGER,
    "rating" DOUBLE PRECISION,
    "poster_path" TEXT,
    "backdrop_path" TEXT,
    "backdrop_path_2" TEXT,
    "overview" TEXT,
    "genres" TEXT[],
    "trailer_path" TEXT,
    "certification" TEXT,
    "media_type" TEXT,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "media_type" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_imdb_id_key" ON "Movie"("imdb_id");

-- CreateIndex
CREATE UNIQUE INDEX "Series_imdb_id_key" ON "Series"("imdb_id");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
