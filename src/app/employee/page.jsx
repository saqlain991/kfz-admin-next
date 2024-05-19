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
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const EmployeePage = () => {
  const employeeData = [
    {
      employeeID: "8989",
      employeeName: "John Doe",
      email: "johndoe@gmail.com",
      phone: "+91 90909090",
      document: "Pan Card",
      status: "Admin",
      registerDate: "2023-04-12",
    },
    {
      employeeID: "2902",
      employeeName: "Jane Smith",
      email: "janesmith@example.com",
      phone: "+1 1234567890",
      document: "Aadhar Card",
      status: "Sub-Admin",
      registerDate: "2023-04-13",
    },
    {
      employeeID: "1290",
      employeeName: "Alice Johnson",
      email: "alicejohnson@example.com",
      phone: "+44 1234567890",
      document: "Pan Card",
      status: "Admin",
      registerDate: "2023-04-14",
    },
    {
      employeeID: "1094",
      employeeName: "Bob Brown",
      email: "bobbrown@example.com",
      phone: "+61 1234567890",
      document: "Aadhar Card",
      status: "Sub-Admin",
      registerDate: "2023-04-15",
    },
    {
      employeeID: "2989",
      employeeName: "Emily Wilson",
      email: "emilywilson@example.com",
      phone: "+81 1234567890",
      document: "Aadhar Card",
      status: "Admin",
      registerDate: "2023-04-16",
    },
    {
      employeeID: "7829",
      employeeName: "David Lee",
      email: "davidlee@example.com",
      phone: "+82 1234567890",
      document: "Pan Card",
      status: "Admin",
      registerDate: "2023-04-17",
    },
    {
      employeeID: "9032",
      employeeName: "Maria Garcia",
      email: "mariagarcia@example.com",
      phone: "+34 1234567890",
      document: "Aadhar Card",
      status: "Sub-Admin",
      registerDate: "2023-04-18",
    },
    {
      employeeID: "3892",
      employeeName: "Luca Rossi",
      email: "lucarossi@example.com",
      phone: "+39 1234567890",
      document: "Aadhar Card",
      status: "Admin",
      registerDate: "2023-04-19",
    },
    {
      employeeID: "5093",
      employeeName: "Sophie Martin",
      email: "sophiemartin@example.com",
      phone: "+33 1234567890",
      document: "Pan Card",
      status: "Sub-Admin",
      registerDate: "2023-04-20",
    },
    {
      employeeID: "2393",
      employeeName: "Mohammed Khan",
      email: "mohammedkhan@example.com",
      phone: "+92 1234567890",
      document: "Aadhar Card",
      status: "Admin",
      registerDate: "2023-04-21",
    },
  ];

  // State for current page and items per page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(employeeData.length / itemsPerPage);

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
              <h1 className="font-bold text-2xl">Admins</h1>
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
                      Admin
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
                <Link href={"/employee/add-employee"}>
                  <Button size="sm" variant="outline" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Employee
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
                      <TableHeader className="bg-slate-100 py-4">
                        <TableRow>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Sr.No
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Employee Id
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Employee Name
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Employee Email
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Employee Phone
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Document
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Employee Type
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Created at
                          </TableHead>

                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {employeeData
                          .slice(
                            (currentPage - 1) * itemsPerPage,
                            currentPage * itemsPerPage
                          )
                          .map((eData, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium p-2">
                                {index + 1}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                # {eData.employeeID}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {eData.employeeName}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {eData.email}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {eData.phone}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {eData.document}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                <Badge
                                  style={{ whiteSpace: "nowrap" }}
                                  variant="outline"
                                >
                                  {eData.status}
                                </Badge>
                              </TableCell>

                              <TableCell className="font-medium p-2">
                                {eData.registerDate}
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
                      {currentPage * itemsPerPage > employeeData.length
                        ? employeeData.length
                        : currentPage * itemsPerPage}
                    </strong>{" "}
                    of <strong>{employeeData.length}</strong> orders
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

export default EmployeePage;
