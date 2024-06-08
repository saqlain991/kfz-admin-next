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
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectItem } from "@/components/ui/select";

const AdminPage = () => {
  const [adminData, setAdminData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    admin_type: 1,
  });
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admins");
        setAdminData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddAdmin = async () => {
    try {
      await axios.post("/api/admins", newAdmin);
      setIsDialogOpen(false);
      setNewAdmin({ name: "", email: "", password: "", admin_type: 1 });
      const response = await axios.get("/api/admins");
      setAdminData(response.data.data);
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      await axios.delete(`/api/admins?id=${id}`);
      setAdminData(adminData.filter(admin => admin.id !== id));
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const totalPages = Math.ceil(adminData.length / itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <Tabs defaultValue="all">
        <div className="flex items-center px-5">
          <div className="flex flex-col w-full">
            <h1 className="font-bold text-2xl pb-3 px-5">Admin</h1>
            <form>
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search Admin..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-7 gap-1" onClick={() => setIsDialogOpen(true)}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Admin
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card className="h-[600px]">
            <CardContent>
              <ScrollArea className="h-[480px] w-full overflow-y-auto">
                <Table>
                  <TableHeader className="py-4">
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
                        .map((aData) => (
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
                              <Button
                                variant="outline"
                                onClick={() => handleDeleteAdmin(aData.id)}
                              >
                                Delete
                              </Button>
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
                of <strong>{adminData.length}</strong> admins
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>Add Admin</DialogTitle>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddAdmin();
            }}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <Input
                  type="text"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <Input
                  type="password"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Choose Type</label>
                <Select
                  value={newAdmin.admin_type}
                  onChange={(e) => setNewAdmin({ ...newAdmin, admin_type: parseInt(e.target.value) })}
                >
                  <SelectItem value={1}>Admin</SelectItem>
                  <SelectItem value={2}>Sub-Admin</SelectItem>
                </Select>
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit">Register</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
