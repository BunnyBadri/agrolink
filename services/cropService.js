import pool from "@/lib/db";

export async function addCrop(data, userId) {
  await pool.query(
    "INSERT INTO crops (name, quantity, price, location, farmer_id) VALUES ($1,$2,$3,$4,$5)",
    [data.name, data.quantity, data.price, data.location, userId]
  );
}

export async function getAllCrops() {
  const result = await pool.query("SELECT * FROM crops ORDER BY id DESC");
  return result.rows;
}

export async function getFarmerStats(userId) {
  const crops = await pool.query(
    "SELECT COUNT(*) FROM crops WHERE farmer_id=$1",
    [userId]
  );

  const orders = await pool.query(
    "SELECT COUNT(*) FROM orders WHERE farmer_id=$1",
    [userId]
  );

  return {
    crops: Number(crops.rows[0].count),
    orders: Number(orders.rows[0].count),
  };
}