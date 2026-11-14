import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

const proxy = async (request: NextRequest, { params }: RouteContext) => {
  try {
    const { path } = await params;
    const url = `${process.env.BACKEND_URL}/api/${path.join("/")}${request.nextUrl.search}`;

    const headers = new Headers();
    const contentType = request.headers.get("content-type");
    const cookie = request.headers.get("cookie");
    if (contentType) headers.set("content-type", contentType);
    if (cookie) headers.set("cookie", cookie);

    const response = await fetch(url, {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method)
        ? undefined
        : await request.text(),
      cache: "no-store",
    });

    const data = await response.text();
    let parsedData;
    try {
      parsedData = JSON.parse(data);
    } catch {
      parsedData = data;
    }

    return NextResponse.json(parsedData, { status: response.status });
  } catch {
    return NextResponse.json({ message: "Proxy error" }, { status: 502 });
  }
};

export {
  proxy as GET,
  proxy as POST,
  proxy as PUT,
  proxy as DELETE,
  proxy as PATCH,
};
