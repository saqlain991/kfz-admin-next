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
import { MoreHorizontal, Search, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const WhatSendingPage = () => {
  const [whatSendingData, setWhatSendingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    status: "",
  });
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/get-what-sending");
      console.log("Response data:", response.data); // Log response data
      setWhatSendingData(response.data.data); // Assuming the data is inside the 'data' property
      console.log("Hey There", whatSendingData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(whatSendingData.length / itemsPerPage);

  const handleEditClick = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
    setEditFormData({ id: item.id, name: item.name, status: item.status });
    console.log("jack Here", currentItem);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/what-sending/${editFormData.id}`,
        editFormData
      );
      console.log("Updated data:", response.data);
      setWhatSendingData(
        whatSendingData.map((item) =>
          item.id === editFormData.id ? editFormData : item
        )
      );
      setIsEditing(false);
      setCurrentItem(null);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDeleteClick = (id) => {
    setWhatSendingData(whatSendingData.filter((item) => item.id !== id));
  };

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
                              <label class="inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  value=""
                                  class="sr-only peer"
                                  checked={item.status ? true : false}
                                />
                                <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                              </label>
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
                                  <DropdownMenuItem
                                    onClick={() => handleEditClick(item)}
                                  >
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteClick(item.id)}
                                  >
                                    Delete
                                  </DropdownMenuItem>
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

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md w-1/3">
            <h2 className="text-xl font-bold mb-4 dark:text-black">
              Update the Value
            </h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditChange}
                  className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="active">Active</option>
                  <option value="deActive">Deactive</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatSendingPage;
