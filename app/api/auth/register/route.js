import pool from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "All fields required" });
    }

    // check if user exists
    const check = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (check.rows.length > 0) {
      return NextResponse.json({ error: "User already exists" });
    }

    // insert user
    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, password, role]
    );

    return NextResponse.json({ success: true, user: result.rows[0] });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}