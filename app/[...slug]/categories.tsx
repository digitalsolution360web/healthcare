"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Home,
  Search,
  MapPin,
  ChevronDown,
  SlidersHorizontal,
  Building2,
  Star,
  ArrowRight,
  X,
  Clock3,
  CalendarDays,
  CheckCircle2,
  Stethoscope,
  HeartPulse,
  AlertTriangle,
} from "lucide-react";

/* =========================================
   TYPES
========================================= */

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Listing {
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

/* Listing + static dummy display fields */
type DisplayListing = Listing & {
  rating: number;
  reviews: number;
  consultationModes: string[];
  openingHours: string;
  available: boolean;
  popular: number;
};

/* =========================================
   API + SEO
========================================= */

const LISTINGS_ENDPOINT = "/api/listings";

const PAGE_TITLE = "Find Clinics Near You | HealthCare360";

const PAGE_DESCRIPTION =
  "Find and explore trusted clinics near you. Compare clinic specialties, ratings, locations and consultation options on HealthCare360.";

/* =========================================
   NORMALIZER
========================================= */

function normalizeListing(raw: Record<string, any>): DisplayListing {
  const id = raw.id ?? 0;
  const numericId = typeof id === "number" ? id : Number(id) || 0;

  return {
    id,
    category_id: raw.category_id ?? 0,
    name: raw.name ?? "Untitled Listing",
    about: raw.about ?? "",
    state: raw.state ?? "",
    city: raw.city ?? "",
    area: raw.area ?? "",
    address: raw.address ?? "",
    image: raw.image ?? "/images/clinics/placeholder.jpg",
    slug: raw.slug ?? String(id),
    state_name: raw.state_name ?? "",
    city_name: raw.city_name ?? "",
    area_name: raw.area_name ?? "",
    category_name: raw.category_name ?? "",
    sub_category_name: raw.sub_category_name ?? "",

    /* ---------- STATIC DUMMY ---------- */
    rating: 4.5 + (numericId % 5) * 0.1,
    reviews: 50 + (numericId % 10) * 10,
    consultationModes: ["In-Clinic"],
    openingHours: "9:00 AM - 8:00 PM",
    available: true,
    popular: 50 + (numericId % 10) * 5,
  };
}

/* =========================================
   LOADING SKELETON
========================================= */

function ClinicCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-[#ebe8f4] bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        <div className="h-[190px] w-full shrink-0 rounded-xl bg-[#f1eef9] sm:h-[145px] sm:w-[150px] lg:h-[150px] lg:w-[155px]" />
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="h-5 w-2/3 rounded-md bg-[#f1eef9]" />
            <div className="h-6 w-16 rounded-full bg-[#f6f4fc]" />
          </div>
          <div className="h-4 w-1/2 rounded-md bg-[#f6f4fc]" />
          <div className="h-6 w-32 rounded-lg bg-[#f1eef9]" />
          <div className="h-4 w-40 rounded-md bg-[#f6f4fc]" />
          <div className="h-4 w-3/4 rounded-md bg-[#f6f4fc]" />
          <div className="h-4 w-1/2 rounded-md bg-[#f6f4fc]" />
        </div>
      </div>
      <div className="my-4 border-t border-[#f0edf7]" />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-4">
          <div className="h-4 w-28 rounded-md bg-[#f6f4fc]" />
          <div className="h-4 w-32 rounded-md bg-[#f6f4fc]" />
        </div>
        <div className="flex flex-wrap gap-2.5">
          <div className="h-[42px] w-[110px] rounded-lg bg-[#f1eef9]" />
          <div className="h-[42px] w-[150px] rounded-lg bg-[#f1eef9]" />
        </div>
      </div>
    </div>
  );
}

function ListingSkeletonList() {
  return (
    <div className="mt-4 space-y-4" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading clinics…</span>
      {Array.from({ length: 3 }).map((_, i) => (
        <ClinicCardSkeleton key={i} />
      ))}
    </div>
  );
}

/* =========================================
   PAGE
========================================= */

export default function CategoryLayout({ data }: { data: Category }) {
  const [listings, setListings] = useState<DisplayListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [rating, setRating] = useState("all");
  const [consultationMode, setConsultationMode] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /* =========================================
     FETCH LISTINGS BY CATEGORY_ID
  ========================================= */

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`${LISTINGS_ENDPOINT}?category_id=${encodeURIComponent(data.id)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load listings");
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        const rows: Record<string, any>[] = Array.isArray(json)
          ? json
          : json?.data ?? json?.listings ?? json?.results ?? [];
        setListings(rows.map(normalizeListing));
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [data.id, refreshKey]);

  /* =========================================
     SEO
  ========================================= */

  useEffect(() => {
    document.title = PAGE_TITLE;

    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.name = "description";
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.content = PAGE_DESCRIPTION;
  }, []);

  /* =========================================
     DYNAMIC OPTIONS
  ========================================= */

  const locationOptions = useMemo(() => {
    const set = new Set<string>();
    listings.forEach((l) => {
      if (l.city) set.add(l.city);
    });
    return ["All Locations", ...Array.from(set)];
  }, [listings]);

  const specialtyOptions = useMemo(
    () => (data.name ? [data.name] : []),
    [data.name]
  );

  /* =========================================
     HANDLERS
  ========================================= */

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((item) => item !== specialty)
        : [...prev, specialty]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setLocation("All Locations");
    setSelectedSpecialties([]);
    setRating("all");
    setConsultationMode("all");
    setSortBy("popular");
  };

  /* =========================================
     FILTER & SORT
  ========================================= */

  const filteredListings = useMemo(() => {
    const query = search.toLowerCase().trim();

    let result = listings.filter((c) => {
      const fullLocation = [c.area, c.city, c.state]
        .filter(Boolean)
        .join(", ");

      const matchesSearch =
        !query ||
        c.name.toLowerCase().includes(query) ||
        c.about.toLowerCase().includes(query) ||
        fullLocation.toLowerCase().includes(query) ||
        c.address.toLowerCase().includes(query);

      const matchesLocation =
        location === "All Locations" || c.city === location;

      const matchesSpecialty =
        selectedSpecialties.length === 0 ||
        selectedSpecialties.includes(data.name);

      const matchesRating =
        rating === "all" ||
        (rating === "4+" && c.rating >= 4) ||
        (rating === "4.5+" && c.rating >= 4.5) ||
        (rating === "4.8+" && c.rating >= 4.8);

      const matchesConsultation =
        consultationMode === "all" ||
        c.consultationModes.includes(consultationMode);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesSpecialty &&
        matchesRating &&
        matchesConsultation
      );
    });

    if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "reviews") {
      result = [...result].sort((a, b) => b.reviews - a.reviews);
    } else if (sortBy === "popular") {
      result = [...result].sort((a, b) => b.popular - a.popular);
    }

    return result;
  }, [
    listings,
    search,
    location,
    selectedSpecialties,
    rating,
    consultationMode,
    sortBy,
    data.name,
  ]);

  /* =========================================
     FILTER SIDEBAR
  ========================================= */

  const FilterContent = () => (
    <>
      <div className="flex h-[60px] items-center justify-between border-b border-[#ebe8f4] px-5">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal size={18} className="text-[#4e44e1]" />
          <h2 className="text-[16px] font-bold text-[#17152b]">Filters</h2>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="text-[13px] font-semibold text-[#4e44e1] transition hover:text-[#9122b4]"
        >
          Clear All
        </button>
      </div>

      {/* LOCATION */}
      <div className="border-b border-[#f0edf7] px-5 py-5">
        <label
          htmlFor="clinic-location-filter"
          className="mb-3 block text-[14px] font-bold text-[#24213a]"
        >
          Location
        </label>

        <div className="relative">
          <select
            id="clinic-location-filter"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-[44px] w-full appearance-none rounded-lg border border-[#ddd9ee] bg-white px-3 pr-9 text-[14px] text-[#4B5568] outline-none transition focus:border-[#7767e8] focus:ring-2 focus:ring-[#4e44e1]/10"
          >
            {locationOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#77718f]"
          />
        </div>
      </div>

      {/* SPECIALTY */}
      <div className="border-b border-[#f0edf7] px-5 py-5">
        <h3 className="mb-4 text-[14px] font-bold text-[#24213a]">Specialty</h3>

        <div className="space-y-3">
          {specialtyOptions.map((specialty) => (
            <label
              key={specialty}
              className="flex cursor-pointer items-center gap-3 text-[14px] text-[#4B5568] transition hover:text-[#4e44e1]"
            >
              <input
                type="checkbox"
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => toggleSpecialty(specialty)}
                className="h-4 w-4 shrink-0 cursor-pointer accent-[#4e44e1]"
              />
              <span>{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      {/* RATING */}
      <div className="border-b border-[#f0edf7] px-5 py-5">
        <h3 className="mb-4 text-[14px] font-bold text-[#24213a]">Rating</h3>

        <div className="space-y-3">
          {[
            { label: "Any Rating", value: "all" },
            { label: "4+ Stars", value: "4+" },
            { label: "4.5+ Stars", value: "4.5+" },
            { label: "4.8+ Stars", value: "4.8+" },
          ].map((item) => (
            <label
              key={item.value}
              className="flex cursor-pointer items-center gap-3 text-[14px] text-[#4B5568] transition hover:text-[#4e44e1]"
            >
              <input
                type="radio"
                name="clinic-rating"
                value={item.value}
                checked={rating === item.value}
                onChange={() => setRating(item.value)}
                className="h-4 w-4 cursor-pointer accent-[#4e44e1]"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* CONSULTATION MODE */}
      <div className="px-5 py-5">
        <h3 className="mb-4 text-[14px] font-bold text-[#24213a]">
          Consultation Mode
        </h3>

        <div className="space-y-3">
          {[
            { label: "All Modes", value: "all" },
            { label: "In-Clinic", value: "In-Clinic" },
            { label: "Online", value: "Online" },
          ].map((item) => (
            <label
              key={item.value}
              className="flex cursor-pointer items-center gap-3 text-[14px] text-[#4B5568] transition hover:text-[#4e44e1]"
            >
              <input
                type="radio"
                name="consultation-mode"
                value={item.value}
                checked={consultationMode === item.value}
                onChange={() => setConsultationMode(item.value)}
                className="h-4 w-4 cursor-pointer accent-[#4e44e1]"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  /* =========================================
     RENDER
  ========================================= */

  return (
    <main className="min-h-screen bg-white text-[#17152b]">
      {/* PAGE HEADER */}
      <section className="relative isolate overflow-hidden border-b border-[#ebe8f4] bg-gradient-to-br from-[#f5f3ff] via-[#fbfaff] to-[#f9f0ff] px-5 py-8 sm:px-8 sm:py-9 lg:px-[5.25%] lg:py-10">
        <div className="pointer-events-none absolute -left-24 -top-28 h-72 w-72 rounded-full bg-[#4e44e1]/10 blur-[90px]" />
        <div className="pointer-events-none absolute -right-20 -bottom-36 h-80 w-80 rounded-full bg-[#9122b4]/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          {/* BREADCRUMB */}
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex items-center gap-3 text-[14px] font-medium"
          >
            <Link
              href="/"
              aria-label="Home"
              className="text-[#4e44e1] transition hover:text-[#9122b4]"
            >
              <Home size={18} />
            </Link>

            <span className="text-[#a29bb9]">/</span>

            <span className="text-[#4B5568]">{data?.name ?? "Clinics"}</span>
          </nav>

          {/* TITLE */}
          <div className="flex items-center justify-between gap-5">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#6d5be7]">
                Find the right care
              </p>

              <h1 className="text-[30px] font-extrabold leading-tight tracking-[-0.7px] text-[#17152b] sm:text-[36px] lg:text-[40px]">
                {data?.name ?? "Clinics"} Near You
              </h1>

              <p className="mt-2 max-w-2xl text-[15px] font-medium leading-7 text-[#4B5568] sm:text-[17px]">
                Find and book appointments at trusted clinics near you.
              </p>
            </div>

            <div className="hidden h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl border border-[#e4def8] bg-white/80 text-[#4e44e1] shadow-sm sm:flex">
              <Building2 size={29} strokeWidth={2} />
            </div>
          </div>

          {/* SEARCH FORM */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_205px_125px] lg:grid-cols-[minmax(0,1fr)_220px_130px] lg:gap-4"
          >
            <div className="flex h-[52px] min-w-0 items-center gap-3 rounded-xl border border-[#e1ddef] bg-white/95 px-4 shadow-sm transition focus-within:border-[#7767e8] focus-within:ring-4 focus-within:ring-[#4e44e1]/10">
              <Search size={19} className="shrink-0 text-[#77718f]" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search clinic name..."
                aria-label="Search clinics"
                className="h-full w-full min-w-0 bg-transparent text-[15px] font-medium text-[#17152b] outline-none placeholder:font-normal placeholder:text-[#9691a8]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="shrink-0 text-[#77718f] transition hover:text-[#4e44e1]"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="relative flex h-[52px] min-w-0 items-center gap-3 rounded-xl border border-[#e1ddef] bg-white/95 px-4 shadow-sm transition focus-within:border-[#7767e8] focus-within:ring-4 focus-within:ring-[#4e44e1]/10">
              <MapPin size={18} className="shrink-0 text-[#6d5be7]" />

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                aria-label="Filter clinics by location"
                className="h-full w-full min-w-0 appearance-none bg-transparent pr-5 text-[14px] font-medium text-[#4B5568] outline-none"
              >
                {locationOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-3 text-[#77718f]"
              />
            </div>

            <button
              type="submit"
              className="flex h-[52px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-5 text-[14px] font-bold text-white shadow-md shadow-[#4e44e1]/15 transition duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4e44e1] focus-visible:ring-offset-2"
            >
              <Search size={17} strokeWidth={2.5} />
              Search
            </button>
          </form>
        </div>
      </section>

      {/* CLINIC LISTING */}
      <section className="bg-white px-5 py-7 sm:px-8 sm:py-9 lg:px-[5.25%] lg:py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-5 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
          {/* MOBILE FILTER BUTTON */}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            aria-expanded={mobileFiltersOpen}
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#ebe8f4] bg-white text-[14px] font-semibold text-[#4B5568] transition hover:border-[#cfc8f0] hover:bg-[#faf9ff] lg:hidden"
          >
            <SlidersHorizontal size={18} className="text-[#4e44e1]" />
            {mobileFiltersOpen ? "Hide Filters" : "Show Filters"}
            <ChevronDown
              size={17}
              className={`transition-transform ${
                mobileFiltersOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* SIDEBAR */}
          <aside
            className={`overflow-hidden rounded-2xl border border-[#ebe8f4] bg-white shadow-[0_4px_20px_rgba(54,39,112,0.035)] ${
              mobileFiltersOpen ? "block" : "hidden"
            } lg:block`}
          >
            <FilterContent />
          </aside>

          {/* RIGHT CONTENT */}
          <div className="min-w-0">
            {loading ? (
              <ListingSkeletonList />
            ) : error ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#f5c2c2] bg-[#fff7f7] px-5 text-center">
                <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#f5c2c2] bg-[#ffecec] text-[#b91c1c]">
                  <AlertTriangle size={25} />
                </div>
                <h3 className="mt-5 text-[20px] font-bold text-[#17152b]">
                  Couldn’t load clinics
                </h3>
                <p className="mt-2 max-w-md text-[14px] leading-6 text-[#77718f]">
                  {error}. Please try again.
                </p>
                <button
                  type="button"
                  onClick={() => setRefreshKey((k) => k + 1)}
                  className="mt-5 inline-flex h-[44px] items-center justify-center rounded-lg bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-6 text-[14px] font-semibold text-white shadow-sm transition hover:brightness-110"
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                {/* TOOLBAR */}
                <div className="flex min-h-[60px] flex-wrap items-center justify-between gap-3 border-b border-[#ebe8f4] bg-white px-1 py-3">
                  <p className="text-[14px] text-[#6b6880]">
                    Showing{" "}
                    <span className="font-bold text-[#17152b]">
                      {filteredListings.length}
                    </span>{" "}
                    clinics
                  </p>

                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="sort-clinics"
                      className="whitespace-nowrap text-[13px] font-medium text-[#77718f]"
                    >
                      Sort by:
                    </label>

                    <div className="relative">
                      <select
                        id="sort-clinics"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="h-10 min-w-[140px] appearance-none rounded-lg border border-[#e1ddef] bg-white px-3 pr-9 text-[13px] font-medium text-[#4B5568] outline-none transition focus:border-[#7767e8] focus:ring-2 focus:ring-[#4e44e1]/10"
                      >
                        <option value="popular">Popularity</option>
                        <option value="rating">Highest Rated</option>
                        <option value="reviews">Most Reviewed</option>
                      </select>

                      <ChevronDown
                        size={15}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#77718f]"
                      />
                    </div>
                  </div>
                </div>

                {/* CARDS */}
                <div className="mt-4 space-y-4">
                  {filteredListings.map((clinic) => {
                    const fullLocation = [
                      clinic.area_name,
                      clinic.city_name,
                      clinic.state_name,
                    ]
                      .filter(Boolean)
                      .join(", ");

                    return (
                      <article
                        key={clinic.id}
                        className="group rounded-2xl border border-[#ebe8f4] bg-white p-4 transition duration-200 hover:border-[#cfc8f0] hover:shadow-[0_8px_28px_rgba(78,68,225,0.07)] sm:p-5"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                          <Link
                            href={`/clinics/${clinic.slug}`}
                            aria-label={`View ${clinic.name} profile`}
                            className="relative h-[190px] w-full shrink-0 overflow-hidden rounded-xl border border-[#ebe8f4] bg-[#f5f3fa] sm:h-[145px] sm:w-[150px] lg:h-[150px] lg:w-[155px]"
                          >
                            <Image
                              src={clinic.image || "/images/clinics/placeholder.jpg"}
                              alt={clinic.name}
                              fill
                              sizes="(max-width: 640px) 100vw, 155px"
                              className="object-cover transition duration-500 group-hover:scale-[1.04]"
                            />
                          </Link>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                              <div className="min-w-0">
                                <h2 className="text-[19px] font-bold leading-[27px] tracking-[-0.25px] text-[#17152b] transition group-hover:text-[#4e44e1] sm:text-[20px]">
                                 {clinic.name}
                                </h2>

                                {clinic.sub_category_name && (
                                  <p className="mt-1 text-[14px] font-medium text-[#6b6880]">
                                    {clinic.sub_category_name}
                                  </p>
                                )}
                              </div>

                              {clinic.available ? (
                                <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-3 py-1.5 text-[12px] font-semibold text-[#166534]">
                                  <CheckCircle2 size={14} />
                                  Open
                                </span>
                              ) : (
                                <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-[#e8e5ef] bg-[#f8f7fb] px-3 py-1.5 text-[12px] font-semibold text-[#77718f]">
                                  <Clock3 size={14} />
                                  Check Hours
                                </span>
                              )}
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#e6e0ff] bg-[#f5f3ff] px-2.5 py-1.5 text-[12px] font-semibold text-[#4e44e1]">
                                <Stethoscope size={14} />
                                {data.name}
                              </span>

                              {clinic.consultationModes.includes("Online") && (
                                <span className="rounded-lg border border-[#ebe8f4] bg-white px-2.5 py-1.5 text-[12px] font-medium text-[#6b6880]">
                                  Online Consultation
                                </span>
                              )}
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
                              <div className="flex items-center gap-1.5">
                                <Star
                                  size={16}
                                  fill="#fbbf24"
                                  stroke="#d99a06"
                                />
                                <span className="text-[14px] font-bold text-[#24213a]">
                                  {clinic.rating.toFixed(1)}
                                </span>
                              </div>
                              <span className="text-[13px] text-[#858098]">
                                ({clinic.reviews} reviews)
                              </span>
                            </div>

                            {(fullLocation || clinic.address) && (
                              <div className="mt-3 flex items-start gap-2 text-[13px] leading-5 text-[#6b6880]">
                                <MapPin
                                  size={16}
                                  className="mt-0.5 shrink-0 text-[#6d5be7]"
                                />
                                <span>{fullLocation || clinic.address}</span>
                              </div>
                            )}

                            {clinic.openingHours && (
                              <div className="mt-2 flex items-center gap-2 text-[13px] leading-5 text-[#6b6880]">
                                <Clock3
                                  size={16}
                                  className="shrink-0 text-[#6d5be7]"
                                />
                                <span>{clinic.openingHours}</span>
                              </div>
                            )}

                            <Link
                              href={`/clinics/${clinic.slug}`}
                              className="group/link mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#4e44e1] transition hover:text-[#9122b4]"
                            >
                              View Clinic Profile
                              <ArrowRight
                                size={15}
                                className="transition-transform group-hover/link:translate-x-1"
                              />
                            </Link>
                          </div>
                        </div>

                        <div className="my-4 border-t border-[#f0edf7]" />

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            <div className="flex items-center gap-2 text-[13px] text-[#6b6880]">
                              <HeartPulse
                                size={16}
                                className="text-[#6d5be7]"
                              />
                              <span>{data.name} Clinic</span>
                            </div>

                            <span className="hidden h-4 w-px bg-[#e7e2f1] sm:block" />

                            <div className="flex items-center gap-2 text-[13px] text-[#6b6880]">
                              <CalendarDays
                                size={16}
                                className="text-[#6d5be7]"
                              />
                              <span>Appointment Available</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2.5">
                            <Link
                              href={`/clinics/${clinic.slug}`}
                              className="inline-flex h-[42px] flex-1 items-center justify-center rounded-lg border border-[#d9d3f2] px-4 text-[13px] font-semibold text-[#4e44e1] transition hover:border-[#4e44e1] hover:bg-[#f5f3ff] sm:flex-none"
                            >
                              View Profile
                            </Link>

                            <Link
                              href={`/appointments/book?clinic=${clinic.slug}`}
                              className="inline-flex h-[42px] items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-5 text-sm font-semibold text-white shadow-sm shadow-[#4e44e1]/10 transition hover:brightness-110"
                            >
                              Book Appointment
                              <ArrowRight size={16} />
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}

                  {filteredListings.length === 0 && (
                    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#d9d3f2] bg-[#fbfaff] px-5 text-center">
                      <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#e6e0ff] bg-[#f0edff] text-[#4e44e1]">
                        <Search size={25} />
                      </div>

                      <h3 className="mt-5 text-[20px] font-bold text-[#17152b]">
                        No clinics found
                      </h3>

                      <p className="mt-2 max-w-md text-[14px] leading-6 text-[#77718f]">
                        We couldn&apos;t find any clinics matching your search.
                        Try changing your location or filters.
                      </p>

                      <button
                        type="button"
                        onClick={clearFilters}
                        className="mt-5 inline-flex h-[44px] items-center justify-center rounded-lg bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-6 text-[14px] font-semibold text-white shadow-sm transition hover:brightness-110"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}