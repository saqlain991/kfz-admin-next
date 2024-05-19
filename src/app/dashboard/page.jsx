import {
  ArrowUpRight,
  Car,
  CreditCardIcon,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";
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

const Dashboard = () => {
  const homeCardIcons = [
    {
      title: "Total Payment",
      icons: <CreditCardIcon />,
      value: "₹ 500",
      url: "/payment",
    },
    {
      title: "Total Customer",
      icons: <Users />,
      value: "500",
      url: "/customer",
    },
    {
      title: "Total Driver",
      icons: <Car />,
      value: "500",
      url: "/driver",
    },
    {
      title: "Total Order",
      icons: <ShoppingCart />,
      value: "500",
      url: "/order",
    },
  ];

  const RecentOrder = [
    {
      orderId: "#7879",
      customerName: "John Doe",
      pickupAddress: "123 Main St, Cityville, State, Zip",
      deliveryAddress: "456 Elm St, Townsville, State, Zip",
      pickupDate: "2024-05-15",
      createdAt: "2023-04-12",
      status: "On the way",
    },
    {
      orderId: "#7880",
      customerName: "Jane Smith",
      pickupAddress: "789 Oak Ave, Villagetown, State, Zip",
      deliveryAddress: "987 Maple Blvd, Hamletville, State, Zip",
      pickupDate: "2024-05-16",
      createdAt: "2023-04-13",
      status: "Pending",
    },
    {
      orderId: "#7881",
      customerName: "Alice Johnson",
      pickupAddress: "321 Pine Rd, Suburbia, State, Zip",
      deliveryAddress: "654 Cedar Ln, Countryside, State, Zip",
      pickupDate: "2024-05-17",
      createdAt: "2023-04-14",
      status: "In Transit",
    },
    {
      orderId: "#7882",
      customerName: "Bob Brown",
      pickupAddress: "987 Birch St, Ruralville, State, Zip",
      deliveryAddress: "654 Spruce Ave, Farmland, State, Zip",
      pickupDate: "2024-05-18",
      createdAt: "2023-04-15",
      status: "Delivered",
    },
    {
      orderId: "#7883",
      customerName: "Emily Wilson",
      pickupAddress: "246 Walnut Blvd, Smalltown, State, Zip",
      deliveryAddress: "135 Sycamore Dr, Hometown, State, Zip",
      pickupDate: "2024-05-19",
      createdAt: "2023-04-16",
      status: "Pending",
    },
    {
      orderId: "#7884",
      customerName: "David Lee",
      pickupAddress: "369 Cherry Ave, Villageland, State, Zip",
      deliveryAddress: "753 Oak St, Countryside, State, Zip",
      pickupDate: "2024-05-20",
      createdAt: "2023-04-17",
      status: "On the way",
    },
    {
      orderId: "#7885",
      customerName: "Sophia Miller",
      pickupAddress: "951 Elm St, Cityville, State, Zip",
      deliveryAddress: "357 Maple Ave, Townsville, State, Zip",
      pickupDate: "2024-05-21",
      createdAt: "2023-04-18",
      status: "In Transit",
    },
    {
      orderId: "#7886",
      customerName: "Michael Johnson",
      pickupAddress: "258 Pine Rd, Suburbia, State, Zip",
      deliveryAddress: "852 Cedar Ln, Countryside, State, Zip",
      pickupDate: "2024-05-22",
      createdAt: "2023-04-19",
      status: "Delivered",
    },
    {
      orderId: "#7887",
      customerName: "Emma Davis",
      pickupAddress: "753 Birch St, Ruralville, State, Zip",
      deliveryAddress: "159 Spruce Ave, Farmland, State, Zip",
      pickupDate: "2024-05-23",
      createdAt: "2023-04-20",
      status: "Pending",
    },
    {
      orderId: "#7888",
      customerName: "Liam Wilson",
      pickupAddress: "369 Walnut Blvd, Smalltown, State, Zip",
      deliveryAddress: "753 Sycamore Dr, Hometown, State, Zip",
      pickupDate: "2024-05-24",
      createdAt: "2023-04-21",
      status: "On the way",
    },
  ];

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
