import { getMovieData } from "@/src/app/functions/tmdb";
import { Movie, PrismaClient } from "@prisma/client";
import { split } from "postcss/lib/list";
const prisma = new PrismaClient();
interface dataFormat {
  data: Movie[];
}

export async function POST(req: Request) {
  const body = await req.json();
  const tmdb_id = body.id;
  const movieData = await getMovieData(tmdb_id);
  try {
    const movie = await prisma.movie.create({
      data: {
        title: movieData.title,
        imdb_id: movieData.imdb_id,
        tmdb_id: tmdb_id,
        year: movieData.release_date
          ? parseInt(movieData.release_date.slice(0, 4))
          : null,
        duration: movieData.runtime,
        rating: movieData.vote_average,
        poster_path: movieData.poster_path,
        backdrop_path: movieData.backdrop_path,
        backdrop_path_2: movieData.images?.backdrops[0]?.file_path
          ? movieData.images.backdrops[0].file_path
          : movieData.backdrop_path,
        overview: movieData.overview,
        genres: movieData.genres
          ? movieData.genres.map((genre: { name: string[] }) => genre.name)
          : [],
        trailer_path: movieData.trailers?.youtube[0]?.source
          ? movieData.trailers.youtube[0].sourcecfc
          : null,
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
    return new Response(JSON.stringify({ error: error }), {
      status: 400,
      statusText: "Api Error",
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await prisma.$disconnect();
  }
}
