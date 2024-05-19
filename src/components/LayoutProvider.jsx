"use client";
import { useRouter } from "next/navigation";
import { RootLayout } from "@/app/layout";

export default function LayoutProvider({ children }) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";

  return !isLoginPage ? <RootLayout>{children}</RootLayout> : children;
}
