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

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    setter(e.target.files?.[0] || null);
  };

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 p-6 pt-24">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Event Setup</h1>
          <p className="text-gray-600 text-lg">Upload setup photos and add notes for completion</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Pre-Setup Section */}
          <div className="mb-10">
            <label className="block text-lg font-bold text-gray-900 mb-4">
              <span className="mr-2">📸</span>Pre-Setup Photo
            </label>
            <p className="text-sm text-gray-600 mb-4">Take a photo before beginning the setup</p>

            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoChange(e, setPreSetupPhoto)}
                className="hidden"
                id="pre-setup-input"
              />
              <label
                htmlFor="pre-setup-input"
                className={`block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
                  preSetupPhoto
                    ? "border-green-300 bg-green-50"
                    : "border-indigo-300 hover:border-indigo-600 hover:bg-indigo-50"
                }`}
              >
                <span className="text-3xl mb-2 block">{preSetupPhoto ? "✓" : "📷"}</span>
                <p className="font-semibold text-gray-900">
                  {preSetupPhoto ? preSetupPhoto.name : "Click to upload photo"}
                </p>
              </label>
            </div>

            {preSetupPhoto && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(preSetupPhoto)}
                  alt="Pre-setup preview"
                  className="w-full h-40 object-cover rounded-xl shadow-md"
                />
              </div>
            )}
          </div>

          {/* Post-Setup Section */}
          <div className="mb-10">
            <label className="block text-lg font-bold text-gray-900 mb-4">
              <span className="mr-2">✓</span>Post-Setup Photo
            </label>
            <p className="text-sm text-gray-600 mb-4">Take a photo after completing the setup</p>

            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoChange(e, setPostSetupPhoto)}
                className="hidden"
                id="post-setup-input"
              />
              <label
                htmlFor="post-setup-input"
                className={`block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
                  postSetupPhoto
                    ? "border-green-300 bg-green-50"
                    : "border-indigo-300 hover:border-indigo-600 hover:bg-indigo-50"
                }`}
              >
                <span className="text-3xl mb-2 block">{postSetupPhoto ? "✓" : "📷"}</span>
                <p className="font-semibold text-gray-900">
                  {postSetupPhoto ? postSetupPhoto.name : "Click to upload photo"}
                </p>
              </label>
            </div>

            {postSetupPhoto && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(postSetupPhoto)}
                  alt="Post-setup preview"
                  className="w-full h-40 object-cover rounded-xl shadow-md"
                />
              </div>
            )}
          </div>

          {/* Notes Section */}
          <div className="mb-10">
            <label htmlFor="notes" className="block text-lg font-bold text-gray-900 mb-4">
              <span className="mr-2">📝</span>Optional Notes
            </label>
            <p className="text-sm text-gray-600 mb-4">Add any remarks or observations about the setup</p>

            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Type your notes here... (optional)"
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none bg-gray-50"
              rows={4}
            />
            <p className="text-xs text-gray-500 mt-2">{notes.length} characters</p>
          </div>

          {/* Photos Preview Grid */}
          {(preSetupPhoto || postSetupPhoto) && (
            <div className="mb-10">
              <p className="text-sm font-semibold text-gray-700 mb-4">📸 Photos Summary</p>
              <div className="grid grid-cols-2 gap-4">
                {preSetupPhoto && (
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-xs font-bold text-gray-600 mb-2">Before Setup</p>
                    <div className="bg-gray-200 rounded-lg h-24 flex items-center justify-center">
                      <span className="text-2xl">✓</span>
                    </div>
                  </div>
                )}
                {postSetupPhoto && (
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-xs font-bold text-gray-600 mb-2">After Setup</p>
                    <div className="bg-gray-200 rounded-lg h-24 flex items-center justify-center">
                      <span className="text-2xl">✓</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!preSetupPhoto || !postSetupPhoto || loading}
            className={`w-full py-4 rounded-xl font-bold text-lg transition shadow-lg flex items-center justify-center gap-2 ${
              !preSetupPhoto || !postSetupPhoto || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:shadow-xl"
            }`}
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                Uploading...
              </>
            ) : (
              <>
                <span>✓</span>
                Confirm Setup & Continue
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
