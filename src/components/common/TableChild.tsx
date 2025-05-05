import React, { useState, useMemo, useCallback, ChangeEvent } from "react";
import DataTable, { TableColumn, TableProps } from "react-data-table-component";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExcel,
  faFilePdf,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import type { TDocumentDefinitions, TableLayout } from "pdfmake/interfaces";

export type Row = {
  id: number;
  title: string;
  year: string;
};

interface TableChildProps {
  data: Row[];
}

const ExpandedComponent: React.FC<{ data: Row }> = ({ data }) => (
  <div className="p-4 bg-gray-100 text-gray-800 rounded-lg shadow-inner">
    <p className="font-semibold mb-2">Detalles de la película:</p>
    <p>
      <span className="font-medium">ID:</span> {data.id}
    </p>
    <p>
      <span className="font-medium">Título:</span> {data.title}
    </p>
    <p>
      <span className="font-medium">Año:</span> {data.year}
    </p>
  </div>
);

const columns: TableColumn<Row>[] = [
  { name: "ID", selector: (row) => row.id, sortable: true, width: "80px" },
  { name: "Título", selector: (row) => row.title, sortable: true, grow: 2 },
  { name: "Año", selector: (row) => row.year, sortable: true, width: "100px" },
];

const paginationComponentOptions = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};

const customStyles: TableProps<Row>["customStyles"] = {
  header: {
    style: { fontSize: "1.25rem", fontWeight: "600", color: "#f1f5f9" },
  },
  headCells: {
    style: {
      color: "#000000",
      fontSize: "1rem",
      fontWeight: "600",
      padding: "0.75rem",
      position: "sticky",
      top: 0,
      zIndex: 10,
      boxShadow: "0 2px 2px -1px rgba(0,0,0,0.1)",
    },
  },
  cells: { style: { padding: "0.75rem" } },
  rows: {
    style: { minHeight: "56px", borderBottom: "1px solid #e2e8f0" },
    stripedStyle: { backgroundColor: "#f8fafc" },
  },
  pagination: {
    style: { borderTop: "1px solid #e2e8f0", paddingTop: "0.5rem" },
  },
};

export default function TableChild({ data }: TableChildProps) {
  const [filterText, setFilterText] = useState("");

  const filteredData = useMemo(
    () =>
      data.filter(
        (row) =>
          row.title.toLowerCase().includes(filterText.toLowerCase()) ||
          row.year.includes(filterText) ||
          String(row.id).includes(filterText)
      ),
    [data, filterText]
  );

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  }, []);

  const exportToExcel = useCallback(async () => {
    if (!filteredData.length) return;
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Películas");
    sheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Título", key: "title", width: 32 },
      { header: "Año", key: "year", width: 10 },
    ];
    filteredData.forEach((row) =>
      sheet.addRow({ id: row.id, title: row.title, year: row.year })
    );
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "peliculas.xlsx");
  }, [filteredData]);

  const exportToPDF = useCallback(() => {
    if (!filteredData.length) return;
    const headerRow = columns.map((col) =>
      typeof col.name === "string" ? col.name : ""
    );
    const bodyRows = filteredData.map((row) => [
      row.id.toString(),
      row.title,
      row.year,
    ]);
    const tableLayout: TableLayout = {
      fillColor: (rowIndex) =>
        rowIndex === 0 ? "#475569" : rowIndex % 2 === 0 ? "#f8fafc" : "#ffffff",
    };
    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: "Listado de Películas", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "*", "auto"],
            body: [headerRow, ...bodyRows],
          },
          layout: tableLayout,
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          color: "#334155",
        },
      },
      defaultStyle: { fontSize: 10 },
    };
    pdfMake.createPdf(docDefinition).download("peliculas.pdf");
  }, [filteredData]);

  const subHeaderComponent = useMemo(
    () => (
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Button
            onClick={exportToExcel}
            disabled={!filteredData.length}
            className={`w-full sm:w-auto font-semibold rounded-lg p-2 shadow-md ${
              filteredData.length
                ? "bg-green-900 hover:bg-green-500 text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
            Exportar a Excel
          </Button>
          <Button
            onClick={exportToPDF}
            disabled={!filteredData.length}
            className={`w-full sm:w-auto font-semibold rounded-lg p-2 shadow-md ${
              filteredData.length
                ? "bg-indigo-900 hover:bg-indigo-500 text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
            Exportar a PDF
          </Button>
        </div>
        <div className="w-full md:w-1/5 flex items-center space-x-2">
          <Input
            placeholder="Buscar..."
            value={filterText}
            onChange={handleSearch}
            className="flex-1 text-sm border-indigo-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
          />
          {filterText && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilterText("")}
              className="rounded-full border-gray-400"
            >
              <FontAwesomeIcon icon={faTimes} className="text-lg" />
            </Button>
          )}
        </div>
      </div>
    ),
    [filterText, exportToExcel, exportToPDF, handleSearch, filteredData.length]
  );

  return (
    <div className="p-4 bg-white shadow-xl rounded-2xl">
      <DataTable
        title=""
        columns={columns}
        data={filteredData}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        subHeader
        subHeaderComponent={subHeaderComponent}
        noDataComponent="No hay registros para mostrar"
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        highlightOnHover
        pointerOnHover
        striped
        responsive
        fixedHeader
        fixedHeaderScrollHeight="600px"
        customStyles={customStyles}
        className="overflow-hidden"
      />
    </div>
  );
}
