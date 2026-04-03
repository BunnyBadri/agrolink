import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret";

export function signToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role },
    SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}