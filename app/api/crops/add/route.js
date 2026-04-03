import { addCrop } from "@/services/cropService";

export async function POST(req) {
  const data = await req.json();

  try {
    await addCrop(data, 1);
    return Response.json({ message: "Crop added" });
  } catch (err) {
    return Response.json({ error: err.message });
  }
}