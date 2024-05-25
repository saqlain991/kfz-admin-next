import { NextResponse } from "next/server";
import axios from "axios";
import cookie from "cookie";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Create form data to match the expected format
    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);

    // Authorization token
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjAxOTIwMjNhN2JiZDczMjUwNTE2ZjA2OWRmMThiNTAwIiwicmVzZXRfdG9rZW4iOm51bGwsImFkbWluX3R5cGUiOjEsImNyZWF0ZWRfYXQiOiIyMDI0LTA1LTEzVDE4OjQ2OjM3LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNS0xM1QxODo0NjozNy4wMDBaIiwiaWF0IjoxNzE2NTgxMTMwfQ.C3qWqWjC4Iz-S5w8d1r-eB9NLaUHsQsYoJmW6VXCpSY";

    // Call the external API for registration
    const apiResponse = await axios.post(
      "https://d33ftxxwr8ksno.cloudfront.net/admins/regiterSubAdmin",
      formData,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = apiResponse.data;

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

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      "Error in registration route:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
