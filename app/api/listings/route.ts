// app/api/listings/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import type { RowDataPacket } from "mysql2";

/* ---------- ROW TYPE ---------- */

interface ListingRow extends RowDataPacket {
  id: number;
  category_id: number;
  name: string;
  about: string | null;
  state: string | null;
  city: string | null;
  area: string | null;
  address: string | null;
  image: string | null;
  slug: string | null;
}

/* ---------- GET ---------- */

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("category_id");
    const q = searchParams.get("q")?.trim() ?? "";
    const city = searchParams.get("city")?.trim() ?? "";
    const limit = Math.min(
      100,
      Math.max(1, Number(searchParams.get("limit") ?? 50))
    );
    const offset = Math.max(0, Number(searchParams.get("offset") ?? 0));

    if (!categoryId) {
      return NextResponse.json(
        { error: "category_id is required" },
        { status: 400 }
      );
    }

    const where: string[] = ["category_id = ?"];
    const params: any[] = [Number(categoryId)];

    if (q) {
      where.push("(name LIKE ? OR about LIKE ? OR address LIKE ?)");
      const like = `%${q}%`;
      params.push(like, like, like);
    }

    if (city) {
      where.push("city = ?");
      params.push(city);
    }

    params.push(limit, offset);

    const sql = `
      SELECT
        id,
        category_id,
        name,
        about,
        state,
        city,
        area,
        address,
        image,
        slug
      FROM listings
      WHERE ${where.join(" AND ")}
      ORDER BY id DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await pool.query<ListingRow[]>(sql, params);

    /* Normalize nulls → empty strings so the UI never renders "null" */
    const data = rows.map((r) => ({
      id: r.id,
      category_id: r.category_id,
      name: r.name ?? "",
      about: r.about ?? "",
      state: r.state ?? "",
      city: r.city ?? "",
      area: r.area ?? "",
      address: r.address ?? "",
      image: r.image ?? "/images/clinics/placeholder.jpg",
      slug: r.slug ?? String(r.id),
    }));

    return NextResponse.json(data, {
      headers: {
        // short cache + swr for snappy re-fetches
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
      },
    });
  } catch (err: any) {
    console.error("GET /api/listings error:", err);
    return NextResponse.json(
      { error: "Failed to load listings" },
      { status: 500 }
    );
  }
}