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

const AddNotification = () => {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!message || !value || !driverEmail.match(emailRegex) || !driverPhone) {
      alert("Please fill out all fields correctly.");
      return;
    }
    setFormSubmitted(true);
    // Proceed with form submission logic here
    console.log("Form Data Saved Successfully ");
    console.log({
      firstName: message,
      lastName: value,
      email: driverEmail,
      phone: driverPhone,
    });
  };

  return (
    <div className="flex justify-center mx-10 mt-10">
      <Card className="w-[900px] sm:w-300px">
        <CardHeader>
          <CardTitle>Add Notification</CardTitle>
          <CardDescription>
            Here you can add Notification to send on phone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Input
                  id="message"
                  placeholder="Enter Message Here"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  placeholder="Enter value Here"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button type="submit" disabled={formSubmitted}>
                Add Notification
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default AddNotification;
