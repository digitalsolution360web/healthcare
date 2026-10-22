import { notFound } from 'next/navigation';
import pool from '../../lib/db';
import type { RowDataPacket } from 'mysql2';
import CategoryLayout from "./categories";
import ListingDetailLayout from "./listingDetails";

interface Category extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
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
  image: string;
  slug: string;
  state_name?: string | null;
  city_name?: string | null;
  area_name?: string | null;
  category_name?: string | null;
  sub_category_name?: string | null;
}

interface PageProps {
  params: Promise<{ slug?: string[] }>;
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

   const [categories] = await pool.query<Category[]>(
  'SELECT * FROM categories WHERE slug = ? LIMIT 1',
  [segment]
    );
    if (categories.length > 0) {
      return <CategoryLayout data={categories[0]} />;
    }
    
    // Fallback if no resource matches the single segment
    notFound();
  }
  // 3. Single Segment Logic (e.g., "/some-slug/some-slug")
  if (slugArray.length === 2) {
    const segment1 = slugArray[0];
    const segment2 = slugArray[1];
    const segment = `/${segment1}/${segment2}`;

   const [listing] = await pool.query<Listing[]>(
  'SELECT * FROM listings WHERE slug = ? LIMIT 1',
  [segment]
    );
    
    if (listing.length > 0) {
      return <ListingDetailLayout data={listing[0]} />;
    }
    
    // Fallback if no resource matches the single segment
    notFound();
  }

 
  notFound();
}

