import Link from "next/link";

export default function Page() {
  const features = [
    {
      icon: "📸",
      title: "Photo & Location Check-In",
      description: "Capture arrival photo with GPS coordinates"
    },
    {
      icon: "🔐",
      title: "OTP Verification",
      description: "Secure customer verification with one-time passwords"
    },
    {
      icon: "⚙️",
      title: "Event Setup Progress",
      description: "Track setup with before & after photos"
    },
    {
      icon: "✓",
      title: "Real-time Status Tracking",
      description: "Monitor event progress with visual stepper"
    },
    {
      icon: "📊",
      title: "Performance Metrics",
      description: "View detailed event completion data"
    },
    {
      icon: "🎯",
      title: "Completion Confirmation",
      description: "Final verification to close events"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Header */}
      <div className="min-h-screen flex items-center justify-center text-white px-6 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48"></div>
        </div>

        <div className="max-w-4xl text-center relative z-10">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-5xl">📍</span>
            <h2 className="text-4xl font-bold">EventTracker</h2>
          </div>

          {/* heading */}
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Vendor Event<br />Management Made<br /><span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">Simple</span>
          </h1>

          {/* sub heading */}
          <p className="text-xl md:text-2xl text-indigo-100 mb-10 max-w-2xl mx-auto font-light">
            A complete tracking solution for vendor check-ins, OTP verification, setup progress, and event completion — all in one intuitive platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/signin"
              className="bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold hover:bg-yellow-50 transition shadow-lg hover:shadow-xl text-lg"
            >
              Get Started
            </Link>
            <Link
              href="/signup"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition text-lg"
            >
              Create Account
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
            <div>
              <p className="text-3xl font-bold">100%</p>
              <p className="text-indigo-100 text-sm">Reliable</p>
            </div>
            <div>
              <p className="text-3xl font-bold">Real-time</p>
              <p className="text-indigo-100 text-sm">Tracking</p>
            </div>
            <div>
              <p className="text-3xl font-bold">Secure</p>
              <p className="text-indigo-100 text-sm">& Safe</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to manage vendor events efficiently</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-lg transition">
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2">Built with <span className="text-pink-400">♥</span> for vendors</p>
          <p className="text-gray-400 text-sm">Next.js • TypeScript • Redux • Tailwind CSS</p>
        </div>
      </div>
    </main>
  );
}