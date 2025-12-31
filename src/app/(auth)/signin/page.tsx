"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      alert("Invalid credentials");
      setLoading(false);
      return;
    }

    sessionStorage.setItem("isAuth", "true");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Icon */}
        <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-xl flex items-center justify-center mb-6 mx-auto shadow-md">
          <span className="text-3xl">👤</span>
        </div>

        {/* heading */}
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-900">Welcome Back</h1>

        {/* sub heading */}
        <p className="text-gray-600 mb-8 text-center text-sm">Sign in to your vendor account to continue</p>

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* username input field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50"
            />
          </div>

          {/* password input field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50"
            />
          </div>

          {/* sign in button */}
          <button
            type="submit"
            disabled={!username || !password || loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 transition shadow-md mt-6"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">New to EventTracker?</span>
          </div>
        </div>

        {/* navigate to signup page */}
        <p className="text-center text-gray-600 text-sm">
          Create an account to get started{" "}
          <Link href="/signup" className="text-indigo-600 font-semibold hover:text-indigo-700 transition">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
