import { NextResponse } from "next/server";
import cookie from "cookie";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Call another API for authentication
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

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      if (apiResponse.status === 404) {
        return NextResponse.json(
          { error: "User does not exist" },
          { status: 404 }
        );
      } else if (apiResponse.status === 401) {
        return NextResponse.json(
          { error: "Incorrect password" },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: data.msg || "Failed to authenticate" },
        { status: apiResponse.status }
      );
    }

    if (data && data.access_token) {
      const token = data.access_token;
      const adminType = data.data.admin_type;
      const adminTypeText = adminType === 1 ? 'admin' : 'subadmin';

      // Set cookies using the cookie library
      const cookieHeader = cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      const adminTypeCookieHeader = cookie.serialize('admin_type', JSON.stringify(adminType), {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      const res = NextResponse.json({ 
        msg: `Login successful! Welcome, ${adminTypeText}`, 
        status: data.status, 
        admin_type: adminType 
      });
      res.headers.append('Set-Cookie', cookieHeader);
      res.headers.append('Set-Cookie', adminTypeCookieHeader);

      return res;
    }

    return NextResponse.json({ error: "Invalid response from authentication service" }, { status: 500 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
