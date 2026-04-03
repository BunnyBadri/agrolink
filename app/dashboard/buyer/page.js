"use client";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

export default function Buyer() {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    fetch("/api/crops/list")
      .then((res) => res.json())
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
      <h1 className="text-2xl font-semibold mb-6">Marketplace</h1>

      <div className="grid grid-cols-3 gap-6">
        {crops.map((crop) => (
          <div key={crop.id} className="bg-white p-5 rounded-xl border">
            <h2>{crop.name}</h2>
            <p>{crop.quantity}</p>
            <p>₹ {crop.price}</p>
            <button onClick={() => buy(crop.id)}>
              Buy
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}