import { loginUser } from "@/services/authService";

export async function POST(req) {
  const data = await req.json();

  try {
    const res = await loginUser(data);
    return Response.json(res);
  } catch (err) {
    return Response.json({ error: err.message });
  }
}