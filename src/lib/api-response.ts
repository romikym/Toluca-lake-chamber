import { NextResponse } from "next/server";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function apiJson(data: unknown, status = 200) {
  return NextResponse.json({ data }, { status, headers: CORS });
}

export function apiError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status, headers: CORS });
}

export function apiOptions() {
  return new NextResponse(null, { status: 204, headers: CORS });
}
