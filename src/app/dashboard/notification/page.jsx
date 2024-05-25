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
import { ScrollArea } from "@/components/ui/scroll-area";
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

const NotificationPage = () => {
  const customerData = [
    {
      notificationID: "N201",
      message: "Get 20% off on your next purchase!",
      value: "20%",
      createdAt: "2024-05-24",
    },
    {
      notificationID: "N202",
      message: "Exclusive offer: Buy 1 Get 1 Free on selected items!",
      value: "BOGO",
      createdAt: "2024-05-24",
    },
    {
      notificationID: "N203",
      message: "Free shipping on orders over $50!",
      value: "Free Shipping",
      createdAt: "2024-05-24",
    },
    {
      notificationID: "N204",
      message: "Flash Sale: Up to 50% off!",
      value: "50%",
      createdAt: "2024-05-24",
    },
    {
      notificationID: "N205",
      message: "Save $10 on your next order!",
      value: "$10",
      createdAt: "2024-05-24",
    },
    {
      notificationID: "N206",
      message: "New Arrivals: 15% off on all new items!",
      value: "15%",
      createdAt: "2024-05-24",
    },
    {
      notificationID: "N207",
      message: "Special Offer: 30% off sitewide!",
      value: "30%",
      createdAt: "2024-05-24",
    },
    {
      notificationID: "N208",
      message: "Holiday Sale: Extra 10% off with code HOLIDAY10!",
      value: "10%",
      createdAt: "2024-05-24",
    },
    {
      notificationID: "N209",
      message: "Limited Time Offer: Free gift with every purchase!",
      value: "Free Gift",
      createdAt: "2024-05-24",
    },
    {
      notificationID: "N210",
      message: "Seasonal Sale: Save up to 40% on selected items!",
      value: "40%",
      createdAt: "2024-05-24",
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
                <h1 className="font-bold text-2xl">All Notification </h1>
                <div className="w-full flex-1"></div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Link href={"/dashboard/notification/add-notification"}>
                  <Button size="sm" variant="outline" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Notification
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
            <TabsContent value="all">
              <Card className="h-[600px]" x-chunk="dashboard-06-chunk-0 ">
                <CardContent>
                  <ScrollArea className="h-[480px] w-full overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Sr.No
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Notification Id
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Message
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Value
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Created at
                          </TableHead>

                          {/* <TableHead style={{ whiteSpace: "nowrap" }}>
                            Action
                          </TableHead> */}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customerData
                          .slice(
                            (currentPage - 1) * itemsPerPage,
                            currentPage * itemsPerPage
                          )
                          .map((notificationData, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium p-2">
                                {index + 1}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {notificationData.notificationID}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {notificationData.message}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {notificationData.value}
                              </TableCell>

                              <TableCell className="font-medium p-2">
                                {notificationData.createdAt}
                              </TableCell>

                              {/* <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      aria-haspopup="true"
                                      size="icon"
                                      variant="ghost"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">
                                        Toggle menu
                                      </span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                      Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell> */}
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
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

export default NotificationPage;
