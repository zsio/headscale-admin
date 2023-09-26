import { NextRequest, NextResponse } from "next/server";
import { PathValidator } from "./path-validator"

export const HS_URL = process.env.HEADSCALE_SERVER!;
export const HS_KEY = process.env.HEADSCALE_APIKEY!;

const pathValidator = new PathValidator([
  {
    method: ["GET"],
    url: "/api/v1/machine",
    query: ['user']
  },
  {
    method: ["GET"],
    url: "/api/v1/user",
  },
])

function prettyObject(msg: any) {
  const obj = msg;
  if (typeof msg !== "string") {
    msg = JSON.stringify(msg, null, "  ");
  }
  if (msg === "{}") {
    return obj.toString();
  }
  if (msg.startsWith("```json")) {
    return msg;
  }
  return ["```json", msg, "```"].join("\n");
}


export async function requestHs(req: NextRequest) {
  const controller = new AbortController();
  
  const hsPath = `${req.nextUrl.pathname}${req.nextUrl.search}`.replaceAll(
    "/api/headscale",
    "/api"
  );

  let baseUrl = HS_URL;
  
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1);
  }

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 10 * 60 * 1000);

  const fetchUrl = `${baseUrl}${hsPath}`;
  
  
  const fetchOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      Authorization: `Bearer ${HS_KEY}`,
    },
    method: req.method,
    body: req.body,
    redirect: "manual",
    // @ts-ignore
    duplex: "half",
    signal: controller.signal,
  };
  
  try {
    const res = await fetch(fetchUrl, fetchOptions);
    const newHeaders = new Headers(res.headers);
    
    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: newHeaders,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function handle(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  console.log("[HS Route] params ", params);
  if (req.method === "OPTIONS") {
    return NextResponse.json({ body: "OK" }, { status: 200 });
  }

  const hsPath = `${req.nextUrl}`.replaceAll(
    "/api/headscale",
    "/api"
  );

  
  const isAllowed = pathValidator.isPathAllowed(req.method, hsPath)
  
  
  
  if (!isAllowed) {
    return NextResponse.json({}, {
      status: 403,
    });
  }

  try {
    return await requestHs(req);
  } catch (e) {
    
    console.error("[HS] ", e);
    return NextResponse.json(prettyObject(e),{status: 500});
  }
}

export const GET = handle;
export const POST = handle;
export const OPTIONS = handle;
export const DELETE = handle;
