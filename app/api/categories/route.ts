
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import type { RowDataPacket } from "mysql2";

interface Category extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
}

export async function GET() {
  try {
    const [categories] = await pool.query<Category[]>(
      `SELECT id, name, slug
       FROM categories
       ORDER BY name ASC`
    );

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Categories API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
