"use client";

import { useSidebar } from "@/context/SidebarContext";
import { logoutAction } from "@/api/access/actions/logout";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "@/context/SessionContext";
import { useLoading } from "@/context/LoadingContext";
import { decodedPayload } from "@/lib/utils";
import {
  faSignOutAlt,
  faUserCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@/types/Auth";

export default function Header() {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const { showLoading, hideLoading } = useLoading();
  const { sessionToken } = useSession();
  const [user, setUser] = useState<User>({} as User);
  useEffect(() => {
    if (!sessionToken) return;
    const decoded = decodedPayload(sessionToken.value);
    if (decoded) setUser(decoded.user as User);
  }, [sessionToken]);

  const router = useRouter();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleLogout = async () => {
    showLoading();
    try {
      await logoutAction();
    } catch (err) {
      console.error("Error al hacer logout:", err);
    } finally {
      hideLoading();
      await router.refresh();
    }
  };

  return (
    <header className="bg-slate-100 shadow-md">
      <div className="flex justify-between items-center p-4 gap-8">
        <button
          onClick={toggleSidebar}
          className="text-gray-700 hover:text-indigo-600 transition bg-indigo-100 rounded-md p-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="Toggle Sidebar"
        >
          <FontAwesomeIcon icon={faBars} className="w-6 h-6 text-2xl" />
        </button>
        <div className="flex items-center gap-8 ml-auto">
          <UserMenu user={user} />
          <LogoutButton onLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
}

function UserMenu({ user }: { user: User }) {
  return (
    <div className="relative group cursor-pointer text-right">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
        <div>
          <div className="font-semibold text-gray-800 flex items-center gap-1">
            {user?.name}
          </div>
          <div className="text-sm text-gray-500">{user?.desare}</div>
        </div>
      </div>

      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-20">
        <DropdownLink href="/admin/users" label="Usuarios" />
        <DropdownLink href="/admin/menus" label="Menú" />
      </div>
    </div>
  );
}

function DropdownLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
    >
      <FontAwesomeIcon icon={faUserCircle} className="w-4 h-4" />
      {label}
    </Link>
  );
}

function LogoutButton({ onLogout }: { onLogout: () => void }) {
  return (
    <button
      onClick={onLogout}
      className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition text-4xl cursor-pointer"
    >
      <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
      <span className="text-sm">Cerrar sesión</span>
    </button>
  );
}
