// app/api/orders/route.js

import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Import cookies utility for server-side cookie handling

export async function POST(request) {
  const jsondata = await request.json();
  const reqCookies = cookies(); // Get cookies from the request
    const token = reqCookies.get("token");

  if (jsondata.route === "get") {
    let data = await get_order(jsondata, token);
    return data;
  } else if (jsondata.route === "delete") {
    let data = await delete_order(jsondata, token);
    return data;
  } else if (jsondata.route === "add") {
    let data = await add_order(jsondata, token);
    return data;
  }
}

async function get_order(request, token) {
  try {
    

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.API_BASE_URL}/orders/get_orders_admin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${token.value}`,
        },
        body: JSON.stringify({ page: 1 }), // Adjust if necessary
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function delete_order(request) {
  try {
    const reqCookies = cookies(); // Get cookies from the request
    const token = reqCookies.get("token");

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.API_BASE_URL}/orders/get_orders_admin/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${token.value}`,
        },
        body: JSON.stringify({ orderId: request.orderId }), // Adjust the payload as necessary
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to delete order" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function add_order(request) {
  try {
    const reqCookies = cookies(); // Get cookies from the request
    const token = reqCookies.get("token");

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.API_BASE_URL}/orders/add_order_admin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${token.value}`,
        },
        body: JSON.stringify(request.orderData), // Adjust the payload as necessary
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to add order" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
