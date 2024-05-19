import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Cards } from "@/components/Cards";
import Image from "next/image";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <div>
      <div>
        {/* <Cards /> */}
        <Dashboard />
      </div>
    </div>
  );
}
