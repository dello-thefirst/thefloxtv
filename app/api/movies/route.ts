import { getMovieData } from "@/app/functions/tmdb";
import { Movie, PrismaClient } from "@prisma/client";
import { split } from "postcss/lib/list";
const prisma = new PrismaClient();

interface dataFormat {
  data: Movie[];
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const tmdb_id = searchParams?.get("id");
  const movieData = await getMovieData(tmdb_id);
  try {
    const movie = await prisma.movie.create({
      data: {
        title: movieData.title,
        imdb_id: movieData.imdb_id,
        tmdb_id: tmdb_id,
        year: parseInt(movieData.release_date.slice(0, 4)) ?? 2022,
        duration: movieData.runtime,
        rating: movieData.vote_average,
        poster_path: movieData.poster_path,
        backdrop_path: movieData.backdrop_path,
        backdrop_path_2: movieData.images.backdrops[0].file_path,
        overview: movieData.overview,
        genres: movieData.genres.map((genre: { name: string[] }) => genre.name),
        trailer_path: movieData.trailers.youtube[0].source,
        certification: "?",
        media_type: "movie",
      },
    });
    return new Response(JSON.stringify(movie), {
      status: 200,
      statusText: "Movie Added Successfully",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "An error occured" }), {
      status: 400,
      statusText: "An Error Occured",
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await prisma.$disconnect();
  }
}
