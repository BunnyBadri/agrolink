import { loginUser } from "@/services/authService";
import { signToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  try {
    const user = await loginUser(data);

    const token = signToken(user);

    const res = NextResponse.json({
      role: user.role,
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });

    return res;
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
}