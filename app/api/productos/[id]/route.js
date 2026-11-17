import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { nombre, precio, stock, categoria_id } = await request.json();
    await pool.query(
      "UPDATE productos SET nombre = ?, precio = ?, stock = ?, categoria_id = ? WHERE id = ?",
      [nombre, Number(precio), Number(stock), categoria_id ? Number(categoria_id) : null, id]
    );
    return NextResponse.json({ message: "Producto actualizado" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await pool.query("DELETE FROM productos WHERE id = ?", [id]);
    return NextResponse.json({ message: "Producto eliminado" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
