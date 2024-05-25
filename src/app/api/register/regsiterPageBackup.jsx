// app/api/register/route.js

import { NextResponse } from "next/server";
import cookie from "cookie";

export async function POST(request) {
  try {
    const { fullName, email, password } = await request.json();

    // Call the external API for registration
    const apiResponse = await fetch(
      "https://d33ftxxwr8ksno.cloudfront.net/users/register_user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      }
    );

    if (!apiResponse.ok) {
      return NextResponse.json(
        { error: "Registration failed" },
        { status: apiResponse.status }
      );
    }

    const data = await apiResponse.json();

    if (data && data.token) {
      const token = data.token;

      // Set the token as a cookie
      const res = NextResponse.json({
        message: data.message,
        status: data.status,
      });
      res.headers.set(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: "/",
        })
      );

      return res;
    }

    // Handle successful registration
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
