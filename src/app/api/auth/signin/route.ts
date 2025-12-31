import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username === "admin" && password === "1234") {
    return NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { message: "Invalid credentials" },
    { status: 401 }
  );
}
