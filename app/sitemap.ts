import type { MetadataRoute } from "next";
import pool from "@/lib/db";
import type { RowDataPacket } from "mysql2";

const SITE_URL = "https://www.doclister.com";

interface CategoryRow extends RowDataPacket {
  slug: string;
}

interface ListingRow extends RowDataPacket {
  slug: string | null;
  updated_at?: Date | string | null;
}

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [categories] = await pool.query<CategoryRow[]>(`
      SELECT slug
      FROM categories
      WHERE slug IS NOT NULL AND slug != ''
    `);

    const [listings] = await pool.query<ListingRow[]>(`
      SELECT slug, updated_at
      FROM listings
      WHERE slug IS NOT NULL
        AND slug != ''
        AND status = 'active'
      ORDER BY id DESC
    `);

    const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
      url: `${SITE_URL}/${category.slug.replace(/^\/+|\/+$/g, "")}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const listingUrls: MetadataRoute.Sitemap = listings.map((listing) => ({
      url: `${SITE_URL}/${listing.slug!.replace(/^\/+/, "")}`,
      lastModified: listing.updated_at
        ? new Date(listing.updated_at)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [
      {
        url: SITE_URL,
        changeFrequency: "daily",
        priority: 1,
      },
      ...categoryUrls,
      ...listingUrls,
    ];
  } catch (error) {
    console.error("Sitemap generation failed:", error);
    throw error;
  }
}