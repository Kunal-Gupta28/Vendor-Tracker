"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth status on load
  useEffect(() => {
    const auth = sessionStorage.getItem("isAuth") === "true";
    setIsLoggedIn(auth);
  }, []);

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem("isAuth");
    setIsLoggedIn(false);
    router.push("/signin");
  };

  return (
    <header className="w-full fixed top-0 z-50 border-b bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          Event<span className="text-indigo-600">Tracker</span>
        </Link>

        {/* Auth actions */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/signin"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
