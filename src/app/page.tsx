import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white">
      <div className="max-w-3xl text-center px-6">
        {/* heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Vendor Event Day Tracker
        </h1>

        {/* sub heading */}
        <p className="text-lg md:text-xl text-indigo-100 mb-8">
          Track vendor check-ins, OTP verification, setup progress, and event
          completion — all in one place.
        </p>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white/10 p-4 rounded-lg">
            Photo & Location Check-In
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            Customer OTP Verification
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            Event Start & Completion
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={"/signin"}
          className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-100 transition"
        >
          Login as Vendor
        </Link>

        {/* Footer Note */}
        <p className="text-sm text-indigo-200 mt-8">
          Built with Next.js, TypeScript & Redux
        </p>
      </div>
    </main>
  );
}