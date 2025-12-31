'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { finishSetup } from '@/store/eventSlice';

export default function Setup() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [preSetupPhoto, setPreSetupPhoto] = useState<File | null>(null);
  const [postSetupPhoto, setPostSetupPhoto] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!preSetupPhoto || !postSetupPhoto) {
      alert('Please upload both pre-setup and post-setup photos');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('preSetupPhoto', preSetupPhoto);
      formData.append('postSetupPhoto', postSetupPhoto);
      formData.append('notes', notes);

      const res = await fetch('/api/setup', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        alert('Setup upload failed');
        setLoading(false);
        return;
      }

      dispatch(finishSetup());
      router.push('/complete');
    } catch (error) {
      console.error('Setup error:', error);
      alert('Error uploading setup details');
      setLoading(false);
    }
  };

  const preSetupFileName = preSetupPhoto ? preSetupPhoto.name : 'No file chosen';
  const postSetupFileName = postSetupPhoto ? postSetupPhoto.name : 'No file chosen';

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white w-full max-w-2xl p-8 rounded-lg shadow">
        
        {/* heading */}
        <h1 className="text-3xl font-bold mb-2">Event Setup</h1>

        {/* sub heading */}
        <p className="text-gray-600 mb-8">
          Upload pre-setup and post-setup photos, and add optional notes
        </p>

        {/* Pre-Setup Photo */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-700">
            Pre-Setup Photo (Before setup begins)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPreSetupPhoto(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          <p className="text-xs text-gray-500 mt-2">{preSetupFileName}</p>
        </div>

        {/* Post-Setup Photo */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-700">
            Post-Setup Photo (After setup completion)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPostSetupPhoto(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          <p className="text-xs text-gray-500 mt-2">{postSetupFileName}</p>
        </div>

        {/* Optional Notes */}
        <div className="mb-8">
          <label htmlFor="notes" className="block text-sm font-semibold mb-3 text-gray-700">
            Optional Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes or remarks about the setup (optional)"
            className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            rows={4}
          />
        </div>

        {/* Photos Preview */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {preSetupPhoto && (
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">Pre-Setup Preview</p>
              <img
                src={URL.createObjectURL(preSetupPhoto)}
                alt="Pre-setup preview"
                className="w-full h-32 object-cover rounded-lg border border-gray-300"
              />
            </div>
          )}
          {postSetupPhoto && (
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">Post-Setup Preview</p>
              <img
                src={URL.createObjectURL(postSetupPhoto)}
                alt="Post-setup preview"
                className="w-full h-32 object-cover rounded-lg border border-gray-300"
              />
            </div>
          )}
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!preSetupPhoto || !postSetupPhoto || loading}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            !preSetupPhoto || !postSetupPhoto || loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {loading ? 'Uploading...' : 'Confirm Setup & Continue'}
        </button>
      </div>
    </main>
  );
}
