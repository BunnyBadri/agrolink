"use client";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "farmer",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage("Account created successfully");
      }
    } catch (err) {
      setMessage("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-[#0f172a] transition-colors">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white dark:bg-[#111827] border-r border-gray-200 dark:border-gray-700">
        <div className="max-w-sm px-10">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            AgroLink 🌾
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            A simple platform connecting farmers and buyers.  
            Manage crops, explore marketplace, and grow efficiently.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-sm">

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Create Account
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Get started with AgroLink
          </p>

          {/* FORM */}
          <div className="space-y-4">

            <input
              className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-[#1f2937] text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
              placeholder="Full Name"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-[#1f2937] text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
              placeholder="Email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-[#1f2937] text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
              placeholder="Password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <select
              className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-[#1f2937] text-gray-900 dark:text-white outline-none"
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
            </select>

          </div>

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            className="mt-6 w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          {/* MESSAGE */}
          {message && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 text-center">
              {message}
            </p>
          )}

          {/* FOOTER */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-gray-900 dark:text-white font-medium"
            >
              Login
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}