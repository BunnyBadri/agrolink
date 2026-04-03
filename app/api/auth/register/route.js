import { registerUser } from "@/services/authService";
import { validateRegister } from "@/utils/validate";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    validateRegister(data);

    const user = await registerUser(data);

    return NextResponse.json({ success: true, user });
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
}