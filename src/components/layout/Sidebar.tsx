"use client";
import { useSidebar } from "@/context/SidebarContext";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUserCog, faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
export default function Sidebar() {
  const { isSidebarOpen } = useSidebar();
  return (
    <aside
      className={`bg-slate-700 w-64 h-screen border-r border-slate-600 ${
        isSidebarOpen ? "block" : "hidden"
      } fixed shadow-md`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center py-4 border-b border-slate-600">
        <div className="relative w-40 h-11">
          <Image
            src="/img/logo_dark.webp"
            alt={`Logo`}
            priority={true}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain block"
          />
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex flex-col p-4 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100  px-4 py-3 rounded-md transition"
        >
          <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
          Dashboard
        </Link>

        <Link
          href="/"
          className="flex items-center gap-3 text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100  px-4 py-3 rounded-md transition"
        >
          <FontAwesomeIcon icon={faUserCog} className="w-5 h-5" />
          Usuarios
        </Link>

        <Link
          href="/"
          className="flex items-center gap-3 text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100  px-4 py-3 rounded-md transition"
        >
          <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
          Menú
        </Link>
      </nav>
    </aside>
  );
}
