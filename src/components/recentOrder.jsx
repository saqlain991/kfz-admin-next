import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import Link from "next/link";

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

const RecentOrderCard = () => {
  // This is for Dialog popup
  const handleButtonClick = () => {
    console.log("Button clicked");
    // Add your submission logic here
  };

  return (
    <div className="w-full">
      <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Recent Order</CardTitle>
            <CardDescription>Recent Order from your app.</CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/order">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[480px] w-full overflow-y-auto md:overflow-x-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead style={{ whiteSpace: "nowrap" }}>Sr No</TableHead>
                  <TableHead style={{ whiteSpace: "nowrap" }}>
                    Order Id
                  </TableHead>
                  <TableHead style={{ whiteSpace: "nowrap" }}>
                    Customer Name
                  </TableHead>
                  <TableHead style={{ whiteSpace: "nowrap" }}>
                    Pickup Address
                  </TableHead>
                  <TableHead style={{ whiteSpace: "nowrap" }}>
                    Delivery Address
                  </TableHead>
                  <TableHead style={{ whiteSpace: "nowrap" }}>
                    Pickup Date
                  </TableHead>
                  <TableHead style={{ whiteSpace: "nowrap" }}>Status</TableHead>
                  <TableHead style={{ whiteSpace: "nowrap" }}>
                    CreatedAt
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RecentOrder.map((recentOrderData, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{index + 1}</div>
                      </TableCell>
                      <TableCell className="text-justify">
                        {recentOrderData.orderId}
                      </TableCell>
                      <TableCell className="text-justify">
                        {recentOrderData.customerName}
                      </TableCell>
                      <TableCell className="text-justify">
                        {recentOrderData.pickupAddress}
                      </TableCell>
                      <TableCell className="text-justify">
                        {recentOrderData.deliveryAddress}
                      </TableCell>
                      <TableCell className="text-justify">
                        {recentOrderData.pickupDate}
                      </TableCell>
                      <TableCell className="text-justify">
                        <Badge
                          style={{ whiteSpace: "nowrap" }}
                          variant="outline"
                        >
                          {recentOrderData.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-justify">
                        {recentOrderData.createdAt}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentOrderCard;
