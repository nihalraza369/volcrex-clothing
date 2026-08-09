import { NextRequest, NextResponse } from "next/server";
import {
  verifyPassword,
  createSessionToken,
  SESSION_COOKIE,
} from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (typeof password !== "string" || !password) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    if (!verifyPassword(password)) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }

    const { token, maxAge } = await createSessionToken();
    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
