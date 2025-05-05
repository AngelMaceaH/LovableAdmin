"use client";
import { useSidebar } from "@/context/SidebarContext";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LoadingProvider } from "@/context/LoadingContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div
        className={`flex flex-col flex-1 transition-all ${
          isSidebarOpen ? "ml-64" : ""
        }`}
      >
        <LoadingProvider>
          <Header />
          <main className="flex-1 p-4">{children}</main>
          <Footer />
        </LoadingProvider>
      </div>
    </div>
  );
}
