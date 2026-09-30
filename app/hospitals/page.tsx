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
    specialties: [
      "Cardiology",
      "Orthopedics",
      "Neurology",
      "Oncology",
    ],
    insurance: ["All Insurance", "Star Health", "HDFC ERGO"],
    emergency: true,
    open: true,
    logo: "Apollo",
    logoColor: "#0878b9",
    logoBg: "#edf7ff",
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
    specialties: [
      "Cardiology",
      "Orthopedics",
      "Neurology",
      "Oncology",
    ],
    insurance: ["All Insurance", "ICICI Lombard"],
    emergency: true,
    open: true,
    logo: "✚ METRO",
    logoColor: "#17639b",
    logoBg: "#f0f7fc",
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
    specialties: [
      "Cardiology",
      "Neurology",
      "Oncology",
      "Pediatrics",
    ],
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
    logoColor: "#0878b9",
    logoBg: "#edf7ff",
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
    specialties: [
      "Orthopedics",
      "Pediatrics",
      "Cardiology",
    ],
    insurance: ["All Insurance", "ICICI Lombard"],
    emergency: false,
    open: true,
    logo: "CITY CARE",
    logoColor: "#0878b9",
    logoBg: "#edf7ff",
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
    specialties: [
      "Cardiology",
      "Pediatrics",
      "Oncology",
    ],
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
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    []
  );
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

  return (
    <main className="min-h-screen bg-[#f3f8fc] text-black">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <section className="border-b border-[#dce6f2] bg-gradient-to-r from-[#eef7ff] to-white">
        <div className="mx-auto max-w-[1440px] px-4 pb-6 pt-7 sm:px-6 sm:pb-8 sm:pt-9 lg:px-10">

          {/* Breadcrumb */}

          <div className="mb-5 flex items-center gap-2 text-sm font-medium text-black">
            <Link
              href="/"
              className="transition hover:text-[#0878d1]"
            >
              Home
            </Link>

            <ChevronRight size={15} />

            <span>Hospitals</span>
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d6e9fa] bg-white px-3.5 py-2 text-xs font-semibold text-black">
                <HeartPulse size={15} className="text-[#0878d1]" />
                HEALTHCARE DIRECTORY
              </div>

                <h1 className="text-[30px] font-extrabold leading-tight tracking-[-0.7px] text-black sm:text-[36px] lg:text-[40px]">
                Hospitals Near You
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-black sm:text-base">
                Find the best hospital for your healthcare needs.
                Explore hospitals, specialties and available facilities.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-black">
              <Building2 size={19} className="text-[#0878d1]" />
              <span>Find a Hospital</span>
            </div>
          </div>

          {/* =====================================
              SEARCH BAR
          ===================================== */}

          <div className="mt-7 rounded-2xl border border-[#dce6f2] bg-white p-2 shadow-[0_5px_22px_rgba(24,59,96,0.06)] sm:mt-8 sm:p-3">

            <div className="grid grid-cols-1 gap-2 md:grid-cols-[minmax(0,1fr)_240px_auto]">

              {/* Search Input */}

              <div className="flex min-h-[54px] min-w-0 items-center gap-3 rounded-xl px-3 sm:px-4">
                <Search
                  size={21}
                  className="shrink-0 text-black"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search hospital name or specialty..."
                  className="h-full min-w-0 flex-1 bg-transparent text-sm text-black outline-none placeholder:text-black sm:text-base"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-black hover:bg-[#f1f5f9]"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>

              {/* Location */}

              <div className="flex min-h-[54px] items-center gap-3 rounded-xl border border-[#e3eaf2] px-3 sm:px-4">
                <MapPin
                  size={20}
                  className="shrink-0 text-black"
                />

                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  aria-label="Select location"
                  className="w-full cursor-pointer appearance-none bg-transparent text-sm font-medium text-black outline-none"
                >
                  <option value="India">India</option>
                  <option value="Noida">Noida</option>
                  <option value="Ghaziabad">Ghaziabad</option>
                </select>

                <ChevronDown
                  size={16}
                  className="shrink-0 text-black"
                />
              </div>

              {/* Search Button */}

              <button
                type="button"
                onClick={() => {
                  setFiltersOpen(false);
                }}
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-[#0878d1] px-7 text-sm font-semibold text-white transition hover:bg-[#0667b5]"
              >
                <Search size={18} />
                Search
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <section className="px-4 py-6 bg-white sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-[1440px]">

          {/* Mobile Filter Button */}

          <div className="mb-5 flex items-center justify-between gap-3 lg:hidden">

            <p className="text-sm font-semibold text-black">
              {filteredHospitals.length} Hospitals Found
            </p>

            <button
              type="button"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#dce6f2] bg-white px-4 text-sm font-semibold text-black"
            >
              {filtersOpen ? <X size={17} /> : <SlidersHorizontal size={17} />}
              Filters
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
              <div className="overflow-hidden rounded-xl border border-[#dce6f2] bg-white">

                {/* Filter Heading */}

                <div className="flex items-center justify-between border-b border-[#e5edf5] px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <SlidersHorizontal
                      size={18}
                      className="text-black"
                    />

                    <h2 className="text-base font-bold text-black">
                      Filters
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-semibold text-black underline underline-offset-4 hover:text-[#0878d1]"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-[#e8eef5]">

                  {/* Location Filter */}

                  <div className="p-5">
                    <h3 className="mb-4 text-sm font-bold text-black">
                      Location
                    </h3>

                    <div className="relative">
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="h-11 w-full appearance-none rounded-lg border border-[#dce6f2] bg-white px-3 pr-9 text-sm text-black outline-none focus:border-[#0878d1]"
                      >
                        <option value="India">All Locations</option>
                        <option value="Noida">Noida</option>
                        <option value="Ghaziabad">Ghaziabad</option>
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black"
                      />
                    </div>
                  </div>

                  {/* Specialty Filter */}

                  <div className="p-5">
                    <h3 className="mb-4 text-sm font-bold text-black">
                      Specialty
                    </h3>

                    <div className="space-y-3.5">
                      {specialties.map((specialty) => (
                        <label
                          key={specialty}
                          className="flex cursor-pointer items-center gap-3 text-sm text-black"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSpecialties.includes(specialty)}
                            onChange={() => toggleSpecialty(specialty)}
                            className="h-4 w-4 cursor-pointer accent-[#0878d1]"
                          />

                          <span>{specialty}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}

                  <div className="p-5">
                    <h3 className="mb-4 text-sm font-bold text-black">
                      Rating
                    </h3>

                    <div className="space-y-3.5">
                      <label className="flex cursor-pointer items-center gap-3 text-sm text-black">
                        <input
                          type="radio"
                          name="rating"
                          checked={rating === 0}
                          onChange={() => setRating(0)}
                          className="h-4 w-4 accent-[#0878d1]"
                        />

                        Any Rating
                      </label>

                      {ratings.map((item) => (
                        <label
                          key={item.value}
                          className="flex cursor-pointer items-center gap-3 text-sm text-black"
                        >
                          <input
                            type="radio"
                            name="rating"
                            checked={rating === item.value}
                            onChange={() => setRating(item.value)}
                            className="h-4 w-4 accent-[#0878d1]"
                          />

                          <span className="flex items-center gap-2">
                            {item.label}

                            <span className="flex items-center gap-1">
                              <Star
                                size={13}
                                fill="#fbbf24"
                                stroke="#fbbf24"
                              />
                              <span>{item.value}+</span>
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Insurance Filter */}

                  <div className="p-5">
                    <h3 className="mb-4 text-sm font-bold text-black">
                      Insurance
                    </h3>

                    <div className="relative">
                      <select
                        value={insurance}
                        onChange={(e) => setInsurance(e.target.value)}
                        className="h-11 w-full appearance-none rounded-lg border border-[#dce6f2] bg-white px-3 pr-9 text-sm text-black outline-none focus:border-[#0878d1]"
                      >
                        <option value="All Insurance">All Insurance</option>
                        <option value="Star Health">Star Health</option>
                        <option value="HDFC ERGO">HDFC ERGO</option>
                        <option value="ICICI Lombard">ICICI Lombard</option>
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black"
                      />
                    </div>
                  </div>

                  {/* Emergency Filter */}

                  <div className="p-5">
                    <h3 className="mb-4 text-sm font-bold text-black">
                      Emergency
                    </h3>

                    <label className="flex cursor-pointer items-center gap-3 text-sm text-black">
                      <input
                        type="checkbox"
                        checked={emergencyOnly}
                        onChange={(e) =>
                          setEmergencyOnly(e.target.checked)
                        }
                        className="h-4 w-4 accent-[#0878d1]"
                      />

                      24/7 Emergency
                    </label>
                  </div>

                </div>

                {/* Apply Filters */}

                <div className="border-t border-[#e5edf5] p-5 lg:hidden">
                  <button
                    type="button"
                    onClick={() => setFiltersOpen(false)}
                    className="flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#0878d1] px-5 text-sm font-semibold text-white"
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

              <div className="mb-5 flex flex-col justify-between gap-4 rounded-xl border border-[#dce6f2] bg-white px-4 py-4 sm:flex-row sm:items-center sm:px-5">

                <div>
                  <h2 className="text-base font-bold text-black">
                    Showing {filteredHospitals.length} Hospitals
                  </h2>

                  <p className="mt-1 text-sm text-black">
                    Find hospitals that match your needs
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <label
                    htmlFor="sort-hospitals"
                    className="shrink-0 text-sm font-medium text-black"
                  >
                    Sort by:
                  </label>

                  <div className="relative min-w-0 flex-1 sm:flex-none">
                    <select
                      id="sort-hospitals"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="h-10 w-full appearance-none rounded-lg border border-[#dce6f2] bg-white pl-3 pr-9 text-sm font-semibold text-black outline-none focus:border-[#0878d1] sm:w-[165px]"
                    >
                      <option value="Popularity">Popularity</option>
                      <option value="Rating">Rating</option>
                      <option value="Reviews">Most Reviews</option>
                    </select>

                    <ChevronDown
                      size={15}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black"
                    />
                  </div>
                </div>

              </div>

              {/* Active Filters */}

              {hasActiveFilters && (
                <div className="mb-5 flex flex-wrap items-center gap-2">

                  {search.trim() && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#dce6f2] bg-white px-3 py-2 text-xs font-medium text-black">
                      Search: {search}

                      <button
                        type="button"
                        onClick={() => setSearch("")}
                        aria-label="Remove search filter"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  )}

                  {selectedSpecialties.map((specialty) => (
                    <button
                      key={specialty}
                      type="button"
                      onClick={() => toggleSpecialty(specialty)}
                      className="inline-flex items-center gap-2 rounded-full border border-[#dce6f2] bg-white px-3 py-2 text-xs font-medium text-black"
                    >
                      {specialty}
                      <X size={14} />
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="px-2 py-2 text-xs font-semibold text-black underline underline-offset-4"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* =================================
                  HOSPITAL CARDS
              ================================= */}

              {filteredHospitals.length > 0 ? (
                <div className="space-y-4">

                  {filteredHospitals.map((hospital) => (
                    <article
                      key={hospital.id}
                      className="group overflow-hidden rounded-xl border border-[#dce6f2] bg-white transition duration-200 hover:border-[#b9d8f2] hover:shadow-[0_8px_28px_rgba(24,59,96,0.08)]"
                    >
                      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-5 sm:p-5 lg:grid-cols-[165px_minmax(0,1fr)_140px] lg:items-center lg:gap-6">

                        {/* Hospital Logo */}

                        <div
                          className="flex h-[110px] w-full items-center justify-center overflow-hidden rounded-xl border border-[#edf1f5] sm:h-[130px] sm:w-[150px] lg:h-[135px] lg:w-[165px]"
                          style={{
                            backgroundColor: hospital.logoBg,
                          }}
                        >
                          <div
                            className="flex flex-col items-center justify-center px-2 text-center"
                            style={{
                              color: hospital.logoColor,
                            }}
                          >
                            <Building2
                              size={31}
                              strokeWidth={2.2}
                            />

                            <span className="mt-2 text-lg font-extrabold tracking-tight sm:text-xl">
                              {hospital.logo}
                            </span>

                            <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.15em]">
                              Hospital
                            </span>
                          </div>
                        </div>

                        {/* Hospital Details */}

                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-bold leading-7 text-black transition group-hover:text-[#0878d1] sm:text-xl">
                              {hospital.name}
                            </h3>

                            <CheckCircle2
                              size={17}
                              className="shrink-0 text-[#0878d1]"
                            />
                          </div>

                          <p className="mt-1 text-sm font-medium text-black">
                            Multispeciality Hospital
                          </p>

                          {/* Rating */}

                          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                            <div className="flex items-center gap-1 rounded-md bg-[#fff8e7] px-2 py-1">
                              <Star
                                size={14}
                                fill="#fbbf24"
                                stroke="#fbbf24"
                              />

                              <span className="text-sm font-bold text-black">
                                {hospital.rating}
                              </span>
                            </div>

                            <span className="text-xs text-black">
                              ({hospital.reviews.toLocaleString("en-IN")} reviews)
                            </span>
                          </div>

                          {/* Location */}

                          <div className="mt-3 flex items-start gap-2 text-sm text-black">
                            <MapPin
                              size={16}
                              className="mt-0.5 shrink-0 text-black"
                            />

                            <span>{hospital.address}</span>
                          </div>

                          {/* Emergency */}

                          <div className="mt-3 flex flex-wrap items-center gap-2">

                            {hospital.emergency && (
                              <span className="inline-flex items-center gap-1.5 rounded-md bg-[#ecfdf5] px-2.5 py-1.5 text-xs font-semibold text-black">
                                <CheckCircle2
                                  size={14}
                                  className="text-[#047857]"
                                />
                                24/7 Emergency
                              </span>
                            )}

                            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#f1f5f9] px-2.5 py-1.5 text-xs font-medium text-black">
                              <ShieldCheck size={14} />
                              Insurance Available
                            </span>

                          </div>

                          {/* Specialties */}

                          <div className="mt-3 flex flex-wrap gap-2">
                            {hospital.specialties.slice(0, 3).map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-[#e2e8f0] px-2.5 py-1 text-xs text-black"
                              >
                                {item}
                              </span>
                            ))}

                            {hospital.specialties.length > 3 && (
                              <span className="rounded-full border border-[#e2e8f0] px-2.5 py-1 text-xs text-black">
                                +{hospital.specialties.length - 3} more
                              </span>
                            )}
                          </div>

                        </div>

                        {/* View Details */}

                        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row lg:col-span-1 lg:flex-col">

                          <Link
                            href={`/hospitals/${hospital.slug}`}
                            className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#0878d1] px-4 text-sm font-semibold text-white transition hover:bg-[#0667b5]"
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
                            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-[#dce6f2] bg-white px-4 text-sm font-semibold text-black transition hover:border-[#0878d1] hover:bg-[#f4f9ff]"
                          >
                            <Navigation size={16} />
                            Get Directions
                          </a>

                        </div>

                      </div>

                      {/* Card Footer */}

                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#edf1f5] bg-[#fbfdff] px-4 py-3 sm:px-5">

                        <div className="flex items-center gap-2 text-xs font-medium text-black">
                          <Clock3 size={15} />
                          {hospital.open ? "Currently listed" : "Check availability"}
                        </div>

                        <Link
                          href={`/hospitals/${hospital.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-black transition hover:text-[#0878d1]"
                        >
                          Explore Hospital
                          <ChevronRight size={14} />
                        </Link>

                      </div>
                    </article>
                  ))}

                </div>
              ) : (

                /* =================================
                    NO RESULTS
                ================================= */

                <div className="rounded-xl border border-[#dce6f2] bg-white px-5 py-16 text-center sm:px-10">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eff6ff] text-[#0878d1]">
                    <Search size={28} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-black">
                    No Hospitals Found
                  </h3>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-black">
                    We couldn&apos;t find any hospitals matching your
                    search or selected filters. Try changing your search
                    or clearing the filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 inline-flex min-h-[46px] items-center justify-center rounded-lg bg-[#0878d1] px-6 text-sm font-semibold text-white transition hover:bg-[#0667b5]"
                  >
                    Clear All Filters
                  </button>

                </div>
              )}

              {/* Results Footer */}

              {filteredHospitals.length > 0 && (
                <div className="mt-5 rounded-xl border border-[#dce6f2] bg-white px-5 py-4">
                  <p className="text-center text-sm text-black">
                    Showing{" "}
                    <span className="font-bold">
                      {filteredHospitals.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold">
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