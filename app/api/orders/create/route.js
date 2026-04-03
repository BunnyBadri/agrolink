import { createOrder } from "@/services/orderService";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const token = cookies().get("token")?.value;
    const user = verifyToken(token);

    if (!user) return Response.json({ error: "Unauthorized" });

    const { cropId } = await req.json();

    const order = await createOrder(cropId, user.id);

    return Response.json(order);
  } catch (err) {
    return Response.json({ error: err.message });
  }
}