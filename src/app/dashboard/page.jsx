"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import HomeCard from "@/components/Card";
import BarGraph from "@/components/ui/GraphChart";
import PieChart from "@/components/PieChart";
import SplineAreaChart from "@/components/SplineAreaChart";
import { Car, CreditCardIcon, ShoppingCart, Users } from "lucide-react";

const Dashboard = () => {
  const [error, setError] = useState("");
  const [homeCardIcons, setHomeCardIcons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/dashboard");
        if (response.status === 200) {
          let dashboardArray = [];
          for (let i = 0; i < response.data.data.length; i++) {
            const element = response.data.data[i];
            let obj = {};
            if (element.title === "Orders") {
              obj = {
                title: element.title,
                icons: <ShoppingCart />,
                value: element.value,
                url: "/dashboard/order",
              };
            } else if (element.title === "Total Revenue") {
              obj = {
                title: element.title,
                icons: <CreditCardIcon />,
                value: element.value,
                url: "/dashboard/payment",
              };
            } else if (element.title === "Customers") {
              obj = {
                title: element.title,
                icons: <Users />,
                value: element.value,
                url: "/dashboard/customer",
              };
            } else if (element.title === "Active Drivers") {
              obj = {
                title: element.title,
                icons: <Car />,
                value: element.value,
                url: "/dashboard/driver",
              };
            }
            dashboardArray.push(obj);
          }
          setHomeCardIcons(dashboardArray);
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
            <Card className="flex-grow max-w-screen w-full sm:w-[700px] gap-4 pt-5">
              <CardHeader className="font-bold text-2xl">
                Spline Area Chart
                <CardDescription className="font-normal">
                  Here is the Order Summary!!!
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Spline Area Chart implementation */}
                <SplineAreaChart />
              </CardContent>
            </Card>

            <Card className="flex-grow max-w-[700px] w-full sm:w-[700px] gap-4 pt-5">
              <CardHeader className="font-bold text-2xl">
                Bar Area Chart
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
                Pie Chart
                <CardDescription className="font-normal">
                  Here is the Order Chart
                </CardDescription>
              </CardHeader>

              <CardContent className="h-96">
                {/* Radial Bar Chart implementation */}
                <PieChart />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
