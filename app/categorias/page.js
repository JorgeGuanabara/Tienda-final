import CrudTable from "@/components/CrudTable";

const columns = [
  { key: "id", label: "ID", readOnly: true },
  { key: "nombre", label: "Nombre", type: "text" },
  { key: "descripcion", label: "Descripción", type: "text", required: false },
];

export default function CategoriasPage() {
  return (
    <CrudTable
      title="Categorías"
      endpoint="/api/categorias"
      columns={columns}
    />
  );
}
