"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();

  // state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validation
    if (!username || !password || password !== confirmPassword) return;

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert(data.message);
      router.push("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        {/* heading */}
        <h1 className="text-3xl font-bold mb-2">Create account</h1>

        {/* subheading */}
        <p className="text-gray-600 mb-6">Sign up to get started</p>

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* username input field */}
          <input
            type="username"
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

          {/* confirm password input field */}
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />

          {/* create button */}
          <button
            type="submit"
            disabled={!username || !password || password !== confirmPassword}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            Create account
          </button>
        </form>

        {/* navigate to signin page */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/signin" className="text-indigo-600 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
