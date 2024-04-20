import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {
  try {
    const getRecentMovies = await prisma.series.findMany({
      skip: 0,
      take: 11,
      orderBy: {
        id: "desc",
      },
    });

    return new Response(JSON.stringify(getRecentMovies), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "An error Occured" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
