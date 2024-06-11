// app/(auth)/login/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/login", { email, password });

      if (response.status === 200) {
        const { msg } = response.data;
        alert(msg);
        router.push("/dashboard");
      } else {
        const errorMsg = response.data.error || "Login failed. Please try again.";
        setError(errorMsg);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || "An error occurred. Please try again.";
      setError(errorMsg);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-muted-foreground">
              Fill in the details to access your account
            </p>
          </div>
          <div className="grid gap-4">
            <form onSubmit={handleSubmit}>
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
              <div className="grid gap-2 mt-5 relative">
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
                    {showPassword ? <EyeOff /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-500 mt-2">
                  {error}
                </div>
              )}

              <Button className="w-full mt-5" type="submit">
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          alt="Login image"
          className="h-full w-full object-cover"
          height="1080"
          src="/login.png"
          width="1920"
        />
      </div>
    </div>
  );
}
