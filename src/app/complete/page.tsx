'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { completeEvent } from '@/store/eventSlice';

export default function Complete() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const complete = async () => {
    if (!otp) return;

    setLoading(true);
    try {
      // Optional: Verify final OTP with backend
      dispatch(completeEvent());
      router.push('/dashboard');
    } catch (error) {
      console.error('Completion error:', error);
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && otp) {
      complete();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-6 pt-24">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mb-6 mx-auto shadow-md">
          <span className="text-5xl">🎉</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Complete</h1>

        {/* Subheading */}
        <p className="text-gray-600 mb-8">
          Enter the final OTP to close the event and confirm completion
        </p>

        {/* OTP Input */}
        <div className="mb-6 text-left">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Final OTP</label>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            onKeyPress={handleKeyPress}
            maxLength={6}
            className="w-full border-2 border-gray-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-2xl font-bold text-center tracking-widest bg-gray-50"
          />
          <p className="text-xs text-gray-500 mt-2">Enter the 6-digit code to complete</p>
        </div>

        {/* Demo Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-xs text-blue-900">
          <p className="font-semibold mb-1">Demo Mode:</p>
          <p>Use OTP: <span className="font-mono font-bold">123456</span></p>
        </div>

        {/* Complete Button */}
        <button
          onClick={complete}
          disabled={!otp || otp.length !== 6 || loading}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl disabled:opacity-50 transition shadow-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin">⏳</span>
              Completing...
            </>
          ) : (
            <>
              <span>✨</span>
              Complete Event
            </>
          )}
        </button>

        {/* Info */}
        <p className="text-center text-gray-600 text-xs mt-6">
          ✓ Once completed, the event will be marked as finished in your dashboard
        </p>
      </div>
    </main>
  );
}
