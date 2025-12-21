"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className={isAdminRoute ? "min-h-screen bg-gray-100" : "pt-[80px] lg:pt-[117px]"}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}

