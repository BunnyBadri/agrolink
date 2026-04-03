"use client";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

export default function Buyer() {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }

    fetch("/api/crops/list")
      .then((res) => res.json())
      .then(setCrops);
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Marketplace</h1>

      <div className="grid grid-cols-3 gap-6">
        {crops.map((crop) => (
          <div
            key={crop.id}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition"
          >
            <h2 className="font-medium mb-2">{crop.name}</h2>

            <p className="text-sm text-gray-500">Qty: {crop.quantity}</p>
            <p className="text-sm text-gray-500">₹ {crop.price}</p>
            <p className="text-sm text-gray-500">{crop.location}</p>

            <button className="mt-4 w-full text-sm border border-gray-300 py-2 rounded-lg hover:bg-gray-100">
              Buy
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}