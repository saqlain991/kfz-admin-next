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
import Link from "next/link";
import { Input } from "@/components/ui/input";

const PackersPage = () => {
  const [packersData, setPackersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const PackersData = [
    {
      order_id: "8921",
      name: "Jack",
      email: "jack@gmail.com",
      phone: "+91 90 09 90 09",
      pickup_address: "21 ST Lorem Ipsum Road",
      deliver_address: "21 ST Lorem Ipsum Road",
      pickup_time: "12:30",
      grand_total: "7990",
    },
    {
      order_id: "8922",
      name: "Alice",
      email: "alice@gmail.com",
      phone: "+91 80 08 80 08",
      pickup_address: "22 ST Lorem Ipsum Road",
      deliver_address: "22 ST Lorem Ipsum Road",
      pickup_time: "13:00",
      grand_total: "8990",
    },
    {
      order_id: "8923",
      name: "Bob",
      email: "bob@gmail.com",
      phone: "+91 70 07 70 07",
      pickup_address: "23 ST Lorem Ipsum Road",
      deliver_address: "23 ST Lorem Ipsum Road",
      pickup_time: "13:30",
      grand_total: "9990",
    },
    {
      order_id: "8924",
      name: "Emily",
      email: "emily@gmail.com",
      phone: "+91 60 06 60 06",
      pickup_address: "24 ST Lorem Ipsum Road",
      deliver_address: "24 ST Lorem Ipsum Road",
      pickup_time: "14:00",
      grand_total: "10990",
    },
    {
      order_id: "8925",
      name: "Tom",
      email: "tom@gmail.com",
      phone: "+91 50 05 50 05",
      pickup_address: "25 ST Lorem Ipsum Road",
      deliver_address: "25 ST Lorem Ipsum Road",
      pickup_time: "14:30",
      grand_total: "11990",
    },
    {
      order_id: "8926",
      name: "Linda",
      email: "linda@gmail.com",
      phone: "+91 40 04 40 04",
      pickup_address: "26 ST Lorem Ipsum Road",
      deliver_address: "26 ST Lorem Ipsum Road",
      pickup_time: "15:00",
      grand_total: "12990",
    },
    {
      order_id: "8927",
      name: "Michael",
      email: "michael@gmail.com",
      phone: "+91 30 03 30 03",
      pickup_address: "27 ST Lorem Ipsum Road",
      deliver_address: "27 ST Lorem Ipsum Road",
      pickup_time: "15:30",
      grand_total: "13990",
    },
    {
      order_id: "8928",
      name: "Emma",
      email: "emma@gmail.com",
      phone: "+91 20 02 20 02",
      pickup_address: "28 ST Lorem Ipsum Road",
      deliver_address: "28 ST Lorem Ipsum Road",
      pickup_time: "16:00",
      grand_total: "14990",
    },
    {
      order_id: "8929",
      name: "Ryan",
      email: "ryan@gmail.com",
      phone: "+91 10 01 10 01",
      pickup_address: "29 ST Lorem Ipsum Road",
      deliver_address: "29 ST Lorem Ipsum Road",
      pickup_time: "16:30",
      grand_total: "15990",
    },
    {
      order_id: "8930",
      name: "Sophia",
      email: "sophia@gmail.com",
      phone: "+91 00 00 00 00",
      pickup_address: "30 ST Lorem Ipsum Road",
      deliver_address: "30 ST Lorem Ipsum Road",
      pickup_time: "17:00",
      grand_total: "16990",
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/orders");
      console.log("Response Data", response.data);
      if (response.data && response.data.data) {
        setPackersData(response.data.data); // Adjust this if necessary based on the actual response structure
      } else {
        console.error("Unexpected response structure", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to format date as ddmmyyyy
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

  const totalPages = Math.ceil(packersData.length / itemsPerPage);

  return (
    <div>
      <h1>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <div className="flex gap-10 w-full">
                <h1 className="font-bold text-2xl">Packers & Movers Details</h1>
                {/* <div className="w-full flex-1">
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
                </div> */}
              </div>
              <div className="ml-auto flex items-center gap-2 pr-5">
                {/* <Button size="sm" variant="outline" className="h-7 gap-1">
                  Export
                </Button> */}
                <Link href={"/dashboard/order/add-order"}>
                  <Button size="sm" variant="outline" className="h-7 gap-1">
                    Add Packers Data
                  </Button>
                </Link>
                <Link href={"/dashboard/order/add-order"}>
                  <Button size="sm" variant="outline" className="h-7 gap-1">
                    Add Packers Order
                  </Button>
                </Link>
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
                              Name
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Email
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Phone
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Pickup Address
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Deliver Address
                            </TableCell>

                            <TableCell
                              className="pl-5"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              Pickup Date
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
                          {PackersData.slice(
                            (currentPage - 1) * itemsPerPage,
                            currentPage * itemsPerPage
                          ).map((order) => (
                            <TableRow key={order.id}>
                              <TableCell>{`#${order.order_id}`}</TableCell>
                              {/* <TableCell>{order.user_id}</TableCell> */}
                              <TableCell
                                style={{ whiteSpace: "nowrap" }}
                              >{`${order.name}`}</TableCell>
                              <TableCell>{order.email}</TableCell>
                              <TableCell style={{ whiteSpace: "nowrap" }}>
                                {order.phone}
                              </TableCell>
                              <TableCell style={{ whiteSpace: "nowrap" }}>
                                {order.pickup_address}
                              </TableCell>
                              <TableCell style={{ whiteSpace: "nowrap" }}>
                                {order.deliver_address}
                              </TableCell>
                              <TableCell>{order.pickup_time}</TableCell>
                              {/* <TableCell>
                                {formatDate(order.pickup_time)}
                              </TableCell> */}
                              {/* <TableCell>{order.what_sending}</TableCell> */}
                              <TableCell>{`₹ ${order.grand_total}`}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Link href="/dashboard/packers/1">
                                    <Button variant="outline">
                                      View Details
                                    </Button>
                                  </Link>
                                  {/* <Button variant="outline">Decline</Button> */}
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
                      {currentPage * itemsPerPage > packersData.length
                        ? packersData.length
                        : currentPage * itemsPerPage}
                    </strong>{" "}
                    of <strong>{packersData.length}</strong> orders
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

export default PackersPage;
