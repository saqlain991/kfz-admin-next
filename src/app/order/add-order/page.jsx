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

const AddOrder = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [itemWeight, setItemWeight] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemType, setItemType] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (
      !customerName ||
      !customerEmail.match(emailRegex) ||
      !customerPhone ||
      !pickupAddress ||
      !deliveryAddress ||
      !itemWeight ||
      !itemQuantity ||
      !itemType
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
          <CardTitle>Add Order</CardTitle>
          <CardDescription>
            Here you can add order on behalf of Customer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Customer Name</Label>
                <Input
                  id="name"
                  placeholder="Name of Customer"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="pickup-address">Pickup Address</Label>
                <Input
                  id="pickup-address"
                  placeholder="Pickup Address..."
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="delivery-address">Delivery Address</Label>
                <Input
                  id="delivery-address"
                  placeholder="Delivery Address..."
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="item-weight">Item Weight</Label>
                <Input
                  id="item-weight"
                  placeholder="Weight of Items"
                  value={itemWeight}
                  onChange={(e) => setItemWeight(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="item-quantity">Item Quantity</Label>
                <Input
                  id="item-quantity"
                  placeholder="Number of Items"
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="item-type">Item Type</Label>
                <Select>
                  <SelectTrigger id="item-type">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="beds">Beds</SelectItem>
                    <SelectItem value="sofa">Sofa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button type="submit" disabled={formSubmitted}>
                Add Order
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default AddOrder;
