"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import useSWR from "swr";
import toast from "react-hot-toast";
import { useSidebar } from "@/context/SidebarContext";
import { useSession } from "@/context/SessionContext";
import { fetchMenu } from "@/api/access/actions/menu";

export default function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const { sessionToken } = useSession();
  const sidebarRef = useRef<HTMLElement>(null);
  const [openModules, setOpenModules] = useState<Set<number>>(new Set());
  const [openSubModules, setOpenSubModules] = useState<Set<string>>(new Set());
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const token = sessionToken?.value;
  const { data, error } = useSWR(token ? ["menu", token] : null, fetchMenu);
  useEffect(() => {
    if (error) toast.error(error.message || "Error cargando menú");
  }, [error]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSidebarOpen) toggleSidebar();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isSidebarOpen]);
  useEffect(() => {
    if (isSidebarOpen && sidebarRef.current) {
      const first = sidebarRef.current.querySelector<HTMLElement>("button, a");
      first?.focus();
    }
  }, [isSidebarOpen]);

  const handleToggleModule = (moduleId: number) => {
    setOpenModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) next.delete(moduleId);
      else next.add(moduleId);
      return next;
    });
  };
  const handleToggleSubmodule = (moduleId: number, subId: number) => {
    const key = `${moduleId}-${subId}`;
    setOpenSubModules((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };
  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        ref={sidebarRef}
        className={clsx(
          "bg-slate-700 fixed top-0 left-0 h-full z-40 w-full md:w-64 transform transition-transform duration-300",
          {
            "-translate-x-full": !isSidebarOpen,
            "translate-x-0": isSidebarOpen,
          }
        )}
      >
        <div className="flex items-center justify-between px-4 py-6 border-b border-slate-600">
          <div className="relative w-full h-11">
            <Image
              src="/img/logo_dark.webp"
              alt="Logo"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
          <button
            onClick={toggleSidebar}
            className="text-gray-300 hover:text-blue-400 md:hidden"
            aria-label="Cerrar menú"
          >
            <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
          </button>
        </div>
        <nav
          aria-label="Main navigation"
          className="flex flex-col p-4 space-y-1"
        >
          {!data && <div className="text-gray-300 p-2">Cargando menú...</div>}
          {data?.map((mod) => {
            const isOpenMod = openModules.has(mod.module);
            return (
              <div key={mod.module}>
                <button
                  onClick={() => handleToggleModule(mod.module)}
                  className="w-full flex justify-between items-center px-4 py-2 text-gray-300 hover:bg-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <span>{mod.description}</span>
                  <FontAwesomeIcon
                    icon={isOpenMod ? faChevronDown : faChevronRight}
                    className="w-4 h-4"
                  />
                </button>

                {isOpenMod && (
                  <div className="mt-1 space-y-1">
                    {mod.subModules.map((sub) => {
                      const key = `${mod.module}-${sub.subModule}`;
                      const isOpenSub = openSubModules.has(key);
                      return (
                        <div key={sub.subModule}>
                          <button
                            onClick={() =>
                              handleToggleSubmodule(mod.module, sub.subModule)
                            }
                            className="w-full flex justify-between items-center px-6 py-2 text-gray-300 hover:bg-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                          >
                            <span>{sub.description}</span>
                            <FontAwesomeIcon
                              icon={isOpenSub ? faChevronDown : faChevronRight}
                              className="w-3 h-3"
                            />
                          </button>

                          {isOpenSub && (
                            <div className="mt-1">
                              {sub.programs.map((prog) => (
                                <Link
                                  key={prog.id}
                                  href={`/program/${prog.id}`}
                                  onClick={toggleSidebar}
                                  className="block px-10 py-1 text-gray-300 hover:text-blue-400 hover:bg-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                  {prog.description}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
