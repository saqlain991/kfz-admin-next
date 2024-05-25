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

const RestrictedItemPage = () => {
  const restrictedItemData = [
    {
      itemName: "Alcohol",
      value: "Wine",
      createdAt: "2024-05-24",
    },
    {
      itemName: "Firearms",
      value: "Handgun",
      createdAt: "2024-05-24",
    },
    {
      itemName: "Explosives",
      value: "Dynamite",
      createdAt: "2024-05-24",
    },
    {
      itemName: "Narcotics",
      value: "Cocaine",
      createdAt: "2024-05-24",
    },
    {
      itemName: "Toxic Chemicals",
      value: "Arsenic",
      createdAt: "2024-05-24",
    },
    {
      itemName: "Biological Agents",
      value: "Anthrax",
      createdAt: "2024-05-24",
    },
    {
      itemName: "Counterfeit Currency",
      value: "Fake $100 bills",
      createdAt: "2024-05-24",
    },
    {
      itemName: "Stolen Goods",
      value: "Diamond necklace",
      createdAt: "2024-05-24",
    },
    {
      itemName: "Endangered Species",
      value: "Ivory tusks",
      createdAt: "2024-05-24",
    },
    {
      itemName: "Hazardous Waste",
      value: "Radioactive waste",
      createdAt: "2024-05-24",
    },
  ];

  // State for current page and items per page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(restrictedItemData.length / itemsPerPage);

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
                <h1 className="font-bold text-2xl">All Restricted Item </h1>
                <div className="w-full flex-1"></div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Link href={"/dashboard/restricted-item/add-restricted-item"}>
                  <Button size="sm" variant="outline" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Restricted Item
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
                            Item Name
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
                        {restrictedItemData
                          .slice(
                            (currentPage - 1) * itemsPerPage,
                            currentPage * itemsPerPage
                          )
                          .map((restrictedItems, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium p-2">
                                {index + 1}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {restrictedItems.itemName}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {restrictedItems.value}
                              </TableCell>

                              <TableCell className="font-medium p-2">
                                {restrictedItems.createdAt}
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
                      {currentPage * itemsPerPage > restrictedItemData.length
                        ? restrictedItemData.length
                        : currentPage * itemsPerPage}
                    </strong>{" "}
                    of <strong>{restrictedItemData.length}</strong> orders
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

export default RestrictedItemPage;
