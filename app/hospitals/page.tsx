
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  Search,
  MapPin,
  Star,
  ChevronDown,
  ChevronRight,
  SlidersHorizontal,
  X,
  CheckCircle2,
  Clock3,
  Building2,
  HeartPulse,
  ArrowUpRight,
  Navigation,
  ShieldCheck,
} from "lucide-react";

/* =========================================
   HOSPITAL DATA
========================================= */

type Hospital = {
  id: number;
  name: string;
  slug: string;
  location: string;
  address: string;
  rating: number;
  reviews: number;
  specialties: string[];
  insurance: string[];
  emergency: boolean;
  open: boolean;
  logo: string;
  logoColor: string;
  logoBg: string;
  description: string;
};

const hospitals: Hospital[] = [
  {
    id: 1,
    name: "Apollo Hospital",
    slug: "apollo-hospital",
    location: "Sector 26, Noida",
    address: "Sector 26, Noida, Uttar Pradesh",
    rating: 4.8,
    reviews: 1250,
    specialties: ["Cardiology", "Orthopedics", "Neurology", "Oncology"],
    insurance: ["All Insurance", "Star Health", "HDFC ERGO"],
    emergency: true,
    open: true,
    logo: "Apollo",
    logoColor: "#4e44e1",
    logoBg: "#f5f3ff",
    description:
      "Multispeciality hospital offering comprehensive healthcare and advanced medical services.",
  },
  {
    id: 2,
    name: "Metro Hospital",
    slug: "metro-hospital",
    location: "Sector 11, Noida",
    address: "Sector 11, Noida, Uttar Pradesh",
    rating: 4.6,
    reviews: 890,
    specialties: ["Cardiology", "Orthopedics", "Neurology", "Oncology"],
    insurance: ["All Insurance", "ICICI Lombard"],
    emergency: true,
    open: true,
    logo: "✚ METRO",
    logoColor: "#4e44e1",
    logoBg: "#f5f3ff",
    description:
      "A multispeciality healthcare centre providing diagnostic, surgical and emergency care.",
  },
  {
    id: 3,
    name: "Fortis Hospital",
    slug: "fortis-hospital",
    location: "Sector 62, Noida",
    address: "Sector 62, Noida, Uttar Pradesh",
    rating: 4.7,
    reviews: 1050,
    specialties: ["Cardiology", "Neurology", "Oncology", "Pediatrics"],
    insurance: ["All Insurance", "Star Health", "ICICI Lombard"],
    emergency: true,
    open: true,
    logo: "✣ Fortis",
    logoColor: "#16865b",
    logoBg: "#effaf4",
    description:
      "Hospital providing specialist consultations, medical treatments and critical care services.",
  },
  {
    id: 4,
    name: "Max Super Speciality Hospital",
    slug: "max-super-speciality-hospital",
    location: "Sector 128, Noida",
    address: "Sector 128, Noida, Uttar Pradesh",
    rating: 4.9,
    reviews: 1680,
    specialties: [
      "Cardiology",
      "Orthopedics",
      "Neurology",
      "Oncology",
      "Pediatrics",
    ],
    insurance: ["All Insurance", "HDFC ERGO", "Star Health"],
    emergency: true,
    open: true,
    logo: "MAX",
    logoColor: "#4e44e1",
    logoBg: "#f5f3ff",
    description:
      "Super speciality healthcare facility with a range of medical and surgical departments.",
  },
  {
    id: 5,
    name: "City Care Hospital",
    slug: "city-care-hospital",
    location: "Sector 50, Noida",
    address: "Sector 50, Noida, Uttar Pradesh",
    rating: 4.3,
    reviews: 420,
    specialties: ["Orthopedics", "Pediatrics", "Cardiology"],
    insurance: ["All Insurance", "ICICI Lombard"],
    emergency: false,
    open: true,
    logo: "CITY CARE",
    logoColor: "#4e44e1",
    logoBg: "#f5f3ff",
    description:
      "Community-focused hospital offering consultations, diagnostics and general medical care.",
  },
  {
    id: 6,
    name: "GreenLife Multispeciality Hospital",
    slug: "greenlife-multispeciality-hospital",
    location: "Indirapuram, Ghaziabad",
    address: "Indirapuram, Ghaziabad, Uttar Pradesh",
    rating: 4.5,
    reviews: 610,
    specialties: ["Cardiology", "Pediatrics", "Oncology"],
    insurance: ["All Insurance", "Star Health"],
    emergency: true,
    open: true,
    logo: "GREENLIFE",
    logoColor: "#16865b",
    logoBg: "#effaf4",
    description:
      "Multispeciality medical centre offering inpatient, outpatient and emergency services.",
  },
];

/* =========================================
   FILTER OPTIONS
========================================= */

const specialties = [
  "Cardiology",
  "Orthopedics",
  "Neurology",
  "Oncology",
  "Pediatrics",
];

const ratings = [
  { label: "4 & Above", value: 4 },
  { label: "3 & Above", value: 3 },
  { label: "2 & Above", value: 2 },
];

/* =========================================
   HOSPITAL LISTING PAGE
========================================= */

export default function HospitalsPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("India");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [insurance, setInsurance] = useState("All Insurance");
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Popularity");
  const [filtersOpen, setFiltersOpen] = useState(false);

  /* =========================================
     FILTER LOGIC
  ========================================= */

  const filteredHospitals = useMemo(() => {
    let result = [...hospitals];
    const searchText = search.trim().toLowerCase();

    if (searchText) {
      result = result.filter((hospital) => {
        return (
          hospital.name.toLowerCase().includes(searchText) ||
          hospital.location.toLowerCase().includes(searchText) ||
          hospital.address.toLowerCase().includes(searchText) ||
          hospital.specialties.some((item) =>
            item.toLowerCase().includes(searchText)
          )
        );
      });
    }

    if (location !== "India") {
      result = result.filter((hospital) =>
        hospital.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (selectedSpecialties.length > 0) {
      result = result.filter((hospital) =>
        selectedSpecialties.every((specialty) =>
          hospital.specialties.includes(specialty)
        )
      );
    }

    if (rating > 0) {
      result = result.filter((hospital) => hospital.rating >= rating);
    }

    if (insurance !== "All Insurance") {
      result = result.filter((hospital) =>
        hospital.insurance.includes(insurance)
      );
    }

    if (emergencyOnly) {
      result = result.filter((hospital) => hospital.emergency);
    }

    if (sortBy === "Rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "Reviews") {
      result.sort((a, b) => b.reviews - a.reviews);
    } else {
      result.sort((a, b) => a.id - b.id);
    }

    return result;
  }, [
    search,
    location,
    selectedSpecialties,
    rating,
    insurance,
    emergencyOnly,
    sortBy,
  ]);

  /* =========================================
     HANDLERS
  ========================================= */

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties((previous) =>
      previous.includes(specialty)
        ? previous.filter((item) => item !== specialty)
        : [...previous, specialty]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setLocation("India");
    setSelectedSpecialties([]);
    setRating(0);
    setInsurance("All Insurance");
    setEmergencyOnly(false);
    setSortBy("Popularity");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    location !== "India" ||
    selectedSpecialties.length > 0 ||
    rating > 0 ||
    insurance !== "All Insurance" ||
    emergencyOnly;

  /* =========================================
     REUSABLE STYLES
  ========================================= */

  const inputClass =
    "h-11 w-full appearance-none rounded-xl border border-[#ebe8f4] bg-white px-3 pr-9 text-sm text-[#4B5568] outline-none transition focus:border-[#7167eb] focus:ring-2 focus:ring-[#7167eb]/10";

  const checkboxClass =
    "h-4 w-4 cursor-pointer accent-[#4e44e1]";

  return (
    <main className="min-h-screen bg-[#fbfaff] text-[#17152b]">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <section className="relative isolate overflow-hidden border-b border-[#ebe8f4] bg-gradient-to-br from-[#f5f3ff] via-white to-[#f9f0ff]">
        <div className="pointer-events-none absolute -left-28 -top-24 -z-10 h-72 w-72 rounded-full bg-[#4e44e1]/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 top-10 -z-10 h-72 w-72 rounded-full bg-[#9122b4]/10 blur-[100px]" />

        <div className="mx-auto max-w-[1440px] px-4 pb-7 pt-7 sm:px-6 sm:pb-9 sm:pt-9 lg:px-10">

          {/* Breadcrumb */}

          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-sm font-medium text-[#6b6880]"
          >
            <Link
              href="/"
              className="transition-colors hover:text-[#4e44e1]"
            >
              Home
            </Link>

            <ChevronRight size={15} className="text-[#aaa5bd]" />

            <span className="font-semibold text-[#17152b]">
              Hospitals
            </span>
          </nav>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ebe8f4] bg-white/90 px-3.5 py-2 text-xs font-bold tracking-[0.12em] text-[#4e44e1] shadow-sm">
                <HeartPulse size={15} />
                HEALTHCARE DIRECTORY
              </div>

              <h1 className="text-[30px] font-extrabold leading-tight tracking-[-0.8px] text-[#17152b] sm:text-[36px] lg:text-[44px]">
                Hospitals Near You
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6b6880] sm:text-base">
                Find the right hospital for your healthcare needs.
                Explore specialties, emergency facilities and available services.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2.5 rounded-xl border border-[#ebe8f4] bg-white/90 px-4 py-3 text-sm font-semibold text-[#4B5568] shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f5f3ff] text-[#4e44e1]">
                <Building2 size={19} />
              </span>
              Find a Hospital
            </div>
          </div>

          {/* Search Bar */}

          <div className="mt-7 rounded-2xl border border-[#ebe8f4] bg-white/95 p-2 shadow-[0_12px_40px_rgba(78,68,225,0.07)] sm:mt-8 sm:p-3">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[minmax(0,1fr)_240px_auto]">

              {/* Search Input */}

              <div className="flex min-h-[54px] min-w-0 items-center gap-3 rounded-xl px-3 transition focus-within:bg-[#fbfaff] sm:px-4">
                <Search size={21} className="shrink-0 text-[#7167eb]" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search hospital name or specialty..."
                  aria-label="Search hospitals"
                  className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#17152b] outline-none placeholder:text-[#a09bb2] sm:text-base"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#817c95] transition hover:bg-[#f5f3ff] hover:text-[#4e44e1]"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>

              {/* Location */}

              <div className="flex min-h-[54px] items-center gap-3 rounded-xl border border-[#ebe8f4] bg-white px-3 transition focus-within:border-[#7167eb] sm:px-4">
                <MapPin size={20} className="shrink-0 text-[#7167eb]" />

                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  aria-label="Select location"
                  className="w-full cursor-pointer appearance-none bg-transparent text-sm font-medium text-[#4B5568] outline-none"
                >
                  <option value="India">India</option>
                  <option value="Noida">Noida</option>
                  <option value="Ghaziabad">Ghaziabad</option>
                </select>

                <ChevronDown size={16} className="shrink-0 text-[#817c95]" />
              </div>

              {/* Search Button */}

              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-7 text-sm font-bold text-white shadow-[0_5px_16px_rgba(78,68,225,0.20)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(78,68,225,0.28)]"
              >
                <Search size={18} />
                Search Hospitals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <section className="bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-[1440px]">

          {/* Mobile Filter Button */}

          <div className="mb-5 flex items-center justify-between gap-3 lg:hidden">
            <p className="text-sm font-bold text-[#17152b]">
              {filteredHospitals.length} Hospitals Found
            </p>

            <button
              type="button"
              onClick={() => setFiltersOpen(!filtersOpen)}
              aria-expanded={filtersOpen}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#ebe8f4] bg-white px-4 text-sm font-semibold text-[#4B5568] shadow-sm transition hover:border-[#c8c1f6] hover:text-[#4e44e1]"
            >
              {filtersOpen ? <X size={17} /> : <SlidersHorizontal size={17} />}
              Filters
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f5f3ff] px-1 text-[11px] font-bold text-[#4e44e1]">
                {selectedSpecialties.length +
                  (rating > 0 ? 1 : 0) +
                  (insurance !== "All Insurance" ? 1 : 0) +
                  (emergencyOnly ? 1 : 0) +
                  (location !== "India" ? 1 : 0)}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[270px_minmax(0,1fr)] xl:grid-cols-[290px_minmax(0,1fr)]">

            {/* =================================
                FILTER SIDEBAR
            ================================= */}

            <aside
              className={`${
                filtersOpen ? "block" : "hidden"
              } lg:sticky lg:top-5 lg:block`}
            >
              <div className="overflow-hidden rounded-2xl border border-[#ebe8f4] bg-white shadow-[0_4px_20px_rgba(34,27,75,0.035)]">

                {/* Filter Heading */}

                <div className="flex items-center justify-between border-b border-[#f0edf7] px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f3ff] text-[#4e44e1]">
                      <SlidersHorizontal size={18} />
                    </span>

                    <h2 className="text-base font-bold text-[#17152b]">
                      Filters
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-bold text-[#7167eb] underline underline-offset-4 transition hover:text-[#9122b4]"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-[#f0edf7]">

                  {/* Location Filter */}

                  <div className="p-5">
                    <h3 className="mb-4 text-sm font-bold text-[#28243c]">
                      Location
                    </h3>

                    <div className="relative">
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        aria-label="Filter by location"
                        className={inputClass}
                      >
                        <option value="India">All Locations</option>
                        <option value="Noida">Noida</option>
                        <option value="Ghaziabad">Ghaziabad</option>
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#817c95]"
                      />
                    </div>
                  </div>

                  {/* Specialty Filter */}

                  <div className="p-5">
                    <h3 className="mb-4 text-sm font-bold text-[#28243c]">
                      Specialty
                    </h3>

                    <div className="space-y-3.5">
                      {specialties.map((specialty) => (
                        <label
                          key={specialty}
                          className="group flex cursor-pointer items-center gap-3 text-sm text-[#6b6880] transition hover:text-[#4e44e1]"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSpecialties.includes(specialty)}
                            onChange={() => toggleSpecialty(specialty)}
                            className={checkboxClass}
                          />
                          <span>{specialty}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}

                  <div className="p-5">
                    <h3 className="mb-4 text-sm font-bold text-[#28243c]">
                      Rating
                    </h3>

                    <div className="space-y-3.5">
                      <label className="flex cursor-pointer items-center gap-3 text-sm text-[#6b6880] transition hover:text-[#4e44e1]">
                        <input
                          type="radio"
                          name="rating"
                          checked={rating === 0}
                          onChange={() => setRating(0)}
                          className="h-4 w-4 accent-[#4e44e1]"
                        />
                        Any Rating
                      </label>

                      {ratings.map((item) => (
                        <label
                          key={item.value}
                          className="flex cursor-pointer items-center gap-3 text-sm text-[#6b6880] transition hover:text-[#4e44e1]"
                        >
                          <input
                            type="radio"
                            name="rating"
                            checked={rating === item.value}
                            onChange={() => setRating(item.value)}
                            className="h-4 w-4 accent-[#4e44e1]"
                          />

                          <span className="flex items-center gap-2">
                            {item.label}
                            <span className="flex items-center gap-1 rounded-md bg-[#fff8e7] px-1.5 py-0.5">
                              <Star
                                size={12}
                                fill="#fbbf24"
                                stroke="#fbbf24"
                              />
                              <span className="text-xs font-semibold text-[#80601b]">
                                {item.value}+
                              </span>
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Insurance Filter */}

                  <div className="p-5">
                    <h3 className="mb-4 text-sm font-bold text-[#28243c]">
                      Insurance
                    </h3>

                    <div className="relative">
                      <select
                        value={insurance}
                        onChange={(e) => setInsurance(e.target.value)}
                        aria-label="Filter by insurance"
                        className={inputClass}
                      >
                        <option value="All Insurance">All Insurance</option>
                        <option value="Star Health">Star Health</option>
                        <option value="HDFC ERGO">HDFC ERGO</option>
                        <option value="ICICI Lombard">ICICI Lombard</option>
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#817c95]"
                      />
                    </div>
                  </div>

                  {/* Emergency Filter */}

                  <div className="p-5">
                    <h3 className="mb-4 text-sm font-bold text-[#28243c]">
                      Emergency
                    </h3>

                    <label className="flex cursor-pointer items-center gap-3 text-sm text-[#6b6880] transition hover:text-[#4e44e1]">
                      <input
                        type="checkbox"
                        checked={emergencyOnly}
                        onChange={(e) => setEmergencyOnly(e.target.checked)}
                        className={checkboxClass}
                      />
                      <span>24/7 Emergency</span>
                    </label>
                  </div>
                </div>

                {/* Apply Filters */}

                <div className="border-t border-[#f0edf7] p-5 lg:hidden">
                  <button
                    type="button"
                    onClick={() => setFiltersOpen(false)}
                    className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-5 text-sm font-bold text-white shadow-md shadow-[#4e44e1]/15 transition hover:shadow-lg"
                  >
                    Show {filteredHospitals.length} Hospitals
                  </button>
                </div>
              </div>
            </aside>

            {/* =================================
                HOSPITAL RESULTS
            ================================= */}

            <div className="min-w-0">

              {/* Results Toolbar */}

              <div className="mb-5 flex flex-col justify-between gap-4 rounded-2xl border border-[#ebe8f4] bg-white px-4 py-4 shadow-[0_4px_20px_rgba(34,27,75,0.025)] sm:flex-row sm:items-center sm:px-5">
                <div>
                  <h2 className="text-base font-bold text-[#17152b]">
                    Showing {filteredHospitals.length} Hospitals
                  </h2>

                  <p className="mt-1 text-sm text-[#858097]">
                    Find hospitals that match your needs
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <label
                    htmlFor="sort-hospitals"
                    className="shrink-0 text-sm font-medium text-[#6b6880]"
                  >
                    Sort by:
                  </label>

                  <div className="relative min-w-0 flex-1 sm:flex-none">
                    <select
                      id="sort-hospitals"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="h-10 w-full appearance-none rounded-xl border border-[#ebe8f4] bg-white pl-3 pr-9 text-sm font-semibold text-[#4B5568] outline-none transition focus:border-[#7167eb] sm:w-[165px]"
                    >
                      <option value="Popularity">Popularity</option>
                      <option value="Rating">Rating</option>
                      <option value="Reviews">Most Reviews</option>
                    </select>

                    <ChevronDown
                      size={15}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#817c95]"
                    />
                  </div>
                </div>
              </div>

              {/* Active Filters */}

              {hasActiveFilters && (
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  {search.trim() && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="inline-flex items-center gap-2 rounded-full border border-[#e4e0f6] bg-white px-3 py-2 text-xs font-medium text-[#5e568b] transition hover:border-[#bcb4f3]"
                    >
                      Search: {search}
                      <X size={14} />
                    </button>
                  )}

                  {location !== "India" && (
                    <button
                      type="button"
                      onClick={() => setLocation("India")}
                      className="inline-flex items-center gap-2 rounded-full border border-[#e4e0f6] bg-white px-3 py-2 text-xs font-medium text-[#5e568b] transition hover:border-[#bcb4f3]"
                    >
                      {location}
                      <X size={14} />
                    </button>
                  )}

                  {selectedSpecialties.map((specialty) => (
                    <button
                      key={specialty}
                      type="button"
                      onClick={() => toggleSpecialty(specialty)}
                      className="inline-flex items-center gap-2 rounded-full border border-[#e4e0f6] bg-white px-3 py-2 text-xs font-medium text-[#5e568b] transition hover:border-[#bcb4f3]"
                    >
                      {specialty}
                      <X size={14} />
                    </button>
                  ))}

                  {rating > 0 && (
                    <button
                      type="button"
                      onClick={() => setRating(0)}
                      className="inline-flex items-center gap-2 rounded-full border border-[#e4e0f6] bg-white px-3 py-2 text-xs font-medium text-[#5e568b] transition hover:border-[#bcb4f3]"
                    >
                      Rating {rating}+
                      <X size={14} />
                    </button>
                  )}

                  {insurance !== "All Insurance" && (
                    <button
                      type="button"
                      onClick={() => setInsurance("All Insurance")}
                      className="inline-flex items-center gap-2 rounded-full border border-[#e4e0f6] bg-white px-3 py-2 text-xs font-medium text-[#5e568b] transition hover:border-[#bcb4f3]"
                    >
                      {insurance}
                      <X size={14} />
                    </button>
                  )}

                  {emergencyOnly && (
                    <button
                      type="button"
                      onClick={() => setEmergencyOnly(false)}
                      className="inline-flex items-center gap-2 rounded-full border border-[#e4e0f6] bg-white px-3 py-2 text-xs font-medium text-[#5e568b] transition hover:border-[#bcb4f3]"
                    >
                      24/7 Emergency
                      <X size={14} />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="px-2 py-2 text-xs font-bold text-[#7167eb] underline underline-offset-4 transition hover:text-[#9122b4]"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Hospital Cards */}

              {filteredHospitals.length > 0 ? (
                <div className="space-y-4">
                  {filteredHospitals.map((hospital) => (
                    <article
                      key={hospital.id}
                      className="group overflow-hidden rounded-2xl border border-[#ebe8f4] bg-white transition duration-300 hover:-translate-y-0.5 hover:border-[#c9c2f5] hover:shadow-[0_12px_32px_rgba(78,68,225,0.08)]"
                    >
                      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-5 sm:p-5 lg:grid-cols-[165px_minmax(0,1fr)_150px] lg:items-center lg:gap-6">

                        {/* Hospital Logo */}

                        <div
                          className="flex h-[110px] w-full items-center justify-center overflow-hidden rounded-xl border border-[#ebe8f4] sm:h-[130px] sm:w-[150px] lg:h-[135px] lg:w-[165px]"
                          style={{ backgroundColor: hospital.logoBg }}
                        >
                          <div
                            className="flex flex-col items-center justify-center px-2 text-center"
                            style={{ color: hospital.logoColor }}
                          >
                            <Building2 size={31} strokeWidth={2.2} />

                            <span className="mt-2 text-lg font-extrabold tracking-tight sm:text-xl">
                              {hospital.logo}
                            </span>

                            <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] opacity-75">
                              Hospital
                            </span>
                          </div>
                        </div>

                        {/* Hospital Details */}

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-bold leading-7 text-[#17152b] transition-colors group-hover:text-[#4e44e1] sm:text-xl">
                              {hospital.name}
                            </h3>

                            <CheckCircle2
                              size={17}
                              className="shrink-0 text-[#7167eb]"
                            />
                          </div>

                          <p className="mt-1 text-sm font-medium text-[#858097]">
                            Multispeciality Hospital
                          </p>

                          {/* Rating */}

                          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                            <div className="flex items-center gap-1 rounded-lg border border-[#f4e7b8] bg-[#fff9e8] px-2 py-1">
                              <Star
                                size={14}
                                fill="#fbbf24"
                                stroke="#d99a06"
                              />

                              <span className="text-sm font-bold text-[#59471e]">
                                {hospital.rating.toFixed(1)}
                              </span>
                            </div>

                            <span className="text-xs text-[#858097]">
                              ({hospital.reviews.toLocaleString("en-IN")} reviews)
                            </span>
                          </div>

                          {/* Location */}

                          <div className="mt-3 flex items-start gap-2 text-sm text-[#6b6880]">
                            <MapPin
                              size={16}
                              className="mt-0.5 shrink-0 text-[#7167eb]"
                            />
                            <span>{hospital.address}</span>
                          </div>

                          {/* Emergency & Insurance */}

                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            {hospital.emergency && (
                              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#d9f2e4] bg-[#effaf4] px-2.5 py-1.5 text-xs font-semibold text-[#23754b]">
                                <CheckCircle2 size={14} />
                                24/7 Emergency
                              </span>
                            )}

                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#e4e0f6] bg-[#f8f6ff] px-2.5 py-1.5 text-xs font-medium text-[#625b8b]">
                              <ShieldCheck size={14} className="text-[#7167eb]" />
                              Insurance Available
                            </span>
                          </div>

                          {/* Specialties */}

                          <div className="mt-3 flex flex-wrap gap-2">
                            {hospital.specialties.slice(0, 3).map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-[#ebe8f4] bg-[#fbfaff] px-2.5 py-1 text-xs font-medium text-[#6b6880]"
                              >
                                {item}
                              </span>
                            ))}

                            {hospital.specialties.length > 3 && (
                              <span className="rounded-full border border-[#e4e0f6] bg-[#f5f3ff] px-2.5 py-1 text-xs font-semibold text-[#7167eb]">
                                +{hospital.specialties.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* View Details */}

                        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row lg:col-span-1 lg:flex-col">
                          <Link
                            href={`/hospitals/${hospital.slug}`}
                            className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-4 text-sm font-bold text-white shadow-sm shadow-[#4e44e1]/15 transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#4e44e1]/20"
                          >
                            View Details
                            <ArrowUpRight size={16} />
                          </Link>

                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              hospital.name + " " + hospital.address
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-[#ebe8f4] bg-white px-4 text-sm font-semibold text-[#625b80] transition hover:border-[#c9c2f5] hover:bg-[#f8f6ff] hover:text-[#4e44e1]"
                          >
                            <Navigation size={16} />
                            Get Directions
                          </a>
                        </div>
                      </div>

                      {/* Card Footer */}

                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#f0edf7] bg-[#fdfcff] px-4 py-3 sm:px-5">
                        <div className="flex items-center gap-2 text-xs font-medium text-[#858097]">
                          <Clock3 size={15} className="text-[#7167eb]" />
                          {hospital.open
                            ? "Currently listed"
                            : "Check availability"}
                        </div>

                        <Link
                          href={`/hospitals/${hospital.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#7167eb] transition hover:text-[#9122b4]"
                        >
                          Explore Hospital
                          <ChevronRight size={14} />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (

                /* No Results */

                <div className="rounded-2xl border border-[#ebe8f4] bg-white px-5 py-16 text-center shadow-sm sm:px-10">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5f3ff] text-[#7167eb]">
                    <Search size={28} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[#17152b]">
                    No Hospitals Found
                  </h3>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#858097]">
                    We couldn&apos;t find any hospitals matching your search
                    or selected filters. Try changing your search or clearing
                    the filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 inline-flex min-h-[46px] items-center justify-center rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-6 text-sm font-bold text-white shadow-sm transition hover:shadow-md"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Results Footer */}

              {filteredHospitals.length > 0 && (
                <div className="mt-5 rounded-2xl border border-[#ebe8f4] bg-white px-5 py-4">
                  <p className="text-center text-sm text-[#858097]">
                    Showing{" "}
                    <span className="font-bold text-[#17152b]">
                      {filteredHospitals.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-[#17152b]">
                      {hospitals.length}
                    </span>{" "}
                    hospitals
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
