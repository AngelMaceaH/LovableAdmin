"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUserCog, faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
type SidebarProps = {
  isSidebarOpen: boolean;
};
export default function Sidebar({ isSidebarOpen }: SidebarProps) {
  useEffect(() => {
    console.log("CAMBIO desde SIDEBAR");
  }, [isSidebarOpen]);

  return (
    <aside
      className={`bg-white dark:bg-slate-700 w-64 h-screen border-r dark:border-slate-600 border-gray-200 ${
        isSidebarOpen ? "block" : "hidden"
      } fixed shadow-md`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center py-4 border-b border-gray-200 dark:border-slate-600">
        <div className="relative w-40 h-11">
          {/* Logo claro */}
          <Image
            src="/img/logo.webp"
            alt="Logo Light"
            fill
            className="object-contain block dark:hidden"
          />
          {/* Logo oscuro */}
          <Image
            src="/img/logo_dark.webp"
            alt="Logo Dark"
            fill
            className="object-contain hidden dark:block"
          />
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex flex-col p-4 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-600 px-4 py-3 rounded-md transition"
        >
          <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
          Dashboard
        </Link>

        <Link
          href="/"
          className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-600 px-4 py-3 rounded-md transition"
        >
          <FontAwesomeIcon icon={faUserCog} className="w-5 h-5" />
          Usuarios
        </Link>

        <Link
          href="/"
          className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-600 px-4 py-3 rounded-md transition"
        >
          <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
          Menú
        </Link>
      </nav>
    </aside>
  );
}
