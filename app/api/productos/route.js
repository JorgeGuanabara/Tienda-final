import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM productos ORDER BY id DESC");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { nombre, precio, stock, categoria_id } = await request.json();
    const [result] = await pool.query(
      "INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES (?, ?, ?, ?)",
      [nombre, Number(precio), Number(stock), categoria_id ? Number(categoria_id) : null]
    );
    return NextResponse.json({ id: result.insertId, message: "Producto creado" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
