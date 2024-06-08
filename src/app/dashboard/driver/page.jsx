"use client";
import { useState, useEffect } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
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
  Car,
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import React from "react";
import { useRouter } from 'next/navigation';

const DriverPage = () => {
  const [driverData, setDriverData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [newDriver, setNewDriver] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    documentType: '',
    documentFile: null,
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(driverData.length / itemsPerPage);

  const router = useRouter();

  useEffect(() => {
    // Fetch driver data from the API
    fetchDriverData();
  }, []);

  const fetchDriverData = async () => {
    try {
      const response = await axios.get('/api/drivers');
      setDriverData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddDriver = async () => {
    const formData = new FormData();
    formData.append('firstName', newDriver.firstName);
    formData.append('lastName', newDriver.lastName);
    formData.append('email', newDriver.email);
    formData.append('phone', newDriver.phone);
    formData.append('documentType', newDriver.documentType);
    formData.append('documentFile', newDriver.documentFile);

    try {
      await axios.post('/api/drivers', formData);
      fetchDriverData(); // Refresh data after adding new driver
      setShowDialog(false);
    } catch (error) {
      console.error("Error adding driver: ", error);
    }
  };

  const handleAccept = (driver) => {
    alert('Request accepted successfully');
    router.push('/dashboard/driver/accept-request');
  };

  const handleReject = (driver) => {
    alert('Request rejected successfully');
    router.push('/dashboard/driver/reject-request');
  };

  return (
    <div>
      <h1>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <div className="flex gap-10 w-full">
                <h1 className="font-bold text-2xl">All Driver Details</h1>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-7 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Link href={"/dashboard/vehicle"}>
                  <Button size="sm" variant="outline" className="h-7 gap-1">
                    <Car className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      View Vehicle
                    </span>
                  </Button>
                </Link>
                <Dialog open={showDialog} onOpenChange={setShowDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="h-7 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Driver
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Driver</DialogTitle>
                      <DialogDescription>
                        Fill in the details below to add a new driver.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium ">
                          First Name
                        </label>
                        <Input
                          id="firstName"
                          value={newDriver.firstName}
                          onChange={(e) => setNewDriver({ ...newDriver, firstName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium ">
                          Last Name
                        </label>
                        <Input
                          id="lastName"
                          value={newDriver.lastName}
                          onChange={(e) => setNewDriver({ ...newDriver, lastName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium ">
                          Email
                        </label>
                        <Input
                          id="email"
                          value={newDriver.email}
                          onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium ">
                          Phone
                        </label>
                        <Input
                          id="phone"
                          value={newDriver.phone}
                          onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="documentType" className="block text-sm font-medium ">
                          Document Type
                        </label>
                        <Select
                          onValueChange={(value) => setNewDriver({ ...newDriver, documentType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select document type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Aadhar Card">Aadhar Card</SelectItem>
                            <SelectItem value="Pan Card">Pan Card</SelectItem>
                            <SelectItem value="Ration Card">Ration Card</SelectItem>
                            <SelectItem value="Driving Licence">Driving Licence</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label htmlFor="documentFile" className="block text-sm font-medium ">
                          Upload Document
                        </label>
                        <Input
                          id="documentFile"
                          type="file"
                          onChange={(e) => setNewDriver({ ...newDriver, documentFile: e.target.files[0] })}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button onClick={handleAddDriver}>Add Driver</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <TabsContent value="all">
              <Card className="h-[600px]" x-chunk="dashboard-06-chunk-0 ">
                <CardContent>
                  <ScrollArea className="h-[480px] w-full overflow-y-auto">
                    <Table>
                      <TableHeader className=" py-4">
                        <TableRow>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Sr.No
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Driver Name
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Driver Email
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Driver Phone
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Document
                          </TableHead>
                          <TableHead style={{ whiteSpace: "nowrap" }}>
                            Created at
                          </TableHead>
                          <TableHead
                            style={{
                              whiteSpace: "nowrap",
                              textAlign: "center",
                            }}
                          >
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {driverData
                          .slice(
                            (currentPage - 1) * itemsPerPage,
                            currentPage * itemsPerPage
                          )
                          .map((dData, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium p-2">
                                {index + 1}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {`${dData.firstName} ${dData.lastName}`}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {dData.email}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {dData.phone}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {dData.documentType}
                              </TableCell>
                              <TableCell className="font-medium p-2">
                                {new Date(dData.createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <div className=" flex flex-row gap-2">
                                  <Button variant="outline" onClick={() => handleAccept(dData)}>Accept</Button>
                                  <Button variant="outline" onClick={() => handleReject(dData)}>Reject</Button>
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
                      {currentPage * itemsPerPage > driverData.length
                        ? driverData.length
                        : currentPage * itemsPerPage}
                    </strong>{" "}
                    of <strong>{driverData.length}</strong> drivers
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

export default DriverPage;
