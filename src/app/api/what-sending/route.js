import { NextResponse } from "next/server";
import axios from "axios";
import Cookies from "js-cookie";

export async function POST(request) {
  const jsondata = await request.json();
  console.log("Request data:", jsondata); // Log request data for debugging

  try {
    if (jsondata.route === "get") {
      return await getWhatSending(request);
    } else if (jsondata.route === "delete") {
      return await deleteWhatSending(jsondata);
    } else if (jsondata.route === "add") {
      return await addWhatSending(jsondata);
    } else if (jsondata.route === "edit") {
      return await editWhatSending(jsondata);
    } else {
      return NextResponse.json({ error: "Invalid route" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error in POST handler:", error); // Log error for debugging
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

async function getWhatSending(request) {
  try {
    // const reqCookies = new Cookies(request);
    // const token = reqCookies.get("token");
    // console.log("Token:", token); // Log token for debugging

    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjAxOTIwMjNhN2JiZDczMjUwNTE2ZjA2OWRmMThiNTAwIiwicmVzZXRfdG9rZW4iOm51bGwsImFkbWluX3R5cGUiOjEsImNyZWF0ZWRfYXQiOiIyMDI0LTA1LTEzVDE4OjQ2OjM3LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNS0xM1QxODo0NjozNy4wMDBaIiwiaWF0IjoxNzE2NjIxNzcxfQ.F78H5PmNFQGGDOljfeINhgDnrCmxcWqibqy7RnqnR9A"; // Provide the token value here
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const config = {
      method: "post",
      url: "https://d33ftxxwr8ksno.cloudfront.net/admins/get_what_sending",
      headers: {
        Authorization: ` ${token}`,
      },
    };

    const response = await axios.request(config);
    console.log("Response data:", response.data); // Log response data for debugging

    if (!response.data) {
      return NextResponse.json({ error: "Failed to fetch data" }, { status: response.status });
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error in getWhatSending:", error); // Log error for debugging
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

async function deleteWhatSending(jsondata) {
  try {
    // const reqCookies = new Cookies(jsondata);
    // const token = reqCookies.get("token");
    // console.log("Token:", token); // Log token for debugging

    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjAxOTIwMjNhN2JiZDczMjUwNTE2ZjA2OWRmMThiNTAwIiwicmVzZXRfdG9rZW4iOm51bGwsImFkbWluX3R5cGUiOjEsImNyZWF0ZWRfYXQiOiIyMDI0LTA1LTEzVDE4OjQ2OjM3LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNS0xM1QxODo0NjozNy4wMDBaIiwiaWF0IjoxNzE2NjIxNzcxfQ.F78H5PmNFQGGDOljfeINhgDnrCmxcWqibqy7RnqnR9A"; // Provide the token value here
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const { id } = jsondata;
    console.log("Delete ID:", id); // Log ID for debugging

    const config = {
      method: "delete",
      url: `https://d33ftxxwr8ksno.cloudfront.net/admins/get_what_sending/${id}`,
      headers: {
        Authorization: ` ${token}`,
      },
    };

    const response = await axios.request(config);
    console.log("Response data:", response.data); // Log response data for debugging

    if (response.status !== 200) {
      return NextResponse.json({ error: "Failed to delete data" }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in deleteWhatSending:", error); // Log error for debugging
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

async function addWhatSending(jsondata) {
  try {
    const reqCookies = new Cookies(jsondata);
    const token = reqCookies.get("token");
    console.log("Token:", token); // Log token for debugging

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    console.log("Add data:", jsondata); // Log request data for debugging

    const config = {
      method: "post",
      url: "https://d33ftxxwr8ksno.cloudfront.net/admins/create_what_sending",
      headers: {
        Authorization: ` ${token}`,
        "Content-Type": "application/json",
      },
      data: jsondata,
    };

    const response = await axios.request(config);
    console.log("Response data:", response.data); // Log response data for debugging

    if (response.status !== 200) {
      return NextResponse.json({ error: "Failed to add data" }, { status: response.status });
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error in addWhatSending:", error); // Log error for debugging
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

async function editWhatSending(jsondata) {
  try {
    const reqCookies = new Cookies(jsondata);
    const token = reqCookies.get("token");
    console.log("Token:", token); // Log token for debugging

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    console.log("Edit data:", jsondata); // Log request data for debugging

    const config = {
      method: "put",
      url: "https://d33ftxxwr8ksno.cloudfront.net/admins/get_what_sending",
      headers: {
        Authorization: ` ${token}`,
        "Content-Type": "application/json",
      },
      data: jsondata,
    };

    const response = await axios.request(config);
    console.log("Response data:", response.data); // Log response data for debugging

    if (response.status !== 200) {
      return NextResponse.json({ error: "Failed to update data" }, { status: response.status });
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error in editWhatSending:", error); // Log error for debugging
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}