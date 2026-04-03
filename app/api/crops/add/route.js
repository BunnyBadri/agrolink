import { addCrop } from "@/services/cropService";
import { validateCrop } from "@/utils/validate";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const token = cookies().get("token")?.value;
    const user = verifyToken(token);

    if (!user) return Response.json({ error: "Unauthorized" });

    const data = await req.json();

    validateCrop(data);

    const crop = await addCrop(data, user.id);

    return Response.json(crop);
  } catch (err) {
    return Response.json({ error: err.message });
  }
}