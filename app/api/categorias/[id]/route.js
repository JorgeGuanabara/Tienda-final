import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { nombre, descripcion } = await request.json();
    await pool.query(
      "UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?",
      [nombre, descripcion, id]
    );
    return NextResponse.json({ message: "Categoría actualizada" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await pool.query("DELETE FROM categorias WHERE id = ?", [id]);
    return NextResponse.json({ message: "Categoría eliminada" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
