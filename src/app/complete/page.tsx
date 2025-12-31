'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { completeEvent } from '@/store/eventSlice';

export default function Complete() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState('');

  const complete = () => {
    if (!otp) return;

    dispatch(completeEvent());
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow">

        {/* heading  */}
        <h1 className="text-2xl font-bold mb-2">Complete Event</h1>

        {/* sub heading */}
        <p className="text-gray-600 mb-6">
          Enter final OTP to close the event
        </p>

        {/* otp input field */}
        <input
          type="text"
          placeholder="Final OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-green-500"
        />

        {/* complete button */}
        <button
          onClick={complete}
          disabled={!otp}
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
        >
          Complete Event
        </button>
      </div>
    </main>
  );
}