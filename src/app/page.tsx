export default function Home() {
  return (
    <section className="flex-1 p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold">Usuarios</h2>
          <p className="mt-2 text-2xl">1,245</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold">Ventas</h2>
          <p className="mt-2 text-2xl">$23,000</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold">Suscriptores</h2>
          <p className="mt-2 text-2xl">312</p>
        </div>
      </div>
    </section>
  );
}
