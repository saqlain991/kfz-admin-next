// app/dashboard/what-sending/page.jsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CustomPagination } from "@/components/pagination";

const WhatSendingPage = () => {
  const [whatSendingData, setWhatSendingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    status: "active",
  });

  const itemsPerPage = 10;

  const fetchData = async () => {
    try {
      const response = await axios.post("/api/get-what-sending", { route: "get" });
      setWhatSendingData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(whatSendingData.length / itemsPerPage);

  const handleDeleteClick = async (id) => {
    try {
      await axios.post("/api/get-what-sending", { route: "delete", id: id });
      setWhatSendingData(whatSendingData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, status: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/what-sending", { ...formData, route: "add" });
      if (response.status === 200) {
        setWhatSendingData([...whatSendingData, response.data]);
        alert("What Sending item added successfully!");
        handleModalClose();
      } else {
        alert("Failed to add What Sending item");
      }
    } catch (error) {
      console.error("Error adding What Sending item:", error);
      alert("An error occurred while adding the item");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex items-center">
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
            <Button size="sm" variant="outline" className="h-7 gap-1" onClick={handleAddClick}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add What Sending
              </span>
            </Button>
          </div>
        </div>
        <Card>
          <CardContent>
            <ScrollArea className="h-[480px] w-full overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created at</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {whatSendingData
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.status ? "Active" : "Deactive"}</TableCell>
                        <TableCell>{formatDate(item.created_at)}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleDeleteClick(item.id)}>Delete</Button>
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
            <div>
              Showing {Math.min(currentPage * itemsPerPage, whatSendingData.length)} of{" "}
              {whatSendingData.length} entries
            </div>
          </CardFooter>
        </Card>
        <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add What Sending</DialogTitle>
              <DialogDescription>Here you can add a new What Sending item</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 pt-5">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={handleSelectChange}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="deactive">Deactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add What Sending</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default WhatSendingPage;
