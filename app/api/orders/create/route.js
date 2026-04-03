import { createOrder } from "@/services/orderService";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  const token = cookies().get("token")?.value;
  const user = verifyToken(token);

  if (!user) return Response.json({ error: "Unauthorized" });

  const { cropId } = await req.json();

  await createOrder(cropId, user.id);

  return Response.json({ success: true });
}