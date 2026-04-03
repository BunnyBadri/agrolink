"use client";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"farmer" });

  const handleRegister = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(JSON.stringify(data));
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Register</h1>

        <input className="border p-2 mb-2 w-full" onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input className="border p-2 mb-2 w-full" onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input type="password" className="border p-2 mb-2 w-full" onChange={(e)=>setForm({...form,password:e.target.value})}/>

        <select className="border p-2 mb-4 w-full" onChange={(e)=>setForm({...form,role:e.target.value})}>
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
        </select>

        <button onClick={handleRegister} className="bg-black text-white px-4 py-2 w-full">
          Register
        </button>
      </div>
    </div>
  );
}