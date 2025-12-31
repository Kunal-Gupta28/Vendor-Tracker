import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const photo = formData.get("photo") as File | null;
    const lat = formData.get("lat");
    const lng = formData.get("lng");

    // validation
    if (!photo || !lat || !lng) {
      return NextResponse.json(
        { message: "Missing photo or location" },
        { status: 400 }
      );
    }

    // TEMP: log values (later store in DB / cloud)
    console.log("Check-in received:");
    console.log("Photo name:", photo.name);
    console.log("Latitude:", lat);
    console.log("Longitude:", lng);

    return NextResponse.json(
      { message: "Check-in successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
