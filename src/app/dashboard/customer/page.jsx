"use client";
import { useState, useEffect } from "react";
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
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";

const CustomerPage = () => {
  const [customerData, setCustomerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [blockAlertOpen, setBlockAlertOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get("/api/customers");
      setCustomerData(response.data);
    } catch (error) {
      setAlertMessage("Failed to fetch customer data.");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setEditDialogOpen(true);
  };

  const handleBlockClick = (customer) => {
    setSelectedCustomer(customer);
    setBlockAlertOpen(true);
  };

  const handleConfirmBlock = async () => {
    try {
      await axios.post(`/api/customers/${selectedCustomer.id}/block`);
      fetchCustomerData(); // Refresh data after block
      setAlertMessage(`Customer ${selectedCustomer.customerName} blocked successfully.`);
      setBlockAlertOpen(false);
    } catch (error) {
      setAlertMessage(`Failed to block customer ${selectedCustomer.customerName}.`);
    }
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`/api/customers/${selectedCustomer.id}`, selectedCustomer);
      fetchCustomerData(); // Refresh data after edit
      setAlertMessage(`Customer ${selectedCustomer.customerName} updated successfully.`);
      setEditDialogOpen(false);
    } catch (error) {
      setAlertMessage(`Failed to update customer ${selectedCustomer.customerName}.`);
    }
  };

  const handleAddCustomer = async () => {
    try {
      await axios.post("/api/customers", newCustomer);
      fetchCustomerData(); // Refresh data after add
      setAlertMessage(`Customer ${newCustomer.firstName} ${newCustomer.lastName} added successfully.`);
      setNewCustomer({ firstName: "", lastName: "", email: "", phone: "" }); // Reset form
    } catch (error) {
      setAlertMessage("Failed to add customer.");
    }
  };

  const totalPages = Math.ceil(customerData.length / itemsPerPage);

  return (
    <div>
      <h1>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <div className="flex gap-10 w-full">
                <h1 className="font-bold text-2xl">All Customer Details</h1>
                <div className="w-full flex-1">
                  <form>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search Customer..."
                        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                      />
                    </div>
                  </form>
                </div>
              </div>
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
                      Active
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="h-7 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Customer
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className="text-2xl">Add Customer</DialogHeader>
                    <DialogDescription>Here you can add Customer</DialogDescription>
                    <Separator></Separator>
                    <div >
                      <div className="py-2">
                        <label htmlFor="first-name"> First Name</label>
                        <Input
                          placeholder="Jack "
                          value={newCustomer.firstName}
                          onChange={(e) => setNewCustomer({ ...newCustomer, firstName: e.target.value })}
                        />
                      </div>
                      <div className="py-2">
                        <label htmlFor="last-name"> Last Name</label>
                        <Input
                          placeholder="Warner"
                          value={newCustomer.lastName}
                          onChange={(e) => setNewCustomer({ ...newCustomer, lastName: e.target.value })}
                        />
                      </div>
                      <div className="py-2">
                        <label htmlFor="email"> Email</label>
                        <Input
                          placeholder="example@email.com"
                          value={newCustomer.email}
                          onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                        />
                      </div>
                      <div className="py-2">
                        <label htmlFor="phone"> Phone</label>
                        <Input
                          placeholder="+919090909090"
                          value={newCustomer.phone}
                          onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddCustomer}>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <TabsContent value="all">
              <Card className="h-[600px]" x-chunk="dashboard-06-chunk-0">
                <CardContent>
                  <ScrollArea className="h-[480px] w-full overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Sr.No
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Customer Name
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Customer Email
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Customer Phone
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
                        {customerData
                          .slice(
                            (currentPage - 1) * itemsPerPage,
                            currentPage * itemsPerPage
                          )
                          .map((cData, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium p-2">
                                {index + 1}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {cData.customerName}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {cData.email}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {cData.phone}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {cData.createdAt}
                              </TableCell>
                              <TableCell>
                                <div className=" flex flex-row gap-2">
                                  <Button variant="outline" onClick={() => handleEditClick(cData)}>Edit</Button>
                                  <Button variant="outline" onClick={() => handleBlockClick(cData)}>
                                    {cData.status === "blocked" ? "Unblock" : "Block"}
                                  </Button>
                                </div>
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
                      {currentPage * itemsPerPage > customerData.length
                        ? customerData.length
                        : currentPage * itemsPerPage}
                    </strong>{" "}
                    of <strong>{customerData.length}</strong> customers
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </h1>
      
      {/* Edit Customer Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>Edit Customer</DialogHeader>
          {selectedCustomer && (
            <div>
              <Input
                placeholder="First Name"
                value={selectedCustomer.firstName}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    firstName: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Last Name"
                value={selectedCustomer.lastName}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    lastName: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Email"
                value={selectedCustomer.email}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    email: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Phone"
                value={selectedCustomer.phone}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    phone: e.target.value,
                  })
                }
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Block Alert Dialog */}
      <AlertDialog open={blockAlertOpen} onOpenChange={setBlockAlertOpen}>
        <AlertDialogTrigger asChild></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>Confirm Block</AlertDialogHeader>
          <div>Are you sure you want to block this customer?</div>
          <AlertDialogFooter>
            <Button onClick={() => setBlockAlertOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmBlock}>Confirm</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alert Message */}
      {alertMessage && (
        <div
          className={`alert ${alertMessage.includes("Failed") ? "alert-error" : "alert-success"}`}
          role="alert"
        >
          {alertMessage}
          <Button onClick={() => setAlertMessage(null)}>Close</Button>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;
