"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

export default function Farmer() {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
    location: "",
  });

  const [crops, setCrops] = useState([]);

  useEffect(() => {
    fetch("/api/crops/list")
      .then(res => res.json())
      .then(setCrops);
  }, []);

  const handleAdd = async () => {
    await fetch("/api/crops/add", {
      method: "POST",
      body: JSON.stringify(form),
    });

    setForm({ name: "", quantity: "", price: "", location: "" });

    const updated = await fetch("/api/crops/list").then(r=>r.json());
    setCrops(updated);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">🌾 Farmer Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-[#111827] p-4 rounded-xl border">
          <p className="text-sm text-gray-500">Total Crops</p>
          <p className="text-xl font-semibold">{crops.length}</p>
        </div>

        <div className="bg-white dark:bg-[#111827] p-4 rounded-xl border">
          <p className="text-sm text-gray-500">Orders</p>
          <p className="text-xl font-semibold">-</p>
        </div>

        <div className="bg-white dark:bg-[#111827] p-4 rounded-xl border">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-xl font-semibold">₹ -</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">

        {/* Form */}
        <div className="bg-white dark:bg-[#111827] p-5 rounded-xl border">
          <h2 className="mb-4 font-medium">Add Crop</h2>

          <div className="space-y-3">
            <input value={form.name} className="input" placeholder="Crop Name"
              onChange={(e)=>setForm({...form,name:e.target.value})}/>
            <input value={form.quantity} className="input" placeholder="Quantity"
              onChange={(e)=>setForm({...form,quantity:e.target.value})}/>
            <input value={form.price} className="input" placeholder="Price"
              onChange={(e)=>setForm({...form,price:e.target.value})}/>
            <input value={form.location} className="input" placeholder="Location"
              onChange={(e)=>setForm({...form,location:e.target.value})}/>
          </div>

          <button
            onClick={handleAdd}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg"
          >
            Add Crop
          </button>
        </div>

        {/* Crop List */}
        <div className="col-span-2 bg-white dark:bg-[#111827] p-5 rounded-xl border">
          <h2 className="mb-4 font-medium">Your Crops</h2>

          {crops.length === 0 ? (
            <p className="text-gray-500">No crops added</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Location</th>
                </tr>
              </thead>

              <tbody>
                {crops.map(c => (
                  <tr key={c.id} className="border-t">
                    <td>{c.name}</td>
                    <td>{c.quantity}</td>
                    <td>₹ {c.price}</td>
                    <td>{c.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </Layout>
  );
}