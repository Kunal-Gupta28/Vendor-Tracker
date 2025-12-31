"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { checkIn } from "@/store/eventSlice";

export default function CheckInPage() {
  // hooks and redux
  const router = useRouter();
  const dispatch = useDispatch();

  // state variables
  const [photo, setPhoto] = useState<File | null>(null);
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // get geo location
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

  // handler confirm check in
  const handleConfirmCheckIn = async () => {
    if (!photo || !location) return;

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
        return;
      }

      dispatch(checkIn());
      router.push("/otp");
    } catch (error) {
      console.error("Check-in error:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 mt-16 rounded-lg shadow">
        {/* heading */}
        <h1 className="text-2xl font-bold mb-2">Vendor Check-In</h1>

        {/* sub heading */}
        <p className="text-gray-600 mb-6">
          Upload arrival photo and confirm location
        </p>

        {/* image input field */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files?.[0] || null)}
          className="mb-4"
        />

        {/* displaying location */}
        {location && (
          <p className="text-sm text-gray-600 mb-4">
            Lat: {location.lat.toFixed(4)} | Lng: {location.lng.toFixed(4)}
          </p>
        )}

        {/* confirm check in button */}
        <button
          onClick={handleConfirmCheckIn}
          disabled={!photo || !location}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          Confirm Check-In
        </button>
      </div>
    </main>
  );
}
