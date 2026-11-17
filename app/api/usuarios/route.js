import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios ORDER BY id DESC");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { nombre, email, rol } = await request.json();
    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, email, rol) VALUES (?, ?, ?)",
      [nombre, email, rol || "Cliente"]
    );
    return NextResponse.json({ id: result.insertId, message: "Usuario creado" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
