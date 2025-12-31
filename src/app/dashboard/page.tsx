"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Stepper from "@/components/Stepper";
import { RootState } from "@/store/store";

export default function Dashboard() {
  const router = useRouter();
  const { checkedIn, eventStarted, setupDone, completed } = useSelector(
    (state: RootState) => state.event
  );

  // Determine event status
  const getEventStatus = () => {
    if (completed) return "Completed ✓";
    if (setupDone) return "Setup Done";
    if (eventStarted) return "In Progress";
    if (checkedIn) return "Checked In";
    return "Not Started";
  };

  useEffect(() => {
    const isAuth = sessionStorage.getItem("isAuth");
    if (!isAuth) {
      router.push("/signin");
    }
  }, [router]);

  const triggerOTP = async () => {
    try {
      const res = await fetch("/api/otp", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        alert("Failed to trigger OTP");
        return;
      }

      alert("OTP triggered successfully! Check your messages.");
      router.push("/otp");
    } catch (error) {
      console.error("OTP trigger error:", error);
      alert("Error triggering OTP");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mt-16">Vendor Dashboard</h1>
          <p className="text-gray-600">Manage today's event workflow</p>
        </header>

        {/* Progress Stepper */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <Stepper />
        </section>

        {/* Event stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Event Status</h3>
            <p
              className={`text-xl font-semibold ${
                completed ? "text-green-600" : "text-indigo-600"
              }`}
            >
              {getEventStatus()}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Check-In</h3>
            <p className={`text-xl font-semibold ${checkedIn ? "text-green-600" : ""}`}>
              {checkedIn ? "✓ Checked In" : "Pending"}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Completion</h3>
            <p className={`text-xl font-semibold ${completed ? "text-green-600" : ""}`}>
              {completed ? "✓ Completed" : "—"}
            </p>
          </div>
        </section>

        {/* Actions */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Event Actions</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Start Check-In */}
            <Link
              href="/check-in"
              className={`inline-flex justify-center rounded-lg px-6 py-3 font-semibold transition ${
                checkedIn
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {checkedIn ? "✓ Check-In Done" : "Start Check-In"}
            </Link>

            {/* Trigger OTP */}
            <button
              onClick={triggerOTP}
              disabled={!checkedIn || eventStarted}
              className={`inline-flex justify-center rounded-lg px-6 py-3 font-semibold transition ${
                !checkedIn || eventStarted
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {eventStarted ? "✓ OTP Verified" : "Trigger OTP"}
            </button>

            {/* Go to Setup */}
            <Link
              href="/setup"
              className={`inline-flex justify-center rounded-lg px-6 py-3 font-semibold transition ${
                !eventStarted || setupDone
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              {setupDone ? "✓ Setup Done" : "Go to Setup"}
            </Link>

            {/* Complete Event */}
            <Link
              href="/complete"
              className={`inline-flex justify-center rounded-lg px-6 py-3 font-semibold transition ${
                !setupDone || completed
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {completed ? "✓ Completed" : "Complete Event"}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
