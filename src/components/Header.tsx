"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faChevronDown,
  faUserCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type HeaderProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
};

export default function Header({
  isSidebarOpen,
  setIsSidebarOpen,
}: HeaderProps) {
  return (
    <header className="bg-slate-100 shadow-md">
      <div className="px-4 py-4 flex justify-between items-center gap-8">
        <button
          onClick={() => {
            console.log("CLIC");
            setIsSidebarOpen(!isSidebarOpen);
          }}
          className="text-gray-700 hover:text-blue-600 transition"
        >
          <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        </button>

        {/* Usuario y logout */}
        <div className="flex items-center gap-8 ml-auto">
          {/* Usuario */}
          <div className="relative group cursor-pointer text-right">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <div>
                <div className="font-semibold text-gray-800 flex items-center gap-1">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="w-5 h-5 text-gray-500"
                  />
                  Marvin Martinez
                </div>
                <div className="text-sm text-gray-500">Administrador</div>
              </div>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="w-4 h-4 text-gray-400 hidden sm:inline-block"
              />
            </div>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-20">
              <Link
                href="/admin/users"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 gap-2"
              >
                <FontAwesomeIcon icon={faUserCircle} className="w-4 h-4" />
                Usuarios
              </Link>
              <Link
                href="/admin/menus"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 gap-2"
              >
                <FontAwesomeIcon icon={faUserCircle} className="w-4 h-4" />
                Menú
              </Link>
            </div>
          </div>

          {/* Logout */}
          <nav>
            <Link
              href="/logout"
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
              <span>Cerrar sesión</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
