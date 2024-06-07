"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const AddOffer = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    image: "",
    description: "",
    discount_type: "",
    discount_value: "",
    max_discount: "",
    min_order_value: "",
    usage_limit: "",
    start_date: new Date().toISOString().split("T")[0], // Set start date to today's date
    end_date: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    try {
      console.log("Form Data:", formData); // Log form data for debugging
      const response = await axios.post("/api/add-offer", formData);
      console.log("Response:", response.data);
      alert("Form submitted successfully!"); // Show alert after successful submission
      setFormData({
        // Clear form data after submission
        code: "",
        image: "",
        description: "",
        discount_type: "",
        discount_value: "",
        max_discount: "",
        min_order_value: "",
        usage_limit: "",
        start_date: new Date().toISOString().split("T")[0], // Reset start date to today's date
        end_date: "",
      });
    } catch (error) {
      console.error(
        "Error adding order:",
        error.response?.data || error.message
      );
    } finally {
      setFormSubmitted(false);
    }
  };
  const handleSelectChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };
  const handleStartDateChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      start_date: value,
      end_date: "", // Reset end date when start date changes
    });
  };

  return (
    <div className="flex justify-center mx-10 mt-10">
      <Card className="w-[900px] sm:w-300px mb-5">
        <CardHeader>
          <CardTitle>Add Coupon</CardTitle>
          <CardDescription>
            Here you can add Coupon for customer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="code">Coupon Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Coupon Code"
                  value={formData.code}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="image">Upload Image</Label>
                <Input
                  id="image"
                  type="file"
                  onChange={handleChange}
                  accept="image/*"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="Voucher Description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="discount_type">Discount Type</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("discount_type", value)
                  }
                >
                  <SelectTrigger id="discount_type">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="discount_value">Discount Value</Label>
                <Input
                  id="discount_value"
                  type="text"
                  placeholder="Discount Value"
                  value={formData.discount_value}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="max_discount">Max Discount</Label>
                <Input
                  id="max_discount"
                  type="text"
                  placeholder="Maximum Discount"
                  value={formData.max_discount}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="min_order_value">Minimum Order Value</Label>
                <Input
                  id="min_order_value"
                  type="text"
                  placeholder="Minimum Order Value"
                  value={formData.min_order_value}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="usage_limit">Usage Limit</Label>
                <Input
                  id="usage_limit"
                  type="text"
                  placeholder="Usage Limit"
                  value={formData.usage_limit}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  className="w-full"
                  id="start_date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]} // Set min attribute to today's date
                  value={formData.start_date}
                  onChange={handleStartDateChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  className="w-full"
                  id="end_date"
                  type="date"
                  min={formData.start_date} // Set min attribute to start date
                  value={formData.end_date}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button type="submit" disabled={formSubmitted}>
                Add Offer
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default AddOffer;
