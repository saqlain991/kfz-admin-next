"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomPagination } from "@/components/pagination";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { MoreHorizontal, PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const WhatSendingPage = () => {
  const [whatSendingData, setWhatSendingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/get-what-sending");
      console.log("Response data:", response.data); // Log response data
      setWhatSendingData(response.data.data); // Assuming the data is inside the 'data' property
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(whatSendingData.length / itemsPerPage);

  // Function to format date as ddmmyyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultStatus="all">
          <div className="flex items-center ">
            <div className="flex flex-col w-full">
              <h1 className="font-bold text-2xl pb-3">What Sending List</h1>
              <form>
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search Customer..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Link href={"/dashboard/what-sending/add-what-sending"}>
                <Button size="sm" variant="outline" className="h-7 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add What Sending
                  </span>
                </Button>
              </Link>
            </div>
          </div>
          <TabsContent status="all">
            <Card className="h-[600px]" x-chunk="dashboard-06-chunk-0 ">
              <CardContent>
                <ScrollArea className="h-[480px] w-full overflow-y-auto">
                  <Table>
                    <TableHeader className=" py-4">
                      <TableRow>
                        <TableHead style={{ whiteSpace: "nowrap" }}>
                          Id
                        </TableHead>
                        <TableHead style={{ whiteSpace: "nowrap" }}>
                          Name
                        </TableHead>
                        <TableHead style={{ whiteSpace: "nowrap" }}>
                          Status
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
                      {whatSendingData
                        .slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        )
                        .map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium p-2">
                              #{item.id}
                            </TableCell>
                            <TableCell className="font-medium p-2">
                              {item.name}
                            </TableCell>
                            <TableCell className="font-medium p-2">
                              {item.status}
                            </TableCell>

                            <TableCell className="font-medium p-2">
                              {formatDate(item.created_at)}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button
                                    aria-haspopup="true"
                                    className="text-blue-500"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
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
                    {currentPage * itemsPerPage > whatSendingData.length
                      ? whatSendingData.length
                      : currentPage * itemsPerPage}
                  </strong>{" "}
                  of <strong>{whatSendingData.length}</strong> orders
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default WhatSendingPage;
