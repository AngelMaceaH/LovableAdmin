"use client";

import Image from "next/image";

export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl shadow-lg bg-white dark:bg-slate-800 rounded-lg overflow-hidden">
        {/* Sección de Imágenes */}
        <div className="hidden md:block relative">
          <Image
            src="/img/backgrounds/bg1.jpg"
            alt="Imagen Login"
            fill
            className="object-cover"
          />
        </div>

        {/* Formulario */}
        <div className="p-8 flex flex-col justify-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/img/logo.webp"
              alt="Logo"
              width={200}
              height={100}
              className="object-contain dark:hidden"
            />
            <Image
              src="/img/logo_dark.webp"
              alt="Logo Dark"
              width={200}
              height={100}
              className="object-contain hidden dark:block"
            />
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Iniciar sesión
          </h2>

          <form className="space-y-6">
            {/* Usuario */}
            <div>
              <label className="block mb-1 text-gray-600 dark:text-gray-300">
                Usuario
              </label>
              <input
                type="text"
                placeholder="Escribe tu usuario"
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block mb-1 text-gray-600 dark:text-gray-300">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
