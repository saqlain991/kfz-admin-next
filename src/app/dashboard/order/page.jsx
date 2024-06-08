"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { CustomPagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
// import { useToast } from "@/components/ui/toast";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const OrderPage = () => {
  const [orderData, setOrderData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog
  const itemsPerPage = 10;

  const handleOrderSubmit = (formData) => {
    // Add your form submission logic here
    console.log("Order data submitted:", formData);
    // showToast("Order submitted successfully!");
    setIsDialogOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post("/api/orders", { route: "get" });
      setOrderData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(orderData.length / itemsPerPage);

  // const { toast } = useToast();

  // const showToast = (message) => {
  //   toast({
  //     description: message,
  //   });
  // };

  return (
    <div>
      <h1>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <div className="flex gap-10 w-full">
                <h1 className="font-bold text-2xl">All Order Details</h1>
                <div className="w-full flex-1">
                  <form>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search Order..."
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
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {/* Add dropdown items */}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-7 gap-1">
                  Export
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1"
                  onClick={() => setIsDialogOpen(true)} // Open the dialog
                >
                  Add Order
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card className="h-[500px] my-5 mr-5">
                <CardContent>
                  <ScrollArea className="h-[480px] w-[1090px]">
                    <div className="flex w-full p-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Order Id
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              User Id
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Customer Name
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Customer Email
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Customer Phone
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Pickup Address
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Deliver Address
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Status
                            </TableCell>
                            <TableCell
                              className="pl-5"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              Pickup Date
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              What Sending
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Grand Total
                            </TableCell>
                            <TableCell
                              className="text-center"
                              style={{
                                whiteSpace: "nowrap",
                              }}
                            >
                              Action
                            </TableCell>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orderData
                            .slice(
                              (currentPage - 1) * itemsPerPage,
                              currentPage * itemsPerPage
                            )
                            .map((order) => (
                              <TableRow key={order.id}>
                                <TableCell>{`#${order.id}`}</TableCell>
                                <TableCell>{order.user_id}</TableCell>
                                <TableCell>{`${order.firstname} ${order.lastname}`}</TableCell>
                                <TableCell>{order.email}</TableCell>
                                <TableCell>{order.mobile_no}</TableCell>
                                <TableCell>{order.pickup_address}</TableCell>
                                <TableCell>{order.del_address}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>
                                  {formatDate(order.pickup_time)}
                                </TableCell>
                                <TableCell>{order.what_sending}</TableCell>
                                <TableCell>{`₹ ${order.grand_total}`}</TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button variant="outline">Accept</Button>
                                    <Button variant="outline">Decline</Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                    <ScrollBar orientation="horizontal" />
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
                      {currentPage * itemsPerPage > orderData.length
                        ? orderData.length
                        : currentPage * itemsPerPage}
                    </strong>{" "}
                    of <strong>{orderData.length}</strong> orders
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </h1>

      {/* Dialog Component */}
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Order</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new order.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                handleOrderSubmit(data);
              }}
            >
              <div className="space-y-4">
                <Input name="firstname" placeholder="First Name" required />
                <Input name="lastname" placeholder="Last Name" required />
                <Input name="email" type="email" placeholder="Email" required />
                <Input name="phone" type="tel" placeholder="Phone" required />
                <Input
                  name="pickupAddress"
                  placeholder="Pickup Address"
                  required
                />
                <Input
                  name="deliverAddress"
                  placeholder="Deliver Address"
                  required
                />
                <Select name="whatSending" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select what you are sending" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="houseShifting">House Shifting</SelectItem>
                    <SelectItem value="officeShifting">Office Shifting</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="documents">Documents</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
               <div className="flex pt-5 ">
               <Button type="submit">Add Order</Button>
               </div>
                
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default OrderPage;
