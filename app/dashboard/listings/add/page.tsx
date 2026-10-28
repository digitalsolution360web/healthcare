
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, Save } from "lucide-react";

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#6554e8] focus:ring-4 focus:ring-purple-100";

export default function AddListingPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link href="/dashboard/listings" className="inline-flex items-center gap-2 text-sm font-semibold text-[#6554e8]">
        <ArrowLeft size={17} /> Back to listings
      </Link>

      <div>
        <h1 className="text-3xl font-extrabold text-[#29235c]">Add Business Listing</h1>
        <p className="mt-2 text-sm text-slate-500">
          Add your healthcare practice or facility to Doclister.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMessage("Listings API is not connected yet. Your listing has not been saved.");
        }}
        className="space-y-7 rounded-3xl border border-[#ece8ff] bg-white p-5 sm:p-8"
      >
        <section>
          <h2 className="flex items-center gap-2 font-bold text-[#29235c]">
            <Building2 size={20} className="text-[#6554e8]" /> Business information
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Business / practice name *
              <input name="name" required placeholder="Enter business name" className={inputClass} />
            </label>

            <label className="text-sm font-semibold">
              Category *
              <select name="category" required defaultValue="" className={inputClass}>
                <option value="" disabled>Select category</option>
                <option value="doctor">Doctor</option>
                <option value="clinic">Clinic</option>
                <option value="hospital">Hospital</option>
                <option value="diagnostic">Diagnostic Centre</option>
              </select>
            </label>

            <label className="text-sm font-semibold">
              Speciality / services
              <input name="speciality" placeholder="e.g. Cardiology, Dental Care" className={inputClass} />
            </label>

            <label className="text-sm font-semibold">
              Website
              <input name="website" type="url" placeholder="https://example.com" className={inputClass} />
            </label>

            <label className="text-sm font-semibold">
              Contact phone *
              <input name="phone" type="tel" required placeholder="Business phone number" className={inputClass} />
            </label>

            <label className="text-sm font-semibold">
              Contact email
              <input name="email" type="email" placeholder="Business email" className={inputClass} />
            </label>

            <label className="text-sm font-semibold sm:col-span-2">
              Business description *
              <textarea name="description" required rows={4} placeholder="Describe your practice, services and facilities..." className={inputClass} />
            </label>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-6">
          <h2 className="font-bold text-[#29235c]">Business address</h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold sm:col-span-2">
              Street address *
              <input name="address" required placeholder="Building, street, area" className={inputClass} />
            </label>

            <label className="text-sm font-semibold">
              City *
              <input name="city" required placeholder="City" className={inputClass} />
            </label>

            <label className="text-sm font-semibold">
              State *
              <input name="state" required placeholder="State" className={inputClass} />
            </label>

            <label className="text-sm font-semibold">
              PIN code *
              <input name="pincode" required inputMode="numeric" pattern="[0-9]{6}" placeholder="6-digit PIN code" className={inputClass} />
            </label>

            <label className="text-sm font-semibold">
              Business hours
              <input name="hours" placeholder="e.g. Mon–Sat, 9 AM–6 PM" className={inputClass} />
            </label>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-6">
          <h2 className="font-bold text-[#29235c]">Business logo or photos</h2>
          <p className="mt-2 text-sm text-slate-500">
            Image upload can be connected to your server or file storage.
          </p>
          <input
            name="images"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            className="mt-4 block w-full rounded-xl border border-dashed border-[#c7bfff] bg-[#faf9ff] p-4 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-[#f0edff] file:px-4 file:py-2 file:font-semibold file:text-[#6554e8]"
          />
        </section>

        <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
          <input type="checkbox" name="accuracy" required className="mt-1 accent-[#6554e8]" />
          <span>I confirm that the business information provided is accurate and I am authorised to submit this listing.</span>
        </label>

        {message && (
          <p role="status" className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
            {message}
          </p>
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
          <Link href="/dashboard/listings" className="rounded-xl border border-slate-200 px-6 py-3 text-center text-sm font-semibold text-slate-600">
            Cancel
          </Link>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-6 py-3 font-bold text-white shadow-md shadow-purple-200">
            <Save size={18} /> Submit for Review
          </button>
        </div>
      </form>
    </div>
  );
}
