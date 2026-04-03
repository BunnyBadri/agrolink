import pool from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, password, role } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "All fields required" });
    }

    // ✅ CHECK USER EXISTS
    const existingUser = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json({ error: "User already exists" });
    }

    // ✅ INSERT USER (NO EXTRA COMMAS)
    const result = await pool.query(
      `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role;
      `,
      [name, email, password, role]
    );

    return NextResponse.json({
      message: "User created",
      user: result.rows[0],
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json({ error: error.message });
  }
}