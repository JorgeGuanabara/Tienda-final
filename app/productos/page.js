import CrudTable from "@/components/CrudTable";

const columns = [
  { key: "id", label: "ID", readOnly: true },
  { key: "nombre", label: "Nombre", type: "text" },
  { key: "precio", label: "Precio", type: "number", step: "0.01", prefix: "$" },
  { key: "stock", label: "Stock", type: "number", step: "1" },
  { key: "categoria_id", label: "ID Categoría", type: "number", step: "1", required: false },
];

export default function ProductosPage() {
  return (
    <CrudTable
      title="Productos"
      endpoint="/api/productos"
      columns={columns}
    />
  );
}
