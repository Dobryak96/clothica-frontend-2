import { NextResponse } from "next/server";

export async function GET() {
  const backendUrl = `${process.env.BACKEND_URL}/api/categories?page=1&perPage=6`;

  try {
    const backendResponse = await fetch(backendUrl, {
      method: "GET",
      cache: "no-store",
    });
    const data = await backendResponse.json();

    return NextResponse.json(data, {
      status: backendResponse.status,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
