"use client";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import toast from "react-hot-toast";

export default function Buyer() {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");

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

    toast.success("Order placed");
  };

  const filtered = crops.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <h1 className="text-2xl mb-4">🛒 Marketplace</h1>

      {/* Search */}
      <input
        className="input mb-4"
        placeholder="Search crops..."
        onChange={(e)=>setSearch(e.target.value)}
      />

      <table className="w-full bg-white border rounded-xl">
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.quantity}</td>
              <td>{c.price}</td>
              <td>
                <button onClick={()=>buy(c.id)}>Buy</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}