import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Cards } from "@/components/Cards";
import Image from "next/image";
import Dashboard from "./dashboard/page";
import RootLayout from "./dashboard/layout";

export default function Home() {
  return (
    <div>
      <div>
        {/* <Cards /> */}
        <RootLayout>
          <Dashboard />
        </RootLayout>
      </div>
    </div>
  );
}
