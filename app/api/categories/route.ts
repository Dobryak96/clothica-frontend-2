import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = `${process.env.BACKEND_URL}/api/categories${request.nextUrl.search}`;

  try {
    const response = await fetch(url, { cache: "no-store" });
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "Backend is unavailable" },
      { status: 502 },
    );
  }
}
