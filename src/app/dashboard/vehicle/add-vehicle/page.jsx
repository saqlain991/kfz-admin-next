"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddVehicle = () => {
  const [vehicleFirstName, setvehicleFirstName] = useState("");
  const [vehicleLastName, setvehicleLastName] = useState("");
  const [vehicleEmail, setvehicleEmail] = useState("");
  const [vehiclePhone, setvehiclePhone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (
      !vehicleFirstName ||
      !vehicleLastName ||
      !vehicleEmail.match(emailRegex) ||
      !vehiclePhone
    ) {
      alert("Please fill out all fields correctly.");
      return;
    }
    setFormSubmitted(true);
    // Proceed with form submission logic here
    console.log("Form Data Saved Successfully ");
    console.log({
      firstName: vehicleFirstName,
      lastName: vehicleLastName,
      email: vehicleEmail,
      phone: vehiclePhone,
    });
  };

  return (
    <div className="flex justify-center mx-10 mt-10">
      <Card className="w-[900px] sm:w-300px">
        <CardHeader>
          <CardTitle>Add Vehicle</CardTitle>
          <CardDescription>Here you can add Vehicle</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="name"
                  placeholder="First Name of vehicle"
                  value={vehicleFirstName}
                  onChange={(e) => setvehicleFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Last Name</Label>
                <Input
                  id="email"
                  placeholder="Last Name of vehicle"
                  value={vehicleLastName}
                  onChange={(e) => setvehicleLastName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Email of vehicle"
                  value={vehicleEmail}
                  onChange={(e) => setvehicleEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="Phone Number of vehicle"
                  value={vehiclePhone}
                  onChange={(e) => setvehiclePhone(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="choose-document">Choose Document</Label>
                <Select>
                  <SelectTrigger id="choose-document">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="aadhar-card">Aadhar Card</SelectItem>
                    <SelectItem value="pan-card">Pan Card</SelectItem>
                    <SelectItem value="driving-licence">
                      Driving Licence
                    </SelectItem>
                    <SelectItem value="ration-card">Ration Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="item-type">Upload Document</Label>
                <Input type="file" />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button type="submit" disabled={formSubmitted}>
                Add Vehicle
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default AddVehicle;
