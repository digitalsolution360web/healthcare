"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function CategoryLayout({ data }: { data: Category }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">Categories</h1>
      <p className="text-gray-600 mb-6">Browse all categories.</p>

      {loading ? (
        <p>Loading categories...</p>
      ) : categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="border rounded-lg p-4 hover:shadow-sm transition"
            >
              <h2 className="font-medium">{category.name}</h2>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
