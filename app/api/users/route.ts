import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const user = await prisma.user.findMany();
    return new Response(JSON.stringify(user), {
      status: 200,
      statusText: "OK",
      headers: { 
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
      console.error(error);
      process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
