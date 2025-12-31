"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password || password !== confirmPassword) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      alert(data.message);
      router.push("/signin");
    } catch (error) {
      console.error("Signup failed:", error);
      setLoading(false);
    }
  };

  const passwordMatch = password === confirmPassword && confirmPassword !== "";
  const isFormValid = username && password && confirmPassword && passwordMatch;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Icon */}
        <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center mb-6 mx-auto shadow-md">
          <span className="text-3xl">🚀</span>
        </div>

        {/* heading */}
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-900">Create Account</h1>

        {/* subheading */}
        <p className="text-gray-600 mb-8 text-center text-sm">Join us to start managing your events</p>

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* username input field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50"
            />
          </div>

          {/* password input field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50"
            />
          </div>

          {/* confirm password input field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50"
              />
              {confirmPassword && (
                <span className={`absolute right-3 top-3 text-xl ${passwordMatch ? "✓" : "✗"}`}>
                  {passwordMatch ? "✓" : "✗"}
                </span>
              )}
            </div>
            {confirmPassword && !passwordMatch && (
              <p className="text-red-500 text-xs mt-1 font-medium">Passwords don't match</p>
            )}
          </div>

          {/* create button */}
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 transition shadow-md mt-6"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Already have an account?</span>
          </div>
        </div>

        {/* navigate to signin page */}
        <p className="text-center text-gray-600 text-sm">
          Sign in{" "}
          <Link href="/signin" className="text-indigo-600 font-semibold hover:text-indigo-700 transition">
            here
          </Link>
        </p>
      </div>
    </div>
  );
}
