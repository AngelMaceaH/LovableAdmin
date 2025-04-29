"use client";

import { useSidebar } from "@/context/SidebarContext";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUserCog, faBars, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <aside
      className={`bg-slate-700 fixed top-0 left-0 h-full z-40 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } w-full md:w-64`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-6 border-b border-slate-600">
        <div className="relative w-full h-11">
          <Image
            src="/img/logo_dark.webp"
            alt="Logo"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain block"
          />
        </div>

        {/* Botón hamburguesa solo en móviles */}
        <button
          onClick={toggleSidebar}
          className="text-gray-300 hover:text-blue-400 transition md:hidden"
          aria-label="Cerrar menú"
        >
          <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        </button>
      </div>

      {/* Navegación */}
      <nav className="flex flex-col p-4 space-y-2">
        <SidebarLink href="/" label="Dashboard" icon={faHome} />
        <SidebarLink href="/admin/users" label="Usuarios" icon={faUserCog} />
        <SidebarLink href="/admin/menus" label="Menú" icon={faBars} />
      </nav>
    </aside>
  );
}

function SidebarLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: IconDefinition;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-blue-400 hover:bg-slate-600 rounded-md transition"
    >
      <FontAwesomeIcon icon={icon} className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );
}
