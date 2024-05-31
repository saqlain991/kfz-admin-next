"use client";
import { useState } from "react";
import { CustomPagination } from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const OrderPage = () => {
  const customerData = [
    {
      orderId: "7883",
      customerName: "Emily Wilson",
      customerEmail: "emily@gmail.com",
      customerPhone: "+8989898989",
      pickupAddress: "246 Walnut Blvd, Smalltown, State, Zip",
      deliveryAddress: "135 Sycamore Dr, Hometown, State, Zip",
      pickupDate: "2024-05-19",
      itemWeight: "500gm",
      itemQuantity: "5",
      orderType: "Accessories",
      createdAt: "2023-04-16",
      status: "Delivered",
    },
    {
      orderId: "7884",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      customerPhone: "+1234567890",
      pickupAddress: "123 Main St, Anytown, State, Zip",
      deliveryAddress: "456 Elm St, Othertown, State, Zip",
      pickupDate: "2024-05-20",
      itemWeight: "700gm",
      itemQuantity: "3",
      orderType: "Electronics",
      createdAt: "2023-05-20",
      status: "Pending",
    },
    {
      orderId: "7885",
      customerName: "Alice Smith",
      customerEmail: "alice@example.com",
      customerPhone: "+9876543210",
      pickupAddress: "789 Oak St, Somewhere, State, Zip",
      deliveryAddress: "101 Pine St, Nowhere, State, Zip",
      pickupDate: "2024-05-21",
      itemWeight: "300gm",
      itemQuantity: "2",
      orderType: "Clothing",
      createdAt: "2023-06-25",
      status: "In Transit",
    },
    {
      orderId: "7886",
      customerName: "Michael Brown",
      customerEmail: "michael@example.com",
      customerPhone: "+1212121212",
      pickupAddress: "555 Cedar St, Anytown, State, Zip",
      deliveryAddress: "777 Maple St, Othertown, State, Zip",
      pickupDate: "2024-05-22",
      itemWeight: "200gm",
      itemQuantity: "1",
      orderType: "Books",
      createdAt: "2023-07-10",
      status: "Delivered",
    },
    {
      orderId: "7887",
      customerName: "Emma Johnson",
      customerEmail: "emma@example.com",
      customerPhone: "+9191919191",
      pickupAddress: "999 Elm St, Anothertown, State, Zip",
      deliveryAddress: "333 Oak St, Yetanothertown, State, Zip",
      pickupDate: "2024-05-23",
      itemWeight: "600gm",
      itemQuantity: "4",
      orderType: "Toys",
      createdAt: "2023-08-12",
      status: "Pending",
    },
    {
      orderId: "7888",
      customerName: "David Miller",
      customerEmail: "david@example.com",
      customerPhone: "+8181818181",
      pickupAddress: "444 Pine St, Anothertown, State, Zip",
      deliveryAddress: "222 Cedar St, Yetanothertown, State, Zip",
      pickupDate: "2024-05-24",
      itemWeight: "400gm",
      itemQuantity: "3",
      orderType: "Electronics",
      createdAt: "2023-09-05",
      status: "Delivered",
    },
    {
      orderId: "7889",
      customerName: "Sophia Garcia",
      customerEmail: "sophia@example.com",
      customerPhone: "+3131313131",
      pickupAddress: "777 Maple St, Anothertown, State, Zip",
      deliveryAddress: "111 Oak St, Yetanothertown, State, Zip",
      pickupDate: "2024-05-25",
      itemWeight: "550gm",
      itemQuantity: "2",
      orderType: "Accessories",
      createdAt: "2023-10-18",
      status: "In Transit",
    },
    {
      orderId: "7890",
      customerName: "Olivia Martinez",
      customerEmail: "olivia@example.com",
      customerPhone: "+5151515151",
      pickupAddress: "333 Cedar St, Somewhere, State, Zip",
      deliveryAddress: "999 Elm St, Nowhere, State, Zip",
      pickupDate: "2024-05-26",
      itemWeight: "750gm",
      itemQuantity: "1",
      orderType: "Clothing",
      createdAt: "2023-11-20",
      status: "Pending",
    },
    {
      orderId: "7891",
      customerName: "Liam Brown",
      customerEmail: "liam@example.com",
      customerPhone: "+6161616161",
      pickupAddress: "222 Pine St, Anothertown, State, Zip",
      deliveryAddress: "444 Elm St, Yetanothertown, State, Zip",
      pickupDate: "2024-05-27",
      itemWeight: "350gm",
      itemQuantity: "3",
      orderType: "Books",
      createdAt: "2023-12-15",
      status: "Delivered",
    },
    {
      orderId: "7892",
      customerName: "Charlotte Wilson",
      customerEmail: "charlotte@example.com",
      customerPhone: "+7171717171",
      pickupAddress: "888 Oak St, Anothertown, State, Zip",
      deliveryAddress: "666 Cedar St, Yetanothertown, State, Zip",
      pickupDate: "2024-05-28",
      itemWeight: "250gm",
      itemQuantity: "2",
      orderType: "Toys",
      createdAt: "2024-01-10",
      status: "In Transit",
    },
  ];

  // State for current page and items per page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(customerData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <div className="flex gap-10 w-full">
                <h1 className="font-bold text-2xl">All Order Details</h1>
                <div className="w-full flex-1">
                  <form>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search Order..."
                        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-7 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Link href={"/order/add-order"}>
                  <Button size="sm" variant="outline" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Order
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
            <TabsContent value="all">
              <Card
                className="h-[500px] my-5 mr-5"
                x-chunk="dashboard-06-chunk-0 "
              >
                <CardContent>
                  <ScrollArea className="h-[480px] w-[1090px]  ">
                    <div className="flex w-max space-x-4 p-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead style={{ whiteSpace: "nowrap" }}>
                              Order Id
                            </TableHead>
                            <TableHead style={{ whiteSpace: "nowrap" }}>
                              User Id
                            </TableHead>
                            <TableHead style={{ whiteSpace: "nowrap" }}>
                              Customer Name
                            </TableHead>
                            <TableHead style={{ whiteSpace: "nowrap" }}>
                              Customer Email
                            </TableHead>
                            <TableHead style={{ whiteSpace: "nowrap" }}>
                              Customer Phone
                            </TableHead>
                            <TableHead style={{ whiteSpace: "nowrap" }}>
                              Pickup Address
                            </TableHead>
                            <TableHead style={{ whiteSpace: "nowrap" }}>
                              Deliver Address
                            </TableHead>
                            <TableHead style={{ whiteSpace: "nowrap" }}>
                              Pickup Date
                            </TableHead>
                            <TableHead style={{ whiteSpace: "nowrap" }}>
                              What Sending
                            </TableHead>
                            <TableHead style={{ whiteSpace: "nowrap" }}>
                              Grand Total
                            </TableHead>

                            <TableHead style={{ whiteSpace: "nowrap" }}>
                              Order Type
                            </TableHead>
                            <TableHead style={{ whiteSpace: "nowrap" }}>
                              Created at
                            </TableHead>

                            {/* // Order Status Here
                            <TableHead
                              style={{
                                whiteSpace: "nowrap",
                                textAlign: "center",
                              }}
                            >
                              Status
                            </TableHead> */}
                            <TableHead
                              style={{
                                whiteSpace: "nowrap",
                                textAlign: "center",
                              }}
                            >
                              Action
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {customerData
                            .slice(
                              (currentPage - 1) * itemsPerPage,
                              currentPage * itemsPerPage
                            )
                            .map((cData, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium p-2">
                                  {`# ${cData.orderId}`}
                                </TableCell>
                                <TableCell className="font-medium p-2">
                                  {cData.customerName}
                                </TableCell>
                                <TableCell className="font-medium p-2">
                                  {cData.customerEmail}
                                </TableCell>
                                <TableCell className="font-medium p-2">
                                  {cData.customerPhone}
                                </TableCell>
                                <TableCell className="font-medium p-2">
                                  {cData.pickupAddress}
                                </TableCell>
                                <TableCell className="font-medium p-2">
                                  {cData.deliveryAddress}
                                </TableCell>
                                <TableCell className="font-medium p-2">
                                  {cData.pickupDate}
                                </TableCell>

                                <TableCell className="font-medium p-2">
                                  {cData.orderType}
                                </TableCell>
                                <TableCell className="font-medium p-2">
                                  {cData.createdAt}
                                </TableCell>

                                {/* // Order Status Here
                                <TableCell>
                                  <Badge
                                    style={{ whiteSpace: "nowrap" }}
                                    variant="outline"
                                  >
                                    {cData.status}
                                  </Badge>
                                </TableCell> */}
                                <TableCell>
                                  <div className=" flex flex-row gap-2">
                                    <Button variant="outline">Accept</Button>
                                    <Button variant="outline">Decline</Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </CardContent>
                <CustomPagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing{" "}
                    <strong>
                      {currentPage * itemsPerPage > customerData.length
                        ? customerData.length
                        : currentPage * itemsPerPage}
                    </strong>{" "}
                    of <strong>{customerData.length}</strong> orders
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </h1>
    </div>
  );
};

export default OrderPage;
