import { NextResponse } from "next/server";

export async function postUrl(request) {
  console.log("request", request);
  try {
    const data = await request.json();

    const link = await prisma.acortador.create({
      data,
    });
    return new NextResponse(JSON.stringify(link), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
