import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/lib/db";

export async function registerUser(data) {
  const hashed = await bcrypt.hash(data.password, 10);

  await db.query(
    "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
    [data.name, data.email, hashed, data.role]
  );
}

export async function loginUser(data) {
  const [rows] = await db.query("SELECT * FROM users WHERE email=?", [data.email]);

  const user = rows[0];
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(data.password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    "secret",
    { expiresIn: "7d" }
  );

  return { token, role: user.role };
}