import React from "react";

export default function page() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg p-4">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Inicio
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Perfil
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Configuraciones
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Salir
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className="ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Bienvenido al Dashboard</h1>
          <p className="text-gray-600">Resumen de la actividad reciente</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold">Usuarios</h3>
            <p className="mt-2 text-2xl font-bold">1,245</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold">Ventas</h3>
            <p className="mt-2 text-2xl font-bold">$23,000</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold">Suscriptores</h3>
            <p className="mt-2 text-2xl font-bold">312</p>
          </div>
        </section>
      </div>
    </div>
  );
}
