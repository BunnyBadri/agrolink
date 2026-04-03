import bcrypt from "bcryptjs";
import pool from "@/lib/db";

export async function registerUser(data) {
  const hashed = await bcrypt.hash(data.password, 10);

  await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4)",
    [data.name, data.email, hashed, data.role]
  );
}

export async function loginUser(data) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [data.email]
  );

  const user = result.rows[0];
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(data.password, user.password);
  if (!match) throw new Error("Invalid credentials");

  return user;
}