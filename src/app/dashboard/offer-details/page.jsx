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
import Image from "next/image";

const OfferPage = () => {
  const [offerData, setofferData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/offers");
      console.log("Response Data", response.data);
      if (response.data && response.data.data) {
        setofferData(response.data.data); // Adjust this if necessary based on the actual response structure
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

  const totalPages = Math.ceil(offerData.length / itemsPerPage);

  return (
    <div>
      <h1>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <div className="flex gap-10 w-full">
                <h1 className="font-bold text-2xl">Offer List</h1>
                <div className="w-full flex-1">
                  <form>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search offer..."
                        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    
                  </DropdownMenuContent>
                </DropdownMenu> */}
                {/* <Button size="sm" variant="outline" className="h-7 gap-1">
                  Export
                </Button> */}
                <Link
                  href={"/dashboard/offer-details/add-offer"}
                  className="mr-5"
                >
                  <Button size="sm" variant="outline" className="h-7 gap-1">
                    Add Offer
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
                              Id
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Code
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Image
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Description
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Discount Type
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Discount Value
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Max Discount
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Min Discount
                            </TableCell>
                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Usage Limit
                            </TableCell>
                            <TableCell
                              style={{
                                whiteSpace: "nowrap",
                                marginLeft: "20px",
                              }}
                            >
                              Start Date
                            </TableCell>
                            <TableCell
                              className="pl-5 w-full"
                              style={{
                                whiteSpace: "nowrap",
                              }}
                            >
                              End Date
                            </TableCell>

                            <TableCell style={{ whiteSpace: "nowrap" }}>
                              Status
                            </TableCell>
                            <TableCell
                              style={{
                                whiteSpace: "nowrap",
                                textAlign: "center",
                              }}
                            >
                              Action
                            </TableCell>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {offerData
                            .slice(
                              (currentPage - 1) * itemsPerPage,
                              currentPage * itemsPerPage
                            )
                            .map((offer) => (
                              <TableRow key={offer.id}>
                                <TableCell>{`#${offer.id}`}</TableCell>
                                <TableCell>{offer.code}</TableCell>
                                <TableCell className="w-full">
                                  <Image
                                    src={offer.image}
                                    alt={`Image for ${offer.code}`}
                                    width={100}
                                    height={100}
                                    objectFit="cover"
                                  />
                                </TableCell>
                                <TableCell>{offer.description}</TableCell>
                                <TableCell>{offer.discount_type}</TableCell>
                                <TableCell>{`${offer.discount_value} `}</TableCell>
                                <TableCell>{`${offer.max_discount} `}</TableCell>
                                <TableCell>{offer.min_order_value}</TableCell>
                                <TableCell>{offer.usage_limit}</TableCell>
                                <TableCell style={{ whiteSpace: "nowrap" }}>
                                  {formatDate(offer.start_date)}
                                </TableCell>
                                <TableCell style={{ whiteSpace: "nowrap" }}>
                                  {formatDate(offer.end_date)}
                                </TableCell>
                                <TableCell>
                                  {offer.status ? "Active" : "Not Active"}
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    {/* <Button variant="outline">Update</Button> */}
                                    <Button variant="outline">Delete</Button>
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
                      {currentPage * itemsPerPage > offerData.length
                        ? offerData.length
                        : currentPage * itemsPerPage}
                    </strong>{" "}
                    of <strong>{offerData.length}</strong> offers
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

export default OfferPage;
