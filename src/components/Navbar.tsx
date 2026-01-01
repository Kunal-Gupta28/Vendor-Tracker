"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const pathname = usePathname();

  // Check auth status on load and when route changes or auth changes
  useEffect(() => {
    const checkAuth = () => {
      const auth = sessionStorage.getItem("isAuth") === "true";
      setIsLoggedIn(auth);
    };

    // initial check
    checkAuth();

    // update on cross-tab storage changes
    const onStorage = (e: StorageEvent) => {
      if (e.key === "isAuth") checkAuth();
    };

    // custom event for same-window updates
    const onAuthChange = () => checkAuth();

    window.addEventListener("storage", onStorage);
    window.addEventListener("authChange", onAuthChange);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("authChange", onAuthChange);
    };
  }, [pathname]);

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem("isAuth");
    setIsLoggedIn(false);
    try {
      window.dispatchEvent(new Event("authChange"));
    } catch {}
    router.push("/signin");
  };

  return (
    <header className="w-full fixed top-0 z-50 border-b bg-gradient-to-r from-white to-gray-50 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter hover:opacity-80 transition">
          <span className="text-indigo-600">📍</span>
          <span>Event<span className="text-indigo-600">Tracker</span></span>
        </Link>

        {/* Auth actions */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <span className="text-sm text-gray-600 font-medium">Vendor</span>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 shadow-sm transition hover:shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/signin"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 shadow-sm transition hover:shadow-md"
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
