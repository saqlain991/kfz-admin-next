// app/api/login/route.js

import { NextResponse } from "next/server";
import cookie from "cookie";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Call another API
    const apiResponse = await fetch(
      "https://d33ftxxwr8ksno.cloudfront.net/admins/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!apiResponse.ok) {
      return NextResponse.json(
        { error: "Failed to authenticate" },
        { status: apiResponse.status }
      );
    }

    const data = await apiResponse.json();

    if (data) {
      const token = data.access_token;

      // Set the token as a cookie
      const res = NextResponse.json({ msg: data.msg, status: data.status });
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
    // Handle the response from the external API
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
