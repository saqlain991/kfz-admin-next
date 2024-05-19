"use client";
import { useState } from "react";
import { CustomPagination } from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  ChevronLeft,
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";
import React from "react";

const PackageType = () => {
  const packageData = [
    {
      packageTypeID: "78969",
      label: "Document",
      value: "document",
      registerDate: "2023-04-12",
    },
    {
      packageTypeID: "45678",
      label: "Food",
      value: "food",
      registerDate: "2023-05-20",
    },
    {
      packageTypeID: "12345",
      label: "House Shifting",
      value: "house_shifting",
      registerDate: "2023-06-15",
    },
    {
      packageTypeID: "98765",
      label: "Accessories",
      value: "accessories",
      registerDate: "2023-07-03",
    },
    {
      packageTypeID: "54321",
      label: "Office Shifting",
      value: "office_shifting",
      registerDate: "2023-08-10",
    },
    {
      packageTypeID: "67890",
      label: "Electronics",
      value: "electronics",
      registerDate: "2023-09-25",
    },
    {
      packageTypeID: "23456",
      label: "Clothing",
      value: "clothing",
      registerDate: "2023-10-18",
    },
    {
      packageTypeID: "87654",
      label: "Books",
      value: "books",
      registerDate: "2023-11-30",
    },
    {
      packageTypeID: "32109",
      label: "Medical Supplies",
      value: "medical_supplies",
      registerDate: "2023-12-22",
    },
    {
      packageTypeID: "67890",
      label: "Furniture",
      value: "furniture",
      registerDate: "2024-01-14",
    },
  ];

  // State for current page and items per page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(packageData.length / itemsPerPage);

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
              <h1 className="font-bold text-2xl">What Sending List</h1>
              <div className="ml-auto flex items-center gap-2"></div>
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
                            Package Type Id
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Label
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Value
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
                        {packageData
                          .slice(
                            (currentPage - 1) * itemsPerPage,
                            currentPage * itemsPerPage
                          )
                          .map((packageTypeData, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium p-2">
                                {index + 1}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                # {packageTypeData.packageTypeID}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {packageTypeData.label}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {packageTypeData.value}
                              </TableCell>

                              <TableCell className="font-medium p-2">
                                {packageTypeData.registerDate}
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
                      {currentPage * itemsPerPage > packageData.length
                        ? packageData.length
                        : currentPage * itemsPerPage}
                    </strong>{" "}
                    of <strong>{packageData.length}</strong> orders
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

export default PackageType;
