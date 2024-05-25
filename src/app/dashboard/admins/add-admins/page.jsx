"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
      });

      if (response.data && response.data.status) {
        // Registration successful
        setSuccessMessage("Registration successful. Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setError(response.data.msg || "Registration failed.");
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "An error occurred during registration. Please try again."
      );
    }
  };

  return (
    <div className="flex items-top justify-center min-h-screen pt-5">
      <div>
        <div>
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Add Admin/Sub Admin</h1>
              <p className="text-balance text-muted-foreground">
                Fill the details to add admins and sub-admins
              </p>
            </div>
            <div className="grid gap-4">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Jack Doe"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2 mt-5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="m@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2 mt-5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="password here"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      onClick={toggleShowPassword}
                      type="button"
                      className="absolute right-0 top-0 mt-2 mr-2 focus:outline-none"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5 mt-5">
                  <Label htmlFor="choose-document">Select Type</Label>
                  <Select>
                    <SelectTrigger id="choose-document">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="1">Admin</SelectItem>
                      <SelectItem value="2">Sub Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {successMessage && (
                  <p className="text-green-500 mt-2">{successMessage}</p>
                )}
                <Button className="w-full mt-5" type="submit">
                  Register
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
