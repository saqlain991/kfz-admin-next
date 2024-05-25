"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
import Link from "next/link";
import { Input } from "@/components/ui/input";

const AdminPage = () => {
  const [adminData, setAdminData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin-details");
        setAdminData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Format Date Function Logic
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Calculate total pages
  const totalPages = Math.ceil(adminData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* <h1 className="text-2xl font-bold">Admins</h1> */}
      <Tabs defaultValue="all">
        <div className="flex items-center px-5">
          <div className="flex flex-col w-full">
            <h1 className="font-bold text-2xl pb-3 px-5">Admin</h1>
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
            <Link href={"/dashboard/admins/add-admins"}>
              <Button size="sm" variant="outline" className="h-7 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Admin
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <TabsContent value="all">
          <Card className="h-[600px]">
            <CardContent>
              <ScrollArea className="h-[480px] w-full overflow-y-auto">
                <Table>
                  <TableHeader className="bg-slate-100 py-4">
                    <TableRow>
                      <TableHead style={{ whiteSpace: "nowrap" }}>Id</TableHead>
                      <TableHead style={{ whiteSpace: "nowrap" }}>
                        Name
                      </TableHead>
                      <TableHead style={{ whiteSpace: "nowrap" }}>
                        Email
                      </TableHead>
                      <TableHead style={{ whiteSpace: "nowrap" }}>
                        Admin Type
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
                    {Array.isArray(adminData) && adminData.length > 0 ? (
                      adminData
                        .slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        )
                        .map((aData, index) => (
                          <TableRow key={aData.id}>
                            <TableCell className="font-medium p-2">
                              #{aData.id}
                            </TableCell>
                            <TableCell className="font-medium p-2">
                              {aData.name}
                            </TableCell>
                            <TableCell className="font-medium p-2">
                              {aData.email}
                            </TableCell>
                            <TableCell className="font-medium p-2">
                              {aData.admin_type === 1 ? "Admin" : "Sub-Admin"}
                            </TableCell>
                            <TableCell className="font-medium p-2">
                              {formatDate(aData.created_at)}
                            </TableCell>
                            <TableCell>
                              <Button variant="outline">Delete</Button>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan="6" className="text-center p-4">
                          No admin data available.
                        </TableCell>
                      </TableRow>
                    )}
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
                  {currentPage * itemsPerPage > adminData.length
                    ? adminData.length
                    : currentPage * itemsPerPage}
                </strong>{" "}
                of <strong>{adminData.length}</strong> employees
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
