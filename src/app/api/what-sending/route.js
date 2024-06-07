import { NextResponse } from "next/server";
import axios from "axios";
import Cookies from "js-cookie";

export async function POST(request) {
  let jsondata = await request.json();
  if (jsondata.route === "get") {
    return getWhatSending(jsondata);
  } else if (jsondata.route === "delete") {
    return deleteWhatSending(jsondata);
  } else if (jsondata.route === "add") {
    return addWhatSending(jsondata);
  } else if (jsondata.route === "edit") {
    return editWhatSending(jsondata);
  }
}

async function getWhatSending(request) {
  try {
    const reqCookies = Cookies.get(); // Get cookies from the request
    const token = reqCookies.token;
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const config = {
      method: "post",
      url: "https://d33ftxxwr8ksno.cloudfront.net/admins/get_what_sending",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.request(config);

    if (!response.data) {
      return NextResponse.json({ error: "Failed to fetch data" }, { status: response.status });
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

async function deleteWhatSending(request) {
  try {
    console.log("in delete", request.id);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error in delete:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

async function addWhatSending(request) {
  try {
    const reqCookies = Cookies.get(); // Get cookies from the request
    const token = reqCookies.token;
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const config = {
      method: "post",
      url: "https://d33ftxxwr8ksno.cloudfront.net/admins/create_what_sending",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: request.body,
    };
    const response = await axios.request(config);

    if (!response.data) {
      return NextResponse.json({ error: "Failed to add data" }, { status: response.status });
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error in add API route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

async function editWhatSending(request) {
  try {
    const reqCookies = Cookies.get(); // Get cookies from the request
    const token = reqCookies.token;
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const config = {
      method: "post",
      url: "https://d33ftxxwr8ksno.cloudfront.net/admins/edit_what_sending",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: request.body,
    };
    const response = await axios.request(config);

    if (!response.data) {
      return NextResponse.json({ error: "Failed to edit data" }, { status: response.status });
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error in edit API route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
