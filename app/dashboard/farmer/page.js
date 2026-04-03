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

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }, []);

  const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState("");

const handleAdd = async () => {
  setLoading(true);
  setSuccess("");

  await fetch("/api/crops/add", {
    method: "POST",
    body: JSON.stringify(form),
  });

  setLoading(false);
  setSuccess("Crop added successfully");
};

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Farmer Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">

        {/* Form Card */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Add Crop</h2>

          <div className="grid grid-cols-2 gap-4">
            <input className="input" placeholder="Crop Name"
              onChange={(e)=>setForm({...form,name:e.target.value})}/>
            <input className="input" placeholder="Quantity"
              onChange={(e)=>setForm({...form,quantity:e.target.value})}/>
            <input className="input" placeholder="Price"
              onChange={(e)=>setForm({...form,price:e.target.value})}/>
            <input className="input" placeholder="Location"
              onChange={(e)=>setForm({...form,location:e.target.value})}/>
          </div>

          <button
  onClick={handleAdd}
  className="mt-5 w-full bg-black text-white py-2 rounded-lg text-sm hover:opacity-90"
>
  {loading ? "Adding..." : "Add Crop"}
</button>

{success && (
  <p className="text-green-600 text-sm mt-3">{success}</p>
)}
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm">
            Crops Listed
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm">
            Orders
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm">
            Revenue
          </div>
        </div>

      </div>
    </Layout>
  );
}