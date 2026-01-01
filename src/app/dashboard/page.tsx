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
    if (completed) return { status: "Completed ✓", color: "text-green-600", bgColor: "bg-green-50" };
    if (setupDone) return { status: "Setup Done", color: "text-blue-600", bgColor: "bg-blue-50" };
    if (eventStarted) return { status: "In Progress", color: "text-purple-600", bgColor: "bg-purple-50" };
    if (checkedIn) return { status: "Checked In", color: "text-indigo-600", bgColor: "bg-indigo-50" };
    return { status: "Not Started", color: "text-gray-600", bgColor: "bg-gray-50" };
  };

  useEffect(() => {
    const isAuth = sessionStorage.getItem("isAuth");
    if (!isAuth) {
      router.push("/signin");
    }
  }, [router]);

  const eventStatus = getEventStatus();

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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto mt-16">
        {/* Header */}
        <header className="mb-10 pt-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Vendor Dashboard</h1>
          <p className="text-gray-600 text-lg">Manage your event workflow seamlessly</p>
        </header>

        {/* Progress Stepper */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-8">Event Progress</h2>
          <Stepper />
        </section>

        {/* Event Status Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Status Card */}
          <div className={`${eventStatus.bgColor} rounded-2xl shadow-lg p-8 border border-gray-200 transition hover:shadow-xl`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-600">Event Status</h3>
              <span className="text-2xl">📊</span>
            </div>
            <p className={`text-2xl font-bold ${eventStatus.color}`}>{eventStatus.status}</p>
          </div>

          {/* Check-In Card */}
          <div className={`${checkedIn ? "bg-green-50" : "bg-gray-50"} rounded-2xl shadow-lg p-8 border border-gray-200 transition hover:shadow-xl`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-600">Check-In</h3>
              <span className="text-2xl">{checkedIn ? "✅" : "📍"}</span>
            </div>
            <p className={`text-2xl font-bold ${checkedIn ? "text-green-600" : "text-gray-600"}`}>
              {checkedIn ? "Completed" : "Pending"}
            </p>
          </div>

          {/* Completion Card */}
          <div className={`${completed ? "bg-green-50" : "bg-gray-50"} rounded-2xl shadow-lg p-8 border border-gray-200 transition hover:shadow-xl`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-600">Completion</h3>
              <span className="text-2xl">{completed ? "🎉" : "⏳"}</span>
            </div>
            <p className={`text-2xl font-bold ${completed ? "text-green-600" : "text-gray-600"}`}>
              {completed ? "Completed" : "Pending"}
            </p>
          </div>
        </section>

        {/* Actions */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Event Actions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Start Check-In */}
            {checkedIn ? (
              <div className="rounded-xl px-6 py-4 font-semibold transition shadow-md flex items-center justify-center gap-2 bg-gray-200 text-gray-500 cursor-not-allowed">
                📍 Check-In Done
              </div>
            ) : (
              <Link
                href="/check-in"
                className="rounded-xl px-6 py-4 font-semibold transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:shadow-lg"
              >
                📍 Start Check-In
              </Link>
            )}

            {/* Trigger OTP */}
            <button
              onClick={triggerOTP}
              disabled={!checkedIn || eventStarted}
              className={`rounded-xl px-6 py-4 font-semibold transition shadow-md flex items-center justify-center gap-2 ${
                !checkedIn || eventStarted
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg"
              }`}
            >
              🔐 {eventStarted ? "OTP Verified" : "Trigger OTP"}
            </button>

            {/* Go to Setup */}
            {!eventStarted || setupDone ? (
              <div className="rounded-xl px-6 py-4 font-semibold transition shadow-md flex items-center justify-center gap-2 bg-gray-200 text-gray-500 cursor-not-allowed">
                ⚙️ {setupDone ? "Setup Done" : "Go to Setup"}
              </div>
            ) : (
              <Link
                href="/setup"
                className="rounded-xl px-6 py-4 font-semibold transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white"
              >
                ⚙️ Go to Setup
              </Link>
            )}

            {/* Complete Event */}
            {!setupDone || completed ? (
              <div className="rounded-xl px-6 py-4 font-semibold transition shadow-md flex items-center justify-center gap-2 bg-gray-200 text-gray-500 cursor-not-allowed">
                ✨ {completed ? "Completed" : "Complete Event"}
              </div>
            ) : (
              <Link
                href="/complete"
                className="rounded-xl px-6 py-4 font-semibold transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white"
              >
                ✨ Complete Event
              </Link>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
