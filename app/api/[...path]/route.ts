import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

const proxy = async (request: NextRequest, { params }: RouteContext) => {
  const { path } = await params;
  const url = `${process.env.BACKEND_URL}/api/${path.join('/')}${request.nextUrl.search}`;

  const headers = new Headers();
  const contentType = request.headers.get('content-type');
  const cookie = request.headers.get('cookie');
  if (contentType) headers.set('content-type', contentType);
  if (cookie) headers.set('cookie', cookie);

  const hasBody = request.method !== 'GET' && request.method !== 'HEAD';

  try {
    const backendResponse = await fetch(url, {
      method: request.method,
      headers,
      body: hasBody ? await request.arrayBuffer() : undefined,
      cache: 'no-store',
    });

    const body = backendResponse.status === 204 ? null : await backendResponse.arrayBuffer();
    const response = new NextResponse(body, { status: backendResponse.status });

    const responseType = backendResponse.headers.get('content-type');
    if (responseType) response.headers.set('content-type', responseType);
    for (const setCookie of backendResponse.headers.getSetCookie()) {
      response.headers.append('set-cookie', setCookie);
    }

    return response;
  } catch {
    return NextResponse.json({ message: 'Backend is unavailable' }, { status: 502 });
  }
};

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE };
