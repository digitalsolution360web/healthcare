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
    `SELECT *
     FROM categories
     WHERE slug = ?
     LIMIT 1`,
    [slug]
  );

  return rows[0] ?? null;
}

async function getCityId(citySlug: string): Promise<number | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT city_id
     FROM citys
     WHERE city_slug = ?
     LIMIT 1`,
    [citySlug]
  );

  return rows.length > 0 ? Number(rows[0].city_id) : null;
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
      ? `${listing.name} in ${listing.city_name} - Doctors, Services & Reviews`
      : listing.category_name === "Hospitals"
        ? `${listing.name} in ${listing.city_name} - Departments, Services & Reviews`
        : `${listing.name}${listing.sub_category_name ? ` - ${listing.sub_category_name}` : ""}${listing.city_name ? ` in ${listing.city_name}` : ""} | Doclister`;

  const description =
    listing.meta_description ||
    `${listing.name}${listing.city_name ? ` in ${listing.city_name}` : ""}. Find address, phone number, services and other details.`;

  const image =
    listing.image?.startsWith("http")
      ? listing.image
      : listing.image
        ? `https://yourdomain.com${listing.image.startsWith("/") ? "" : "/"}${listing.image}`
        : "https://yourdomain.com/images/og-default.jpg";

  return {
    title: listing.meta_title || title,
    description,

    openGraph: {
      title: listing.meta_title || title,
      description,
      url: `https://yourdomain.com${listing.slug}`,
      siteName: "Doclister",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: listing.name,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: listing.meta_title || title,
      description,
      images: [image],
    },
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

    if (!categories) notFound();

    return <CategoryLayout data={categories} cityId={0} />;
  }
  // 3. Single Segment Logic (e.g., "/some-slug/some-slug")
  if (slugArray.length === 2) {
  const segment1 = slugArray[0];
  const segment2 = slugArray[1];
  const segment = `/${segment1}/${segment2}`;

  const [category, cityId] = await Promise.all([
      getCategory(segment1),
      getCityId(segment2),
    ]);
   
   if (category && cityId !== null) {

    const [listingRows] = await pool.query<RowDataPacket[]>(
      `SELECT id
       FROM listings
       WHERE category_id = ?
       AND city = ?
       LIMIT 1`,
      [category.id, cityId]
    );

    if (listingRows.length === 0) {
      notFound();
    }
      return <CategoryLayout data={category} cityId={cityId}/>;
    
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

