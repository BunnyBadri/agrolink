import { registerUser } from "@/services/authService";

export async function POST(req) {
  const data = await req.json();

  try {
    await registerUser(data);
    return Response.json({ message: "Registered successfully" });
  } catch (err) {
    return Response.json({ error: err.message });
  }
}