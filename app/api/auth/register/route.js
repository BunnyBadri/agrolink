import pool from "../../../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    const check = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (check.rows.length > 0) {
      return NextResponse.json({ error: "User exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4)",
      [name, email, hashed, role]
    );

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message });
  }
}