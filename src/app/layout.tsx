"use client";
import "@/styles/global.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <html lang="es" className="dark">
      <body className="flex min-h-screen bg-gray-100">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div
          className={`flex flex-col flex-1 min-h-screen ml-0 ${
            isSidebarOpen ? "ml-64" : ""
          }`}
        >
          <Header
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <main className="flex-1 p-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
