import { NextResponse } from "next/server";
import axios from "axios";

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();

  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjAxOTIwMjNhN2JiZDczMjUwNTE2ZjA2OWRmMThiNTAwIiwicmVzZXRfdG9rZW4iOm51bGwsImFkbWluX3R5cGUiOjEsImNyZWF0ZWRfYXQiOiIyMDI0LTA1LTEzVDE4OjQ2OjM3LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNS0xM1QxODo0NjozNy4wMDBaIiwiaWF0IjoxNzE2NjIxNzcxfQ.F78H5PmNFQGGDOljfeINhgDnrCmxcWqibqy7RnqnR9A"; // Provide the token value here

    const config = {
      method: "put",
      url: `https://d33ftxxwr8ksno.cloudfront.net/admins/update_what_sending/${id}`,
      headers: {
        Authorization: ` ${token}`,
      },
      data: data,
    };

    const response = await axios.request(config);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
