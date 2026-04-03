import { getAllCrops } from "@/services/cropService";

export async function GET() {
  try {
    const crops = await getAllCrops();
    return Response.json(crops);
  } catch (err) {
    return Response.json({ error: err.message });
  }
}