import CrudTable from "@/components/CrudTable";

const columns = [
  { key: "id", label: "ID", readOnly: true },
  { key: "usuario_id", label: "ID Usuario", type: "number", step: "1" },
  { key: "total", label: "Total", type: "number", step: "0.01", prefix: "$" },
  { key: "estado", label: "Estado", type: "text" },
];

export default function PedidosPage() {
  return (
    <CrudTable
      title="Pedidos"
      endpoint="/api/pedidos"
      columns={columns}
    />
  );
}
