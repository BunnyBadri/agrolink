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

    if (data.role === "farmer") {
      window.location.href = "/dashboard/farmer";
    } else if (data.role === "buyer") {
      window.location.href = "/dashboard/buyer";
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#f3f7f3] dark:bg-[#0f172a]">

      <div className="bg-white dark:bg-[#111827] p-8 rounded-xl border w-80">
        <h1 className="text-xl font-semibold mb-4">🌾 Login</h1>

        <input className="input mb-2" placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" className="input mb-4" placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}/>

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Login
        </button>
      </div>

    </div>
  );
}