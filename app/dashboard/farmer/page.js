"use client";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

export default function Farmer() {
  const [crops, setCrops] = useState([]);
  const [weather, setWeather] = useState(null);

  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
    location: "",
  });

  useEffect(() => {
    // crops
    fetch("/api/crops/list")
      .then((res) => res.json())
      .then(setCrops);

    // weather
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=16.5&longitude=80.6&current_weather=true"
    )
      .then((res) => res.json())
      .then((data) => setWeather(data.current_weather));
  }, []);

  const handleAdd = async () => {
    await fetch("/api/crops/add", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const updated = await fetch("/api/crops/list").then((r) => r.json());
    setCrops(updated);

    setForm({ name: "", quantity: "", price: "", location: "" });
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">🌾 Farmer Dashboard</h1>

      {/* WEATHER */}
      <div className="mb-6 bg-white dark:bg-[#111827] border rounded-xl p-4">
        <h2 className="text-sm text-gray-500 mb-2">Weather</h2>

        {weather ? (
          <div className="flex gap-6 text-sm">
            <p>🌡 {weather.temperature}°C</p>
            <p>💨 {weather.windspeed} km/h</p>
          </div>
        ) : (
          <p className="text-gray-400">Loading weather...</p>
        )}
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-3 gap-6">

        {/* FORM */}
        <div className="bg-white dark:bg-[#111827] p-5 rounded-xl border">
          <h2 className="mb-4 font-medium">Add Crop</h2>

          <div className="space-y-3">
            <input
              value={form.name}
              className="input"
              placeholder="Crop Name"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
            <input
              value={form.quantity}
              className="input"
              placeholder="Quantity"
              onChange={(e) =>
                setForm({ ...form, quantity: e.target.value })
              }
            />
            <input
              value={form.price}
              className="input"
              placeholder="Price"
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />
            <input
              value={form.location}
              className="input"
              placeholder="Location"
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />
          </div>

          <button
            onClick={handleAdd}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg"
          >
            Add Crop
          </button>
        </div>

        {/* CROPS */}
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
                {crops.map((c) => (
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