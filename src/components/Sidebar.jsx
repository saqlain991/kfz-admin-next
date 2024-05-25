"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Ban,
  BellDot,
  BriefcaseBusiness,
  Car,
  ChevronDown,
  CreditCard,
  Eye,
  File,
  FilePlus,
  Headset,
  Home,
  MapPin,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  SquareGanttChart,
  TicketPercent,
  Truck,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";

const Sidebar = () => {
  const navMenu = [
    {
      name: "Dashboard",
      icons: <Home />,
      url: "/dashboard",
    },
    {
      name: "Order Details",
      icons: <ShoppingCart />,
      url: "/dashboard/order",
    },
    {
      name: "Customer Details",
      icons: <Users />,
      url: "/dashboard/customer",
    },
    {
      name: "Driver Details",
      icons: <Car />,
      url: "/dashboard/driver",
    },

    {
      name: "Payment Details",
      icons: <CreditCard />,
      url: "/dashboard/payment",
    },
    {
      name: "Driver Request List",
      icons: <UserCheck />,
      url: "/dashboard/driver/driver-request",
    },
    {
      name: "Notification ",
      icons: <BellDot />,
      url: "/dashboard/notification",
    },
    {
      name: "What Sending List",
      icons: <Package />,
      url: "/dashboard/what-sending",
    },
    // {
    //   name: "Location",
    //   icons: <MapPin />,
    //   url: "/dashboard/location",
    // },
    {
      name: "Offers",
      icons: <TicketPercent />,
      url: "/dashboard/offer-details",
    },
    {
      name: "Admins",
      icons: <BriefcaseBusiness />,
      url: "/dashboard/admins",
    },
    // {
    //   name: "Employee Details",
    //   icons: <BriefcaseBusiness />,
    //   url: "/dashboard/employee",
    //   submenu: true,
    //   subMenuItems: [
    //     { name: "View Employee", url: "/dashboard/employee", icons: <Eye /> },
    //     {
    //       name: "Add Employee",
    //       url: "/dashboard/employee/add-employee",
    //       icons: <UserPlus />,
    //     },
    //   ],
    // },
    {
      name: "Help & Support",
      icons: <Headset />,
      url: "/dashboard/help",
    },
    {
      name: "Restricted Item List",
      icons: <Ban />,
      url: "/dashboard/restricted-item",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState({});

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleSubmenu = (index) => {
    setIsSubmenuOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <button onClick={toggleSidebar} className="md:hidden p-2">
        <Menu className="h-6 w-6 " />
      </button>

      <div
        className={`border-r bg-muted/40 ${
          isOpen ? "block" : "hidden"
        } md:block h-screen min-w-[350px]`}
      >
        <div className="flex flex-col h-screen">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">KFZ Admin Panel </span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4">
              {navMenu.map((menuData, index) => (
                <div key={index}>
                  <Link
                    href={menuData.url}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-orange-500 hover:text-white"
                  >
                    {menuData.icons}
                    {menuData.name}
                    {menuData.submenu && (
                      <button
                        onClick={() => toggleSubmenu(index)}
                        className="ml-auto"
                      >
                        <ChevronDown className="h-5 w-5" />
                      </button>
                    )}
                  </Link>
                  {menuData.submenu && (
                    <div
                      className={`ml-4 ${
                        isSubmenuOpen[index] ? "block" : "hidden"
                      } transition-all duration-200 ease-in-out`}
                    >
                      {menuData.subMenuItems.map((subItem, idx) => (
                        <Link
                          key={idx}
                          href={subItem.url}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-orange-500 hover:text-white"
                        >
                          {subItem.icons}
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <h1>Version: 1.2.3</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
