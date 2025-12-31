"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { checkIn } from "@/store/eventSlice";

export default function CheckInPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("Location permission denied")
    );
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmCheckIn = async () => {
    if (!photo || !location) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("lat", location.lat.toString());
    formData.append("lng", location.lng.toString());

    try {
      const res = await fetch("/api/check-in", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert("Check-in failed");
        setLoading(false);
        return;
      }

      dispatch(checkIn());
      router.push("/otp");
    } catch (error) {
      console.error("Check-in error:", error);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-6 pt-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Vendor Check-In</h1>
          <p className="text-gray-600 text-lg">Upload your arrival photo and confirm your location</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Photo Section */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-gray-900 mb-4">
              <span className="mr-2">📸</span>Arrival Photo
            </label>

            <div className="relative mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                id="photo-input"
              />
              <label
                htmlFor="photo-input"
                className="block w-full border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-600 hover:bg-indigo-50 transition"
              >
                <span className="text-4xl mb-2 block">📷</span>
                <p className="font-semibold text-gray-900">Click to upload or drag & drop</p>
                <p className="text-sm text-gray-600 mt-1">PNG, JPG up to 10MB</p>
              </label>
            </div>

            {photoPreview && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Photo Preview</p>
                <img src={photoPreview} alt="Preview" className="w-full h-48 object-cover rounded-xl shadow-md" />
              </div>
            )}
          </div>

          {/* Location Section */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-gray-900 mb-4">
              <span className="mr-2">📍</span>Location
            </label>

            {location ? (
              <div className="bg-green-50 border border-green-300 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Location Captured</p>
                    <p className="text-sm text-gray-900 font-mono mt-1">
                      Latitude: {location.lat.toFixed(6)}
                    </p>
                    <p className="text-sm text-gray-900 font-mono mt-1">
                      Longitude: {location.lng.toFixed(6)}
                    </p>
                  </div>
                  <span className="text-4xl">✓</span>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-300 rounded-xl p-6 text-center">
                <p className="text-amber-900 font-semibold">Detecting location...</p>
              </div>
            )}
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirmCheckIn}
            disabled={!photo || !location || loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl disabled:opacity-50 transition shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                Confirming Check-In...
              </>
            ) : (
              <>
                <span>✓</span>
                Confirm Check-In & Continue
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
