import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim();

  if (q.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const [rows] = await pool.query(
      `SELECT DISTINCT pincode
       FROM listings
       WHERE pincode IS NOT NULL
         AND CAST(pincode AS CHAR) LIKE ?
       ORDER BY pincode
       LIMIT 10`,
      [`${q}%`]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Pincode suggestions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch pincodes" },
      { status: 500 }
    );
  }
}