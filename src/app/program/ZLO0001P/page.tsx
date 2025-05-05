"use client";
import dynamic from "next/dynamic";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Select from "@/components/common/Select";
const TableChild = dynamic(() => import("@/components/common/TableChild"), {
  ssr: false,
});

export default function AdminPage() {
  const data = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Película ${i + 1}`,
    year: `${2000 + (i % 24)}`,
  }));
  const paises = [
    "Argentina",
    "Brasil",
    "Chile",
    "Colombia",
    "Costa Rica",
    "España",
    "México",
    "Perú",
    "Uruguay",
    "Venezuela",
  ];
  const handleSelect = (pais: string) => {
    console.log("País seleccionado:", pais);
  };
  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="tab1" className="p-0">
        <TabsList className="grid w-full grid-cols-3 border-b bg-slate-100 shadow-lg h-12">
          <TabsTrigger
            value="tab1"
            className=" text-center data-[state=active]:bg-indigo-900 data-[state=active]:text-white rounded-md transition text-lg"
          >
            Valores
          </TabsTrigger>
          <TabsTrigger
            value="tab2"
            className="text-center data-[state=active]:bg-indigo-900 data-[state=active]:text-white rounded-md transition text-lg"
          >
            Unidades
          </TabsTrigger>
          <TabsTrigger
            value="tab3"
            className=" text-center data-[state=active]:bg-indigo-900 data-[state=active]:text-white rounded-md transition text-lg"
          >
            Transacciones
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="p-4">
          <Select
            options={paises}
            onSelect={handleSelect}
            placeholder="Selecciona un país..."
          />

          <TableChild data={data} />
        </TabsContent>
        <TabsContent value="tab2" className="p-4"></TabsContent>
        <TabsContent value="tab3" className="p-4">
          <TableChild data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
