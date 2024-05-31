// app/api/orders/route.js

import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const config = {
      method: "get",
      url: "https://d33ftxxwr8ksno.cloudfront.net/vehicles/get_all_vehicle_admin",
      headers: {},
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
