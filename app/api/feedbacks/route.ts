import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/feedbacks${request.nextUrl.search}`, {
      cache: 'no-store',
    });
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ message: 'Не вдалося завантажити відгуки.' }, { status: 502 });
  }
}
