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

    const offset = Math.max(
      0,
      Number(searchParams.get("offset") ?? 0)
    );

    if (!categoryId || !Number.isInteger(Number(categoryId)) || Number(categoryId) <= 0) {
      return NextResponse.json(
        { error: "A valid category_id is required" },
        { status: 400 }
      );
    }

    const where: string[] = ["listings.category_id = ?"];
    const params: (string | number)[] = [Number(categoryId)];

    if (q) {
      where.push(
        "(listings.name LIKE ? OR listings.about LIKE ? OR listings.address LIKE ?)"
      );

      const like = `%${q}%`;
      params.push(like, like, like);
    }

    if (city) {
      where.push("listings.city = ?");
      params.push(city);
    }

    params.push(limit, offset);

    const sql = `
      SELECT
        filtered.id,
        filtered.category_id,
        filtered.name,
        filtered.about,
        filtered.state,
        filtered.city,
        filtered.area,
        filtered.address,
        filtered.image,
        filtered.slug,
        filtered.state_name,
        filtered.city_name,
        filtered.area_name,
        filtered.category_name,
        filtered.sub_category_name
      FROM (
        SELECT
          listings.id,
          listings.category_id,
          listings.name,
          listings.about,
          listings.state,
          listings.city,
          listings.area,
          listings.address,
          listings.image,
          listings.slug,
          s.name AS state_name,
          c.city AS city_name,
          m.metrocity AS area_name,
          cat.name AS category_name,
          subcat.name AS sub_category_name
        FROM listings
        LEFT JOIN states AS s
          ON s.state_id = listings.state
        LEFT JOIN citys AS c
          ON c.city_id = listings.city
        LEFT JOIN metrocitys AS m
          ON m.metrocity_id = listings.area
        LEFT JOIN categories AS cat
          ON cat.id = listings.category_id
        LEFT JOIN sub_categories AS subcat
          ON subcat.id = listings.sub_category_id
        WHERE ${where.join(" AND ")}
        ORDER BY listings.id DESC
        LIMIT ? OFFSET ?
      ) AS filtered
      ORDER BY filtered.id DESC
    `;

    const [rows] = await pool.query<ListingRow[]>(sql, params);

    const data = rows.map((r) => ({
      id: r.id,
      category_id: r.category_id,
      name: r.name ?? "",
      about: r.about ?? "",
      state: r.state ?? "",
      city: r.city ?? "",
      area: r.area ?? "",
      address: r.address ?? "",
      image: r.image || "/images/clinics/placeholder.jpg",
      slug: r.slug ?? String(r.id),
      state_name: r.state_name ?? "",
      city_name: r.city_name ?? "",
      area_name: r.area_name ?? "",
      category_name: r.category_name ?? "",
      sub_category_name: r.sub_category_name ?? "",
    }));

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
      },
    });
  } catch (err: unknown) {
    console.error("GET /api/listings error:", err);

    return NextResponse.json(
      { error: "Failed to load listings" },
      { status: 500 }
    );
  }
}