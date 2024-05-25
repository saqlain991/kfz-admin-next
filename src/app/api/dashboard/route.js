// app/api/login/route.js

import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Import cookies utility for server-side cookie handling

export async function POST(request) {
  console.log("inRoute");
  try {
    const reqCookies = cookies(); // Get cookies from the request
    const token = reqCookies.get("token");
    // console.log(token, " -------- ");

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // Call another API with the token in the Authorization header
    const apiResponse = await fetch(
      "https://d33ftxxwr8ksno.cloudfront.net/admins/dashboard_totals",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token.value}`, // Include the token in the Authorization header
        },
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
      // Set the new token as a cookie
      const res = NextResponse.json(data);

      return res;
    }

    // Handle the response from the external API
  } catch (error) {
    console.error("Error in API route:", error); // Log the error for debugging
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
