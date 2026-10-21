import { notFound } from 'next/navigation';
import pool from '@/lib/db';
import type { RowDataPacket } from 'mysql2';
import CategoryLayout from "./categories";

interface Category extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
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

 
  notFound();
}
