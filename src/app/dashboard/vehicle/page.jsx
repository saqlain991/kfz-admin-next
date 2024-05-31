"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomPagination } from "@/components/pagination";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { Search, Car } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const VehiclePage = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/vehicle/vehicle-list");
      console.log("Response data:", response.data); // Log response data
      setVehicleData(response.data.data); // Assuming the data is inside the 'data' property
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

  const totalPages = Math.ceil(vehicleData.length / itemsPerPage);

  return (
    <div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <div className="flex flex-col w-full">
              <h1 className="font-bold text-2xl pb-3">Vehicle List</h1>
              <form>
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search Vehicle..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Link href={"/dashboard/vehicle/add-vehicle-type"}>
                <Button size="sm" variant="outline" className="h-7 gap-1">
                  <Car className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Type
                  </span>
                </Button>
              </Link>
              <Link href={"/dashboard/vehicle/add-vehicle"}>
                <Button size="sm" variant="outline" className="h-7 gap-1">
                  <Car className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Vehicle
                  </span>
                </Button>
              </Link>
            </div>
          </div>
          <TabsContent value="all">
            <Card className="h-[600px]" x-chunk="dashboard-06-chunk-0 mb-5">
              <CardContent>
                <ScrollArea className="h-[480px] w-full overflow-y-auto">
                  <Table>
                    <TableHeader className="py-4">
                      <TableRow>
                        <TableHead style={{ whiteSpace: "nowrap" }}>
                          Id
                        </TableHead>
                        <TableHead style={{ whiteSpace: "nowrap" }}>
                          Type Id
                        </TableHead>
                        <TableHead style={{ whiteSpace: "nowrap" }}>
                          Limit Kg
                        </TableHead>
                        <TableHead style={{ whiteSpace: "nowrap" }}>
                          Price Per KM
                        </TableHead>
                        <TableHead style={{ whiteSpace: "nowrap" }}>
                          Main Driver Id
                        </TableHead>
                        <TableHead style={{ whiteSpace: "nowrap" }}>
                          Assign Driver Id
                        </TableHead>
                        <TableHead style={{ whiteSpace: "nowrap" }}>
                          Plate No
                        </TableHead>
                        <TableHead style={{ whiteSpace: "nowrap" }}>
                          Status
                        </TableHead>
                        <TableHead style={{ whiteSpace: "nowrap" }}>
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vehicleData
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
                              {item.type_id}
                            </TableCell>
                            <TableCell className="font-medium p-2">
                              {`${item.limit_kg} Kg`}
                            </TableCell>
                            <TableCell className="font-medium p-2">
                              {`${item.per_km_price} KM`}
                            </TableCell>
                            <TableCell className="font-medium p-2">
                              {item.main_driver_id}
                            </TableCell>
                            <TableCell className="font-medium p-2">
                              {item.assign_driver_id}
                            </TableCell>
                            <TableCell className="font-medium p-2">
                              {item.plate_no}
                            </TableCell>
                            <TableCell className="font-medium p-2">
                              {item.status ? "Active" : "Not Active"}
                            </TableCell>
                            <TableCell className="font-medium p-2">
                              {" "}
                              <Button variant="outline">Delete</Button>
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
                    {currentPage * itemsPerPage > vehicleData.length
                      ? vehicleData.length
                      : currentPage * itemsPerPage}
                  </strong>{" "}
                  of <strong>{vehicleData.length}</strong> vehicles
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default VehiclePage;
