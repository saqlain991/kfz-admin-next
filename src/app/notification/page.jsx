"use client";
import React, { useState } from "react";
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
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NotificationPage = () => {
  const notificationData = [
    {
      orderId: "2323",
      type: "create",
      message: "New Order has been created Successfully",
      createdAt: "2023-04-13",
    },
    {
      orderId: "4321",
      type: "update",
      message: "Order status has been updated",
      createdAt: "2023-04-15",
    },
    {
      orderId: "9876",
      type: "delete",
      message: "Order has been deleted",
      createdAt: "2023-04-17",
    },
    {
      orderId: "5678",
      type: "create",
      message: "New Order has been created Successfully",
      createdAt: "2023-04-20",
    },
    {
      orderId: "3456",
      type: "update",
      message: "Order status has been updated",
      createdAt: "2023-04-22",
    },
    {
      orderId: "7890",
      type: "delete",
      message: "Order has been deleted",
      createdAt: "2023-04-25",
    },
    {
      orderId: "1234",
      type: "create",
      message: "New Order has been created Successfully",
      createdAt: "2023-04-28",
    },
    {
      orderId: "6543",
      type: "update",
      message: "Order status has been updated",
      createdAt: "2023-04-30",
    },
    {
      orderId: "8901",
      type: "delete",
      message: "Order has been deleted",
      createdAt: "2023-05-02",
    },
    {
      orderId: "2468",
      type: "create",
      message: "New Order has been created Successfully",
      createdAt: "2023-05-05",
    },
  ];

  // State for current page, items per page, and filters
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [filters, setFilters] = useState({
    pending: false,
    active: false, // Added filter for "Active" status
    reject: false,
  });

  // Calculate total pages
  const totalPages = Math.ceil(notificationData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to toggle filter
  const toggleFilter = (filterKey) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: !prevFilters[filterKey],
    }));
  };

  // Filtering function
  const filterednotificationData = notificationData.filter(
    (nData) =>
      (!filters.pending || nData.status === "Pending") &&
      (!filters.active || nData.status === "Active") &&
      (!filters.reject || nData.status === "Reject")
  );

  return (
    <div>
      <h1>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <h1 className="font-bold text-2xl">All Notification Details</h1>
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
                    <DropdownMenuCheckboxItem
                      onClick={() => toggleFilter("pending")}
                      checked={filters.pending}
                    >
                      Pending
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onClick={() => toggleFilter("active")}
                      checked={filters.active}
                    >
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onClick={() => toggleFilter("reject")}
                      checked={filters.reject}
                    >
                      Reject
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-7 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export payment
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card className="h-[600px]" x-chunk="dashboard-06-chunk-0 ">
                <CardContent>
                  <ScrollArea className="h-[480px] w-full overflow-y-auto">
                    <Table>
                      <TableHeader className="bg-slate-100 py-4">
                        <TableRow>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Sr.No
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Order Id
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Type
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Message
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Created At
                          </TableHead>

                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filterednotificationData
                          .slice(
                            (currentPage - 1) * itemsPerPage,
                            currentPage * itemsPerPage
                          )
                          .map((nData, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium p-2">
                                {index + 1}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                # {nData.orderId}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {nData.type}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {nData.message}
                              </TableCell>

                              <TableCell className="font-medium p-2">
                                {nData.createdAt}
                              </TableCell>

                              <TableCell>
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
                              </TableCell>
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
                      {currentPage * itemsPerPage > notificationData.length
                        ? notificationData.length
                        : currentPage * itemsPerPage}
                    </strong>{" "}
                    of <strong>{notificationData.length}</strong> orders
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
