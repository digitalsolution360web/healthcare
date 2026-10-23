
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import type { RowDataPacket } from "mysql2";

interface ListingRow extends RowDataPacket {
  id: number;
  category_id: number;
  name: string;
  about: string | null;
  state: string | null;
  city: string | null;
  area: string | null;
  address: string | null;
  experience:number | null;
  fees:number | null;
  degrees:string | null;
  phone: string | null;
  image: string | null;
  slug: string | null;
  state_name: string | null;
  city_name: string | null;
  area_name: string | null;
  category_name: string | null;
  category_slug: string | null;
  sub_category_name: string | null;
}

const SELECT_FIELDS = `
  listings.id,
  listings.category_id,
  listings.name,
  listings.about,
  listings.state,
  listings.city,
  listings.area,
  listings.phone,
  listings.experience,
  listings.fees,
  listings.degrees,
  listings.address,
  listings.image,
  listings.slug,
  s.name AS state_name,
  c.city AS city_name,
  m.metrocity AS area_name,
  cat.name AS category_name,
  cat.slug AS category_slug,
  subcat.name AS sub_category_name
`;

const JOINS = `
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
`;

function formatListing(r: ListingRow) {
  return {
    id: r.id,
    category_id: r.category_id,
    name: r.name ?? "",
    about: r.about ?? "",
    experience:r.experience ?? "",
    fees:r.fees ?? "",
    degrees:r.degrees ?? "",
    state: r.state ?? "",
    city: r.city ?? "",
    area: r.area ?? "",
    address: r.address ?? "",
    phone: r.phone ?? "",
    image: r.image || "/images/clinics/placeholder.jpg",
    slug: r.slug ?? String(r.id),
    state_name: r.state_name ?? "",
    city_name: r.city_name ?? "",
    area_name: r.area_name ?? "",
    category_name: r.category_name ?? "",
    category_slug: r.category_slug ?? "",
    sub_category_name: r.sub_category_name ?? "",
  };
}

async function getDegreeNames(degrees: string | null) {
  if (!degrees) return "";

  const degreeIds = degrees
    .split(",")
    .map((id) => Number(id.trim()))
    .filter((id) => Number.isInteger(id) && id > 0);

  if (degreeIds.length === 0) return "";

  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT id, name
     FROM degrees
     WHERE id IN (?)`,
    [degreeIds]
  );

  const degreeMap = new Map(
    rows.map((row) => [Number(row.id), row.name])
  );

  return degreeIds
    .map((id) => degreeMap.get(id))
    .filter(Boolean)
    .join(", ");
}


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const categoryId = searchParams.get("category_id");
    const slug = searchParams.get("slug")?.trim() ?? "";
    const q = searchParams.get("q")?.trim() ?? "";
    const city = searchParams.get("city")?.trim() ?? "";

    // GET /api/listings?slug=bliss-32-dental-implant-centre-mumbai
    if (slug) {
      const [rows] = await pool.query<ListingRow[]>(
        `SELECT ${SELECT_FIELDS}
         ${JOINS}
         WHERE listings.slug = ?
         LIMIT 1`,
        [slug]
      );

      if (rows.length === 0) {
        return NextResponse.json(
          { error: "Listing not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(formatListing(rows[0]), {
        headers: {
          "Cache-Control":
            "public, s-maxage=30, stale-while-revalidate=120",
        },
      });
    }

    const limit = Math.min(
      100,
      Math.max(1, Number(searchParams.get("limit") ?? 50))
    );

    const offset = Math.max(
      0,
      Number(searchParams.get("offset") ?? 0)
    );

    if (
      !categoryId ||
      !Number.isInteger(Number(categoryId)) ||
      Number(categoryId) <= 0
    ) {
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
      SELECT ${SELECT_FIELDS}
      ${JOINS}
      WHERE ${where.join(" AND ")}
      ORDER BY listings.id DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await pool.query<ListingRow[]>(sql, params);
    const data = await Promise.all(
      rows.map(async (row) => ({
        ...formatListing(row),
        degrees: await getDegreeNames(row.degrees),
      }))
    );

    return NextResponse.json(data, {
      headers: {
        "Cache-Control":
          "public, s-maxage=30, stale-while-revalidate=120",
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
