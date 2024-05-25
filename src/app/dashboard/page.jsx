"use client";
import {
  ArrowUpRight,
  Car,
  CreditCardIcon,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import HomeCard from "@/components/Card";
import BarGraph from "@/components/ui/GraphChart";
import DoughnutChart from "@/components/ui/DoughnutGraph";
import RecentOrderCard from "@/components/recentOrder";
import Cookies from "js-cookie";
import axios from "axios";

const Dashboard = () => {
  const [error, setError] = useState("");
  const [homeCardIcons, setHomeCardIcons] = useState([]);
  // setHomeCardIcons = [
  //   {
  //     title: "Total Payment",
  //     icons: <CreditCardIcon />,
  //     value: "₹ 500",
  //     url: "/payment",
  //   },
  //   {
  //     title: "Total Customer",
  //     icons: <Users />,
  //     value: "500",
  //     url: "/customer",
  //   },
  //   {
  //     title: "Total Driver",
  //     icons: <Car />,
  //     value: "500",
  //     url: "/driver",
  //   },
  //   {
  //     title: "Total Order",
  //     icons: <ShoppingCart />,
  //     value: "500",
  //     url: "/order",
  //   },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("-----Hello-----");
        const response = await axios.post("/api/dashboard");

        if (response.status) {
          // Store the token in cookies or localStorage as needed
          // Redirect to a protected page
          // router.push("/dashboard");
          console.log("-----d", response);
          let dashboardArray = [];

          for (let i = 0; i < response.data.data.length; i++) {
            const element = response.data.data[i];
            let obj = {};
            if (element.title == "Orders") {
              obj = {
                title: element.title,
                icons: <ShoppingCart />,
                value: element.value,
                url: "/dashboard/order",
              };

              dashboardArray.push(obj);
            }

            if (element.title == "Total Revenue") {
              obj = {
                title: element.title,
                icons: <CreditCardIcon />,
                value: element.value,
                url: "/dashboard/order",
              };

              dashboardArray.push(obj);
            }

            if (element.title == "Customers") {
              obj = {
                title: element.title,
                icons: <Users />,
                value: element.value,
                url: "/dashboard/order",
              };

              dashboardArray.push(obj);
            }

            if (element.title == "Active Drivers") {
              obj = {
                title: element.title,
                icons: <Car />,
                value: element.value,
                url: "/dashboard/order",
              };

              dashboardArray.push(obj);
            }
          }
          await setHomeCardIcons(dashboardArray);
          console.log("Heloo______--", homeCardIcons);
        } else {
          setError(response.msg);
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {homeCardIcons.map((data, index) => (
              <Link key={index} href={data.url}>
                <HomeCard
                  title={data.title}
                  icons={data.icons}
                  value={data.value}
                />
              </Link>
            ))}
          </div>

          {/* Recent Order Section */}
          {/* <RecentOrderCard /> */}

          {/* Order Chart and Order Summary Cards */}
          <div
            className="flex flex-wrap  gap-4 pt-5"
            x-chunk="dashboard-01-chunk-5"
          >
            <Card className="flex-grow max-w-[700px] w-full sm:w-[700px] gap-4 pt-5">
              <CardHeader className="font-bold text-2xl">
                Order Summary
                <CardDescription className="font-normal">
                  Here is the Order Summary!!!
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Bar Graph implementation */}
                <BarGraph />
              </CardContent>
            </Card>

            <Card className="flex-grow max-w-[500px] w-full sm:w-[300px] pt-5">
              <CardHeader className="font-bold text-2xl">
                Order Chart
                <CardDescription className="font-normal">
                  Here is the Order Chart
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Bar Graph implementation */}
                <DoughnutChart />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
