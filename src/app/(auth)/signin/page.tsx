"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();

  // state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      alert("Invalid credentials");
      return;
    }

    sessionStorage.setItem("isAuth", "true");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        {/* heading  */}
        <h1 className="text-3xl font-bold mb-2">Welcome back</h1>

        {/* sub heading */}
        <p className="text-gray-600 mb-6">Sign in to continue</p>

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* username input field */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />

          {/* password input field */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />

          {/* sign in button */}
          <button
            type="submit"
            disabled={!username || !password}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            Sign In
          </button>
        </form>

        {/* navigate to signup page */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-indigo-600 font-semibold">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
