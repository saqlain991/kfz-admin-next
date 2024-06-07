// app/api/orders/route.js

import { NextResponse } from "next/server";
import axios from "axios";
import Cookies from "js-cookie";

export async function POST(request) {
  let jsondata= await request.json();
  if (jsondata.route == "get") {
    let data = await get_order(jsondata);
    return data;
  }else if(jsondata.route == "delete"){
    let data = await delete_order(jsondata);
    return data;
  }else if(jsondata.route == "delete"){
    let data = await add_order(jsondata);
    return data;
  }
}

async function get_order(request){
  try {

    const reqCookies = Cookies(); // Get cookies from the request
    const token = reqCookies.get("token");
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjAxOTIwMjNhN2JiZDczMjUwNTE2ZjA2OWRmMThiNTAwIiwicmVzZXRfdG9rZW4iOm51bGwsImFkbWluX3R5cGUiOjEsImNyZWF0ZWRfYXQiOiIyMDI0LTA1LTEzVDE4OjQ2OjM3LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNS0xM1QxODo0NjozNy4wMDBaIiwiaWF0IjoxNzE2OTYxODc3fQ.1DzTl8I-kFUZ0fBqKPv3Hcyz-lUjIK6cHreC9e0Qirs"; // Replace with your actual token

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const config = {
      method: "post",
      url: `${process.env.API_BASE_URL}/orders/get_orders_admin`,
      headers: {
        Authorization: ` ${token}`,
      },
      data: {
        page: 1, // Adjust if necessary
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
