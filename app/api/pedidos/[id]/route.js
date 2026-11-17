import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { usuario_id, total, estado } = await request.json();
    await pool.query(
      "UPDATE pedidos SET usuario_id = ?, total = ?, estado = ? WHERE id = ?",
      [Number(usuario_id), Number(total), estado, id]
    );
    return NextResponse.json({ message: "Pedido actualizado" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await pool.query("DELETE FROM pedidos WHERE id = ?", [id]);
    return NextResponse.json({ message: "Pedido eliminado" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
