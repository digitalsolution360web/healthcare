import { notFound } from 'next/navigation';
import pool from '../../lib/db';
import type { RowDataPacket } from 'mysql2';
import CategoryLayout from "./categories";
import type { Metadata } from "next";
import ListingDetailLayout from "./listingDetails";

interface Category extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
}
interface Listing extends RowDataPacket {
  id: number | string;
  category_id: number;
  name: string;
  about: string;
  state: string;
  city: string;
  area: string;
  address: string;
  pincode: string;
  iframe: string;
  experience:number;
  fees:number;
  services: string[];
  degrees: string;
  image: string;
  phone: string;
  slug: string;
  state_name?: string | null;
  city_name?: string | null;
  area_name?: string | null;
  category_name?: string | null;
  category_slug?: string | null;
  sub_category_name?: string | null;
}

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

async function getCategory(slug: string) {
  const [rows] = await pool.query<Category[]>(
    `SELECT id, name, slug, meta_title, meta_description
     FROM categories
     WHERE slug = ?
     LIMIT 1`,
    [slug]
  );

  return rows[0] ?? null;
}
async function hasListingsInCity(cityId: number): Promise<boolean> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT 1
     FROM listings
     WHERE city = ?
     LIMIT 1`,
    [cityId]
  );

  return rows.length > 0;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];

  // Category page
  if (slugArray.length === 1) {
    const segment = slugArray[0];

    const category = await getCategory(segment);

    if (category) {

      return {
        title:
          category.meta_title ||
          `${category.name} - Find the Best ${category.name}`,
        description:
          category.meta_description ||
          `Find the best ${category.name}. View listings, contact details, location and more.`,
      };
    }
  }

  // Listing detail page
  if (slugArray.length === 2) {
    const segment1 = slugArray[0];
    const segment2 = slugArray[1];

    const slug = `/${segment1}/${segment2}`;

    const [listings] = await pool.query<Listing[]>(
  `SELECT 
     listings.*,
     cat.name AS category_name,
     subcat.name AS sub_category_name,
     c.city AS city_name
   FROM listings
   LEFT JOIN categories AS cat
     ON cat.id = listings.category_id
   LEFT JOIN sub_categories AS subcat
     ON subcat.id = listings.sub_category_id
   LEFT JOIN citys AS c
     ON c.city_id = listings.city
   WHERE listings.slug = ?
   LIMIT 1`,
  [slug]
);

    if (listings.length > 0) {
      const listing = listings[0];
      const title =
      listing.category_name === "Clinics"
        ? `${listing.name} in ${listing.city_name} - Doctors, Services & Reviews Hospital`
        : listing.category_name === "Hospitals"
          ? `${listing.name} in ${listing.city_name} - Doctors, Departments & Reviews Diagnostic Center`
          : `${listing.name} - ${listing.sub_category_name} in ${listing.city_name} | Doclister Clinic`;

      return {
        title:
          listing.meta_title || title,

        description:
          listing.meta_description ||
          `${listing.name}${listing.city_name ? ` in ${listing.city_name}` : ""}. Find address, phone number, services and other details.`,
      };
    }
  }

  return {
    title: "Doclister | Healthcare Directory & Medical Providers",
    description: "Find healthcare providers, medical professionals, and healthcare services with Doclister. Explore healthcare listings and find the information you need.",
  };
}
export default async function CatchAllPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];

  // 1. Root Directory Handling (e.g., "/")
  // if (slugArray.length === 0) {
  //   return <HomeLayout />;
  // }

  // 2. Single Segment Logic (e.g., "/some-slug")
  if (slugArray.length === 1) {
    const segment = slugArray[0];

   const categories = await getCategory(segment);

    if (categories.length > 0) {
      return <CategoryLayout data={categories} cityId={0} />;
    }
    
    // Fallback if no resource matches the single segment
    notFound();
  }
  // 3. Single Segment Logic (e.g., "/some-slug/some-slug")
  if (slugArray.length === 2) {
  const segment1 = slugArray[0];
  const segment2 = slugArray[1];
  const segment = `/${segment1}/${segment2}`;

  const [cityRows] = await pool.query<RowDataPacket[]>(
    `SELECT city_id
     FROM citys
     WHERE city_slug = ?
     LIMIT 1`,
    [segment2]
  );

  const categories = await getCategory(segment1);

  if (cityRows.length > 0 && categories.length > 0) {
    const cityId = cityRows[0].city_id;
    const exists = await hasListingsInCity(cityId);

    if (exists) {
      return <CategoryLayout data={categories} cityId={cityId}/>;
    }
  }
  const [listing] = await pool.query<Listing[]>(
    `SELECT *
     FROM listings
     WHERE slug = ?
     LIMIT 1`,
    [segment]
  );
 
  if (listing.length > 0) {
    return <ListingDetailLayout data={listing[0]} />;
  }

  notFound();
}

 
  notFound();
}

