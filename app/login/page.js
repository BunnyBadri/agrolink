"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);

      if (data.role === "farmer") {
        window.location.href = "/dashboard/farmer";
      } else {
        window.location.href = "/dashboard/buyer";
      }
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <input className="border p-2 mb-2 w-full" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" className="border p-2 mb-4 w-full" onChange={(e)=>setPassword(e.target.value)} />

        <button onClick={handleLogin} className="bg-black text-white px-4 py-2 w-full">
          Login
        </button>
      </div>
    </div>
  );
}