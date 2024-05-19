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

const AddCustomer = () => {
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (
      !customerFirstName ||
      !customerLastName ||
      !customerEmail.match(emailRegex) ||
      !customerPhone
    ) {
      alert("Please fill out all fields correctly.");
      return;
    }
    setFormSubmitted(true);
    // Proceed with form submission logic here
    console.log("Form Data Saved Successfully ");
  };

  return (
    <div className="flex justify-center mx-10 mt-10">
      <Card className="w-[900px] sm:w-300px">
        <CardHeader>
          <CardTitle>Add Customer</CardTitle>
          <CardDescription>Here you can add Customer</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Customer First Name</Label>
                <Input
                  id="name"
                  placeholder="First Name of Customer"
                  value={customerFirstName}
                  onChange={(e) => setCustomerFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Customer First Name</Label>
                <Input
                  id="email"
                  placeholder="Last Name of Customer"
                  value={customerLastName}
                  onChange={(e) => setCustomerLastName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Customer Email</Label>
                <Input
                  id="email"
                  placeholder="Email of Customer"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Customer Phone</Label>
                <Input
                  id="phone"
                  placeholder="Phone Number of Customer"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button type="submit" disabled={formSubmitted}>
                Add Customer
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default AddCustomer;
