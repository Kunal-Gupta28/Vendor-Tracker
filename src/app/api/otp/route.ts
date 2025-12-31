import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { otp } = await req.json();
console.log(otp)
    if (!otp) {
      return NextResponse.json(
        { message: "OTP is required" },
        { status: 400 }
      );
    }

    if (otp !== "123456") {
      return NextResponse.json(
        { message: "Invalid OTP" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "OTP verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
