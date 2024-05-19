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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PaymentPage = () => {
  const driverData = [
    {
      driverName: "Jane Smith",
      amount: "3000",
      status: "Pending",
      createdAt: "2023-04-13",
      bankDetails: "ICICI 2891",
      driverBankName: "ICICI Bank",
      accountNumber: "19029012891",
      bankIFSC: "ICI090889",
    },
    {
      driverName: "John Doe",
      amount: "2500",
      status: "Approved",
      createdAt: "2023-05-20",
      bankDetails: "HDFC 4312",
      driverBankName: "HDFC Bank",
      accountNumber: "1234567890",
      bankIFSC: "HDFC012345",
    },
    {
      driverName: "Alice Johnson",
      amount: "4000",
      status: "Pending",
      createdAt: "2023-06-05",
      bankDetails: "Axis 5419",
      driverBankName: "Axis Bank",
      accountNumber: "9876543210",
      bankIFSC: "AXIS098765",
    },
    {
      driverName: "Bob Williams",
      amount: "3500",
      status: "reject",
      createdAt: "2023-07-12",
      bankDetails: "SBI 1378",
      driverBankName: "State Bank of India",
      accountNumber: "8765432109",
      bankIFSC: "SBI876543",
    },
    {
      driverName: "Emily Brown",
      amount: "2800",
      status: "Pending",
      createdAt: "2023-08-02",
      bankDetails: "PNB 9256",
      driverBankName: "Punjab National Bank",
      accountNumber: "4567890123",
      bankIFSC: "PNB456789",
    },
    {
      driverName: "Michael Miller",
      amount: "3200",
      status: "Approved",
      createdAt: "2023-09-18",
      bankDetails: "BOB 3456",
      driverBankName: "Bank of Baroda",
      accountNumber: "3210987654",
      bankIFSC: "BOB321098",
    },
    {
      driverName: "Sarah Wilson",
      amount: "2700",
      status: "Pending",
      createdAt: "2023-10-09",
      bankDetails: "UBI 7891",
      driverBankName: "Union Bank of India",
      accountNumber: "6543210987",
      bankIFSC: "UBI654321",
    },
    {
      driverName: "David Taylor",
      amount: "3800",
      status: "Approved",
      createdAt: "2023-11-25",
      bankDetails: "IDBI 1234",
      driverBankName: "IDBI Bank",
      accountNumber: "8901234567",
      bankIFSC: "IDBI890123",
    },
    {
      driverName: "Olivia Martinez",
      amount: "2900",
      status: "Pending",
      createdAt: "2023-12-14",
      bankDetails: "Canara 5678",
      driverBankName: "Canara Bank",
      accountNumber: "2109876543",
      bankIFSC: "CAN210987",
    },
    {
      driverName: "James Anderson",
      amount: "4100",
      status: "reject",
      createdAt: "2024-01-03",
      bankDetails: "Kotak 8945",
      driverBankName: "Kotak Mahindra Bank",
      accountNumber: "7890123456",
      bankIFSC: "KOT789012",
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
  const totalPages = Math.ceil(driverData.length / itemsPerPage);

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
  const filtereddriverData = driverData.filter(
    (paymentData) =>
      (!filters.pending || paymentData.status === "Pending") &&
      (!filters.active || paymentData.status === "Active") &&
      (!filters.reject || paymentData.status === "Reject")
  );

  return (
    <div>
      <h1>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <h1 className="font-bold text-2xl">All Payment Details</h1>
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
                            Customer Name
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Amount
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Status
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Created At
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Bank Details
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filtereddriverData
                          .slice(
                            (currentPage - 1) * itemsPerPage,
                            currentPage * itemsPerPage
                          )
                          .map((paymentData, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium p-2">
                                {index + 1}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {paymentData.driverName}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                $ {paymentData.amount}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                <Badge
                                  style={{ whiteSpace: "nowrap" }}
                                  variant="outline"
                                >
                                  {paymentData.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {paymentData.createdAt}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {paymentData.bankDetails}{" "}
                                <Link href={"#"}>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="ghost">
                                        <Badge>View Bank</Badge>
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                      <DialogHeader>
                                        <DialogTitle className="font-bold">
                                          Bank Details
                                        </DialogTitle>
                                        <DialogDescription>
                                          Here you see the Driver Bank Details
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <div className="flex flex-wrap w-full">
                                            {/* <!-- First Pair --> */}
                                            <div className="flex flex-row gap-2 w-full">
                                              <Label
                                                htmlFor="drivername"
                                                className="whitespace-nowrap mb-2 font-semibold"
                                              >
                                                Driver Name:
                                              </Label>
                                              <Label
                                                htmlFor="drivername"
                                                className="whitespace-nowrap"
                                              >
                                                {paymentData.driverName}
                                              </Label>
                                            </div>
                                            {/* <!-- Second Pair --> */}
                                            <div className="flex flex-row gap-2 w-full">
                                              <Label
                                                htmlFor="dname"
                                                className="whitespace-nowrap mb-2 font-semibold"
                                              >
                                                Driver Name:
                                              </Label>
                                              <Label
                                                htmlFor="dname"
                                                className="whitespace-nowrap"
                                              >
                                                {paymentData.driverBankName}
                                              </Label>
                                            </div>
                                            {/* <!-- Third Pair --> */}
                                            <div className="flex flex-row gap-2 w-full">
                                              <Label
                                                htmlFor="dname"
                                                className="whitespace-nowrap mb-2 font-semibold"
                                              >
                                                Driver Account Number:
                                              </Label>
                                              <Label
                                                htmlFor="dname"
                                                className="whitespace-nowrap"
                                              >
                                                {paymentData.accountNumber}
                                              </Label>
                                            </div>
                                            {/* <!-- fouth Pair --> */}
                                            <div className="flex flex-row gap-2 w-full">
                                              <Label
                                                htmlFor="bankIFSC"
                                                className="whitespace-nowrap mb-2 font-semibold"
                                              >
                                                Driver Account Number:
                                              </Label>
                                              <Label
                                                htmlFor="bankIFSC"
                                                className="whitespace-nowrap"
                                              >
                                                {paymentData.bankIFSC}
                                              </Label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                </Link>
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
                                    <DropdownMenuItem>Accept</DropdownMenuItem>
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
                      {currentPage * itemsPerPage > driverData.length
                        ? driverData.length
                        : currentPage * itemsPerPage}
                    </strong>{" "}
                    of <strong>{driverData.length}</strong> orders
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

export default PaymentPage;
