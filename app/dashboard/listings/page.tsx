
"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, Search, Building2, Pencil, Trash2 } from "lucide-react";

type Listing = {
  id: number;
  name: string;
  category: string;
  city: string;
  status: "Published" | "Pending" | "Rejected";
};

const initialListings: Listing[] = [];

export default function ListingsPage() {
  const [listings, setListings] = useState(initialListings);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = listings.filter((item) =>
    `${item.name} ${item.category} ${item.city}`.toLowerCase().includes(search.toLowerCase()) &&
    (status === "All" || item.status === status)
  );

  function deleteListing(id: number) {
    if (window.confirm("Delete this listing from the current demo view?")) {
      setListings((items) => items.filter((item) => item.id !== id));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-[#29235c]">My Listings</h1>
          <p className="mt-2 text-sm text-slate-500">View and manage your healthcare businesses.</p>
        </div>
        <Link href="/dashboard/listings/add" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-5 py-3 font-bold text-white">
          <Plus size={18} /> Add Listing
        </Link>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-[#ece8ff] bg-white p-4 sm:flex-row">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by business name, category or city" className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#6554e8]" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#6554e8]">
          <option>All</option>
          <option>Published</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#ece8ff] bg-white">
        <div className="border-b border-slate-100 px-5 py-4 font-bold text-[#29235c]">
          All listings ({filtered.length})
        </div>

        {filtered.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <Building2 className="mx-auto text-[#a69be9]" size={42} />
            <h2 className="mt-4 text-lg font-bold text-[#29235c]">No listings found</h2>
            <p className="mt-2 text-sm text-slate-500">Add your first healthcare business to get started.</p>
            <Link href="/dashboard/listings/add" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#4e44e1] px-5 py-3 font-bold text-white">
              <Plus size={18} /> Add your first listing
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-[#faf9ff] text-slate-500">
                <tr>
                  <th className="px-5 py-4">Business</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">City</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td className="px-5 py-4 font-semibold">{item.name}</td>
                    <td className="px-5 py-4">{item.category}</td>
                    <td className="px-5 py-4">{item.city}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                        item.status === "Published" ? "bg-emerald-50 text-emerald-700" :
                        item.status === "Pending" ? "bg-amber-50 text-amber-700" :
                        "bg-rose-50 text-rose-700"
                      }`}>{item.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-3">
                        <Link href={`/dashboard/listings/add?id=${item.id}`} aria-label="Edit listing" className="text-[#6554e8]"><Pencil size={18} /></Link>
                        <button onClick={() => deleteListing(item.id)} aria-label="Delete listing" className="text-rose-500"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs leading-5 text-slate-400">
        This page currently uses an empty in-memory demo list. Connect the listings API and database before using it with real accounts.
      </p>
    </div>
  );
}
