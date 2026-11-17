import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { nombre, email, rol } = await request.json();
    await pool.query(
      "UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?",
      [nombre, email, rol, id]
    );
    return NextResponse.json({ message: "Usuario actualizado" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
    return NextResponse.json({ message: "Usuario eliminado" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
