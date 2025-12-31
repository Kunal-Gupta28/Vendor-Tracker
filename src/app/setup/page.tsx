'use client';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { finishSetup } from '@/store/eventSlice';

export default function Setup() {
  const dispatch = useDispatch();
  const router = useRouter();

  const finish = () => {
    dispatch(finishSetup());
    router.push('/complete');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow">

        {/* heading */}
        <h1 className="text-2xl font-bold mb-2">Event Setup</h1>

        {/* sub heading */}
        <p className="text-gray-600 mb-6">
          Confirm setup completion
        </p>

        {/* finish button */}
        <button
          onClick={finish}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
        >
          Finish Setup
        </button>
      </div>
    </main>
  );
}
