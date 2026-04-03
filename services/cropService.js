import db from "@/lib/db";

export async function addCrop(data, userId) {
  await db.query(
    "INSERT INTO crops (name,quantity,price,location,farmer_id) VALUES (?,?,?,?,?)",
    [data.name, data.quantity, data.price, data.location, userId]
  );
}

export async function getAllCrops() {
  const [rows] = await db.query("SELECT * FROM crops");
  return rows;
}