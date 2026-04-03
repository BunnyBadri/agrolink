"use client";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

export default function Buyer() {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    fetch("/api/crops/list")
      .then(res => res.json())
      .then(setCrops);
  }, []);

  const buy = async (id) => {
    await fetch("/api/orders/create", {
      method: "POST",
      body: JSON.stringify({ cropId: id }),
    });
    alert("Order placed");
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">🛒 Marketplace</h1>

      {crops.length === 0 ? (
        <p>No crops available</p>
      ) : (
        <table className="w-full bg-white dark:bg-[#111827] border rounded-xl text-sm">
          <thead className="text-gray-500 text-left">
            <tr>
              <th className="p-3">Crop</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {crops.map(c => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.name}</td>
                <td>{c.quantity}</td>
                <td>₹ {c.price}</td>
                <td>{c.location}</td>
                <td>
                  <button
                    onClick={()=>buy(c.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}