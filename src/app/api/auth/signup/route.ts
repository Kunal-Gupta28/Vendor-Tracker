import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // validation
    if (!username || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // response
    const response = NextResponse.json(
      { message: "Signup successful" },
      { status: 201 }
    );

    // setting credentials in cookiees
    response.cookies.set("username", username, {
      httpOnly: true,
      path: "/",
    });

    response.cookies.set("password", password, {
      httpOnly: true,
      path: "/",
    });

    response.cookies.set("isAuth", "true", {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
