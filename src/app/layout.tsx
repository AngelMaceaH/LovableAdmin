import { cookies } from "next/headers";
import { SidebarProvider } from "@/context/SidebarContext";
import { SessionProvider } from "@/context/SessionContext";
import "@/styles/global.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import MainLayout from "@/components/layout/MainLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionToken = (await cookies()).get("session-token");
  const isLoggedIn = !!sessionToken;

  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-gray-100 font-sans min-h-screen">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1e293b",
              color: "#f8fafc",
            },
          }}
        />
        {isLoggedIn ? (
          <SidebarProvider>
            <SessionProvider sessionToken={sessionToken}>
              <MainLayout>{children}</MainLayout>
            </SessionProvider>
          </SidebarProvider>
        ) : (
          <main>{children}</main>
        )}
      </body>
    </html>
  );
}
