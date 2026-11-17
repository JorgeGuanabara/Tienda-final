"use client";

import { useState, useEffect, useCallback } from "react";

export default function CrudTable({ title, endpoint, columns }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [newRow, setNewRow] = useState({});
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);

  const editableCols = columns.filter((col) => !col.readOnly);

  const fetchRows = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(endpoint, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al cargar datos");
      setRows(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const handleDelete = async (id) => {
    if (!confirm(`¿Seguro que deseas borrar el registro #${id}?`)) return;
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al eliminar");
      setRows((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${endpoint}/${editingRow.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingRow),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al actualizar");
      setEditingRow(null);
      await fetchRows();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRow),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al crear registro");
      setNewRow({});
      setShowCreate(false);
      await fetchRows();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-sm text-slate-400">
            Administra los registros de la tabla {title.toLowerCase()}
          </p>
        </div>
        <button
          onClick={() => setShowCreate((prev) => !prev)}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition self-start sm:self-auto"
        >
          {showCreate ? "Cancelar" : `+ Nuevo en ${title}`}
        </button>
      </div>

      {/* Formulario de creación rápida */}
      {showCreate && (
        <form
          onSubmit={handleCreate}
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {editableCols.map((col) => (
            <div key={col.key}>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                {col.label}
              </label>
              <input
                type={col.type || "text"}
                step={col.step || "any"}
                required={col.required !== false}
                value={newRow[col.key] ?? ""}
                onChange={(e) =>
                  setNewRow({ ...newRow, [col.key]: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          ))}
          <div className="sm:col-span-2 lg:col-span-3 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition disabled:opacity-50"
            >
              {saving ? "Guardando..." : "Guardar Registro"}
            </button>
          </div>
        </form>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Tabla de registros */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/70 text-slate-300 text-xs uppercase tracking-wider border-b border-slate-800">
                {columns.map((col) => (
                  <th key={col.key} className="py-3.5 px-4 font-semibold">
                    {col.label}
                  </th>
                ))}
                <th className="py-3.5 px-4 font-semibold text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="py-8 text-center text-slate-400"
                  >
                    Cargando registros desde MySQL...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="py-8 text-center text-slate-400"
                  >
                    No hay registros disponibles.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="py-3.5 px-4 text-slate-200">
                        {col.prefix || ""}
                        {row[col.key] ?? "-"}
                      </td>
                    ))}
                    <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => setEditingRow({ ...row })}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 text-xs font-medium transition"
                      >
                        Modificar
                      </button>
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 text-xs font-medium transition"
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Modificación */}
      {editingRow && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-4">
              Modificar registro #{editingRow.id}
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              {editableCols.map((col) => (
                <div key={col.key}>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    {col.label}
                  </label>
                  <input
                    type={col.type || "text"}
                    step={col.step || "any"}
                    required={col.required !== false}
                    value={editingRow[col.key] ?? ""}
                    onChange={(e) =>
                      setEditingRow({
                        ...editingRow,
                        [col.key]: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              ))}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingRow(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition disabled:opacity-50"
                >
                  {saving ? "Actualizando..." : "Guardar Cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
