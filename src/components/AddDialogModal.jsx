// components/AddDialogModal.jsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { DropdownMenu } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const AddDialogModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    pickupAddress: "",
    deliverAddress: "",
    orderType: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    alert("Order added successfully!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Order</DialogTitle>
          <DialogDescription>Here you can add Order on behalf of customer</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 pt-5">
            <div className="flex">
              <div className="w-1/2 mr-2">
                <Input
                  name="first-name"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2 ml-2">
                <Input
                  name="last-name"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              name="pickupAddress"
              placeholder="Pickup-address"
              value={formData.pickupAddress}
              onChange={handleChange}
            />
            <Input
              name="deliver-address"
              placeholder="Deliver Address"
              value={formData.deliverAddress}
              onChange={handleChange}
            />
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="order-type">Order Type</Label>
              <Select>
                <SelectTrigger id="order-type">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="house-shifting">House Shifting</SelectItem>
                  <SelectItem value="office-shifting">
                    Office Shifting
                  </SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter></DialogFooter>
          <div className="pt-5">
            <Button type="submit">Add Order</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialogModal;
