import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "StoreAdmin - Gestión de Base de Datos MySQL",
  description: "Panel CRUD con Next.js, Tailwind CSS y MySQL2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
