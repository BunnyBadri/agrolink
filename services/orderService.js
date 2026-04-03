import pool from "@/lib/db";

export async function createOrder(cropId, buyerId) {
  const crop = await pool.query(
    "SELECT * FROM crops WHERE id=$1",
    [cropId]
  );

  const c = crop.rows[0];

  const result = await pool.query(
    "INSERT INTO orders (crop_id,buyer_id,farmer_id,price) VALUES ($1,$2,$3,$4) RETURNING *",
    [cropId, buyerId, c.farmer_id, c.price]
  );

  return result.rows[0];
}