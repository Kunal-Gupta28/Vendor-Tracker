"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const isAuth = sessionStorage.getItem("isAuth");
    if (!isAuth) {
      router.push("/signin");
    }
  }, [router]);
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mt-16">Vendor Dashboard</h1>
          <p className="text-gray-600">Manage today’s event workflow</p>
        </header>

        {/* Event stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Event Status</h3>
            <p className="text-xl font-semibold text-indigo-600">Not Started</p>
          </div>

          {/* Check-In */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Check-In</h3>
            <p className="text-xl font-semibold">Pending</p>
          </div>

          {/* Completion */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Completion</h3>
            <p className="text-xl font-semibold">—</p>
          </div>
        </section>

        {/* Actions */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Event Actions</h2>

          {/* navigate to check in page */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/check-in"
              className="inline-flex justify-center rounded-lg bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700"
            >
              Start Check-In
            </Link>

            <button
              disabled
              className="inline-flex justify-center rounded-lg bg-gray-200 px-6 py-3 text-gray-500 cursor-not-allowed"
            >
              Trigger OTP
            </button>

            <button
              disabled
              className="inline-flex justify-center rounded-lg bg-gray-200 px-6 py-3 text-gray-500 cursor-not-allowed"
            >
              Upload Setup Photos
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
