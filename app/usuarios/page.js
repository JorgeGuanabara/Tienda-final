import CrudTable from "@/components/CrudTable";

const columns = [
  { key: "id", label: "ID", readOnly: true },
  { key: "nombre", label: "Nombre", type: "text" },
  { key: "email", label: "Correo Electrónico", type: "email" },
  { key: "rol", label: "Rol", type: "text" },
];

export default function UsuariosPage() {
  return (
    <CrudTable
      title="Usuarios"
      endpoint="/api/usuarios"
      columns={columns}
    />
  );
}
