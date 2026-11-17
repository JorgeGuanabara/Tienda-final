import Link from "next/link";

const sections = [
  {
    title: "Productos",
    description: "Consulta, modifica nombre, precio, stock o elimina productos.",
    href: "/productos",
  },
  {
    title: "Usuarios",
    description: "Administra cuentas de clientes y administradores registrados.",
    href: "/usuarios",
  },
  {
    title: "Categorías",
    description: "Organiza y actualiza las categorías del catálogo.",
    href: "/categorias",
  },
  {
    title: "Pedidos",
    description: "Revisa totales, estados de envío y elimina órdenes.",
    href: "/pedidos",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Panel de Administración MySQL
        </h1>
        <p className="text-slate-400 mt-2 max-w-2xl">
          Selecciona cualquiera de las tablas en el menú superior o en las
          tarjetas inferiores para visualizar, modificar o borrar registros en
          tiempo real mediante <code className="text-indigo-400">mysql2</code>.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {sections.map((sec) => (
          <Link
            key={sec.href}
            href={sec.href}
            className="block p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/60 hover:bg-slate-900/80 transition group"
          >
            <h2 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition">
              {sec.title} &rarr;
            </h2>
            <p className="text-sm text-slate-400 mt-1">{sec.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
