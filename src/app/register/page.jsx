// src/app/login/page.jsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginLayout from "./layout";

function RegisterPage() {
  return (
    <LoginLayout>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="hidden bg-muted lg:block">
          <Image
            src="/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Register</h1>
              <p className="text-balance text-muted-foreground">
                Enter your information to create an account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex flex-row gap-2">
                <div>
                  <Label htmlFor="fname">First Name</Label>
                  <Input id="fname" type="fname" placeholder="Jack" required />
                </div>
                <div>
                  <Label htmlFor="lname">Last Name</Label>
                  <Input id="lname" type="lname" placeholder="doe" required />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jackdoe@email.com"
                  required
                />
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="phone"
                  placeholder="+91 90*****89"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Have an account?{" "}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LoginLayout>
  );
}

export default RegisterPage;
