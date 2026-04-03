import pool from "@/lib/db";

export async function placeOrder(data, userId) {
  await pool.query(
    "INSERT INTO orders (crop_id,buyer_id,quantity,status) VALUES (?,?,?,?)",
    [data.cropId, userId, data.quantity, "pending"]
  );
}