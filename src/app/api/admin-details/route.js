import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjAxOTIwMjNhN2JiZDczMjUwNTE2ZjA2OWRmMThiNTAwIiwicmVzZXRfdG9rZW4iOm51bGwsImFkbWluX3R5cGUiOjEsImNyZWF0ZWRfYXQiOiIyMDI0LTA1LTEzVDE4OjQ2OjM3LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNS0xM1QxODo0NjozNy4wMDBaIiwiaWF0IjoxNzE2NjIxNzcxfQ.F78H5PmNFQGGDOljfeINhgDnrCmxcWqibqy7RnqnR9A"; // Provide the token value here

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const config = {
      method: "post",
      url: "https://d33ftxxwr8ksno.cloudfront.net/admins/get_admins",
      headers: {
        Authorization: `${token}`,
      },
    };

    const response = await axios.request(config);

    if (!response.data) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: response.status }
      );
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
