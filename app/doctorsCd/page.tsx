
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Home,
  Search,
  MapPin,
  ChevronDown,
  SlidersHorizontal,
  UserRound,
  Heart,
  Star,
  ArrowRight,
  X,
  CalendarCheck,
  BriefcaseMedical,
  RotateCcw,
} from "lucide-react";

/* =========================================
   THEME
========================================= */

const PRIMARY = "#4e44e1";
const SECONDARY = "#9122b4";

/* =========================================
   SPECIALTIES
========================================= */

const specialties = [
  "Cardiology",
  "Dermatology",
  "Orthopedics",
  "Gynecology",
  "Pediatrics",
  "Dentistry",
  "General Physician",
  "Neurology",
  "ENT",
];

/* =========================================
   LOCATIONS
========================================= */

const locations = [
  "All Locations",
  "Noida, Sector 18",
  "Noida, Sector 62",
  "Delhi",
  "Gurugram",
  "Mumbai",
];

/* =========================================
   DOCTORS DATA
========================================= */

const doctors = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialty: "Gynecology",
    experience: 12,
    qualification: "MBBS, MD (Gynecology)",
    rating: 4.9,
    reviews: 120,
    location: "Noida, Sector 18",
    fee: 700,
    image: "/images/doctors/dr-priya-sharma.jpg",
    slug: "dr-priya-sharma",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Rahul Mehta",
    specialty: "Dermatology",
    experience: 8,
    qualification: "MBBS, MD (Dermatology)",
    rating: 4.7,
    reviews: 98,
    location: "Noida, Sector 62",
    fee: 600,
    image: "/images/doctors/dr-rahul-mehta.jpg",
    slug: "dr-rahul-mehta",
    available: true,
  },
  {
    id: 3,
    name: "Dr. Neha Gupta",
    specialty: "Cardiology",
    experience: 10,
    qualification: "MBBS, DM (Cardiology)",
    rating: 4.9,
    reviews: 150,
    location: "Delhi",
    fee: 900,
    image: "/images/doctors/dr-neha-gupta.jpg",
    slug: "dr-neha-gupta",
    available: true,
  },
  {
    id: 4,
    name: "Dr. Amit Verma",
    specialty: "Orthopedics",
    experience: 15,
    qualification: "MBBS, MS (Orthopedics)",
    rating: 4.8,
    reviews: 85,
    location: "Noida, Sector 18",
    fee: 800,
    image: "/images/doctors/dr-amit-verma.jpg",
    slug: "dr-amit-verma",
    available: false,
  },
  {
    id: 5,
    name: "Dr. Anjali Singh",
    specialty: "Pediatrics",
    experience: 6,
    qualification: "MBBS, MD (Pediatrics)",
    rating: 4.8,
    reviews: 110,
    location: "Gurugram",
    fee: 500,
    image: "/images/doctors/dr-anjali-singh.jpg",
    slug: "dr-anjali-singh",
    available: true,
  },
  {
    id: 6,
    name: "Dr. Karan Malhotra",
    specialty: "Dentistry",
    experience: 9,
    qualification: "BDS, MDS",
    rating: 4.6,
    reviews: 75,
    location: "Mumbai",
    fee: 400,
    image: "/images/doctors/dr-karan-malhotra.jpg",
    slug: "dr-karan-malhotra",
    available: true,
  },
];

type Doctor = (typeof doctors)[number];

/* =========================================
   FILTER SIDEBAR
========================================= */

type FilterContentProps = {
  location: string;
  setLocation: (value: string) => void;
  selectedSpecialties: string[];
  toggleSpecialty: (value: string) => void;
  experience: string;
  setExperience: (value: string) => void;
  clearFilters: () => void;
};

function FilterContent({
  location,
  setLocation,
  selectedSpecialties,
  toggleSpecialty,
  experience,
  setExperience,
  clearFilters,
}: FilterContentProps) {
  return (
    <>
      {/* FILTER HEADER */}
      <div className="flex h-[62px] items-center justify-between border-b border-[#ebe8f4] px-5">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal
            size={18}
            className="text-[#4e44e1]"
          />

          <h2 className="text-base font-bold text-[#171526]">
            Filters
          </h2>
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
      <div className="border-b border-[#ebe8f4] px-5 py-5">
        <label
          htmlFor="filter-location"
          className="mb-3 block text-sm font-bold text-[#171526]"
        >
          Location
        </label>

        <div className="relative">
          <select
            id="filter-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-11 w-full appearance-none rounded-lg border border-[#dedbef] bg-white px-3 pr-9 text-[13px] text-[#4b5568] outline-none transition focus:border-[#4e44e1] focus:ring-2 focus:ring-[#4e44e1]/10"
          >
            {locations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#77758e]"
          />
        </div>
      </div>

      {/* SPECIALTIES */}
      <div className="border-b border-[#ebe8f4] px-5 py-5">
        <h3 className="mb-4 text-sm font-bold text-[#171526]">
          Specialty
        </h3>

        <div className="space-y-3">
          {specialties.map((specialty) => (
            <label
              key={specialty}
              className="group flex cursor-pointer items-center gap-3 text-sm text-[#55566c] transition hover:text-[#4e44e1]"
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

      {/* EXPERIENCE */}
      <div className="px-5 py-5">
        <h3 className="mb-4 text-sm font-bold text-[#171526]">
          Experience
        </h3>

        <div className="space-y-3">
          {[
            { label: "Any Experience", value: "all" },
            { label: "0–5 years", value: "0-5" },
            { label: "5–10 years", value: "5-10" },
            { label: "10+ years", value: "10+" },
          ].map((item) => (
            <label
              key={item.value}
              className="flex cursor-pointer items-center gap-3 text-sm text-[#55566c] transition hover:text-[#4e44e1]"
            >
              <input
                type="radio"
                name="experience"
                value={item.value}
                checked={experience === item.value}
                onChange={() => setExperience(item.value)}
                className="h-4 w-4 shrink-0 cursor-pointer accent-[#4e44e1]"
              />

              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}

/* =========================================
   DOCTORS PAGE
========================================= */

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [experience, setExperience] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /* TOGGLE SPECIALTY */

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((item) => item !== specialty)
        : [...prev, specialty]
    );
  };

  /* CLEAR FILTERS */

  const clearFilters = () => {
    setSearch("");
    setLocation("All Locations");
    setSelectedSpecialties([]);
    setExperience("all");
    setSortBy("recommended");
  };

  /* FILTER AND SORT */

  const filteredDoctors = useMemo(() => {
    const query = search.toLowerCase().trim();

    let result = doctors.filter((doctor) => {
      const matchesSearch =
        !query ||
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query) ||
        doctor.qualification.toLowerCase().includes(query);

      const matchesLocation =
        location === "All Locations" || doctor.location === location;

      const matchesSpecialty =
        selectedSpecialties.length === 0 ||
        selectedSpecialties.includes(doctor.specialty);

      const matchesExperience =
        experience === "all" ||
        (experience === "0-5" && doctor.experience <= 5) ||
        (experience === "5-10" &&
          doctor.experience >= 5 &&
          doctor.experience <= 10) ||
        (experience === "10+" && doctor.experience >= 10);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesSpecialty &&
        matchesExperience
      );
    });

    if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "experience") {
      result = [...result].sort(
        (a, b) => b.experience - a.experience
      );
    } else if (sortBy === "fee-low") {
      result = [...result].sort((a, b) => a.fee - b.fee);
    } else if (sortBy === "fee-high") {
      result = [...result].sort((a, b) => b.fee - a.fee);
    }

    return result;
  }, [search, location, selectedSpecialties, experience, sortBy]);

  return (
    <main className="min-h-screen bg-[#fbfaff] text-[#171526]">

      {/* =====================================
          HERO / SEARCH
      ===================================== */}

      <section className="relative isolate overflow-hidden border-b border-[#ebe8f4] bg-gradient-to-br from-[#f1efff] via-white to-[#fbf0ff] px-5 pb-10 pt-8 sm:px-8 sm:pb-12 sm:pt-10 lg:px-8 lg:pb-14 lg:pt-12">

        {/* BACKGROUND DECORATION */}
        <div className="pointer-events-none absolute -left-28 -top-28 -z-10 h-80 w-80 rounded-full bg-[#4e44e1]/10 blur-[100px]" />

        <div className="pointer-events-none absolute -right-20 top-12 -z-10 h-72 w-72 rounded-full bg-[#9122b4]/10 blur-[100px]" />

        <div className="relative mx-auto max-w-[1280px]">

          {/* BREADCRUMB */}
          <div className="mb-5 flex items-center gap-3 text-sm font-medium">
            <Link
              href="/"
              aria-label="Home"
              className="flex items-center gap-2 text-[#68677e] transition hover:text-[#4e44e1]"
            >
              <Home size={16} />
              <span>Home</span>
            </Link>

            <ChevronDown
              size={14}
              className="-rotate-90 text-[#aaa7c0]"
            />

            <span className="font-semibold text-[#4e44e1]">
              Doctors
            </span>
          </div>

          {/* HERO CONTENT */}
          <div className="flex items-center justify-between gap-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#ded9ff] bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#4e44e1] shadow-sm">
                <Heart size={14} />
                Healthcare made simpler
              </span>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-[-1.2px] text-[#171526] sm:text-4xl lg:text-[46px]">
                Find the Right{" "}
                <span className="bg-gradient-to-r from-[#4e44e1] to-[#9122b4] bg-clip-text text-transparent">
                  Doctor
                </span>{" "}
                for You
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#68677e] sm:text-base sm:leading-8">
                Discover experienced healthcare professionals, compare
                specialities and consultation fees, and find a doctor
                who fits your needs.
              </p>
            </div>

            {/* HERO ICON */}
            <div className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-[28px] border border-white bg-white/80 text-[#4e44e1] shadow-[0_15px_45px_rgba(78,68,225,0.10)] sm:flex lg:h-28 lg:w-28">
              <UserRound
                size={46}
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* SEARCH FORM */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 grid grid-cols-1 gap-3 rounded-2xl border border-[#e7e2f7] bg-white p-3 shadow-[0_12px_40px_rgba(78,68,225,0.08)] sm:grid-cols-[minmax(0,1fr)_220px] lg:grid-cols-[minmax(0,1fr)_230px_145px] lg:gap-3"
          >
            {/* SEARCH INPUT */}
            <div className="flex h-[52px] min-w-0 items-center gap-3 rounded-xl border border-[#e7e3f2] bg-[#fcfbff] px-4 transition focus-within:border-[#4e44e1] focus-within:ring-2 focus-within:ring-[#4e44e1]/10">
              <Search
                size={19}
                className="shrink-0 text-[#85829e]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search doctor, specialty or qualification..."
                aria-label="Search doctors"
                className="h-full w-full min-w-0 bg-transparent text-sm text-[#171526] outline-none placeholder:text-[#9996ad] sm:text-[15px]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="shrink-0 text-[#85829e] transition hover:text-[#4e44e1]"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* LOCATION */}
            <div className="relative flex h-[52px] items-center gap-3 rounded-xl border border-[#e7e3f2] bg-[#fcfbff] px-4 transition focus-within:border-[#4e44e1]">
              <MapPin
                size={18}
                className="shrink-0 text-[#4e44e1]"
              />

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                aria-label="Filter by location"
                className="h-full w-full min-w-0 appearance-none bg-transparent pr-5 text-sm font-medium text-[#4b4961] outline-none"
              >
                {locations.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-3 text-[#85829e]"
              />
            </div>

            {/* SEARCH BUTTON */}
            <button
              type="submit"
              className="flex h-[52px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-5 text-sm font-bold text-white shadow-[0_7px_18px_rgba(78,68,225,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(145,34,180,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4e44e1] focus-visible:ring-offset-2"
            >
              <Search size={18} />
              Search
            </button>
          </form>

          {/* QUICK STATS */}
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-[#68677e] sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eae7ff] text-[#4e44e1]">
                <UserRound size={12} />
              </span>
              Experienced professionals
            </span>

            <span className="inline-flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f4e5fb] text-[#9122b4]">
                <CalendarCheck size={12} />
              </span>
              Convenient appointment booking
            </span>
          </div>
        </div>
      </section>

      {/* =====================================
          DOCTOR LISTING
      ===================================== */}

      <section className="px-5 py-8 bg-white sm:px-8 sm:py-10 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-[1280px] ">

          {/* SECTION INTRO */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#4e44e1]">
                Explore specialists
              </p>

              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#171526] sm:text-[28px]">
                Doctors Near You
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#77758c]">
                Compare profiles and choose the right healthcare professional.
              </p>
            </div>

            {(search ||
              location !== "All Locations" ||
              selectedSpecialties.length > 0 ||
              experience !== "all" ||
              sortBy !== "recommended") && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 self-start rounded-lg px-3 py-2 text-sm font-semibold text-[#4e44e1] transition hover:bg-[#f0edff]"
              >
                <RotateCcw size={15} />
                Reset all filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[265px_minmax(0,1fr)] xl:grid-cols-[285px_minmax(0,1fr)] xl:gap-6">

            {/* MOBILE FILTER TOGGLE */}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen((prev) => !prev)}
              aria-expanded={mobileFiltersOpen}
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#e5e0f4] bg-white text-sm font-semibold text-[#4e44e1] shadow-sm transition hover:bg-[#f6f4ff] lg:hidden"
            >
              <SlidersHorizontal size={18} />

              {mobileFiltersOpen ? "Hide Filters" : "Show Filters"}

              <ChevronDown
                size={17}
                className={`transition-transform ${
                  mobileFiltersOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* FILTER SIDEBAR */}
            <aside
              className={`overflow-hidden rounded-2xl border border-[#e7e3f2] bg-white shadow-[0_4px_18px_rgba(40,35,90,0.03)] ${
                mobileFiltersOpen ? "block" : "hidden"
              } lg:sticky lg:top-24 lg:block`}
            >
              <FilterContent
                location={location}
                setLocation={setLocation}
                selectedSpecialties={selectedSpecialties}
                toggleSpecialty={toggleSpecialty}
                experience={experience}
                setExperience={setExperience}
                clearFilters={clearFilters}
              />
            </aside>

            {/* RESULTS */}
            <div className="min-w-0">

              {/* RESULTS TOOLBAR */}
              <div className="flex flex-col gap-4 rounded-2xl border border-[#e7e3f2] bg-white p-4 shadow-[0_4px_18px_rgba(40,35,90,0.03)] sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div>
                  <p className="text-sm text-[#77758c]">
                    Showing{" "}
                    <span className="font-extrabold text-[#171526]">
                      {filteredDoctors.length}
                    </span>{" "}
                    {filteredDoctors.length === 1 ? "doctor" : "doctors"}
                  </p>

                  <p className="mt-1 text-xs text-[#9996ad]">
                    Find a specialist for your healthcare needs
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <label
                    htmlFor="sort-doctors"
                    className="shrink-0 text-xs font-semibold text-[#68677e]"
                  >
                    Sort by
                  </label>

                  <div className="relative min-w-0 flex-1 sm:flex-none">
                    <select
                      id="sort-doctors"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="h-10 w-full min-w-0 appearance-none rounded-lg border border-[#e1ddef] bg-[#fcfbff] py-2 pl-3 pr-9 text-xs font-semibold text-[#4b4961] outline-none transition focus:border-[#4e44e1] sm:min-w-[165px]"
                    >
                      <option value="recommended">Recommended</option>
                      <option value="rating">Highest Rated</option>
                      <option value="experience">Most Experienced</option>
                      <option value="fee-low">Fee: Low to High</option>
                      <option value="fee-high">Fee: High to Low</option>
                    </select>

                    <ChevronDown
                      size={15}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#85829e]"
                    />
                  </div>
                </div>
              </div>

              {/* DOCTOR CARDS */}
              <div className="mt-5 space-y-5">
                {filteredDoctors.map((doctor: Doctor) => (
                  <article
                    key={doctor.id}
                    className="group overflow-hidden rounded-2xl border border-[#e7e3f2] bg-white p-4 shadow-[0_4px_18px_rgba(40,35,90,0.025)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#cfc8fa] hover:shadow-[0_14px_35px_rgba(78,68,225,0.08)] sm:p-5 lg:p-6"
                  >
                    {/* TOP ROW */}
                    <div className="flex flex-col gap-5 sm:flex-row">

                      {/* IMAGE */}
                      <Link
                        href={`/doctors/${doctor.slug}`}
                        aria-label={`View ${doctor.name}'s profile`}
                        className="relative h-[175px] w-[140px] shrink-0 self-start overflow-hidden rounded-xl border border-[#eeeaf7] bg-[#f1eff9] sm:h-[155px] sm:w-[125px] lg:h-[165px] lg:w-[135px]"
                      >
                        <Image
                          src={doctor.image}
                          alt={doctor.name}
                          fill
                          sizes="(max-width: 640px) 140px, 135px"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>

                      {/* DETAILS */}
                      <div className="min-w-0 flex-1">

                        {/* NAME + STATUS */}
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <Link
                              href={`/doctors/${doctor.slug}`}
                              className="text-xl font-extrabold tracking-tight text-[#171526] transition-colors hover:text-[#4e44e1] sm:text-[22px]"
                            >
                              {doctor.name}
                            </Link>

                            <div className="mt-2 inline-flex items-center rounded-lg bg-gradient-to-r from-[#f0edff] to-[#f9edff] px-3 py-1.5 text-xs font-bold text-[#4e44e1]">
                              <BriefcaseMedical
                                size={14}
                                className="mr-2"
                              />
                              {doctor.specialty}
                            </div>
                          </div>

                          {doctor.available ? (
                            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#d5f3e4] bg-[#f0fcf6] px-3 py-1.5 text-[11px] font-bold text-[#16825d]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#22a574]" />
                              Available Today
                            </span>
                          ) : (
                            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#eee3f2] bg-[#faf5fc] px-3 py-1.5 text-[11px] font-semibold text-[#77758c]">
                              Availability Unconfirmed
                            </span>
                          )}
                        </div>

                        {/* EXPERIENCE */}
                        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#68677e]">
                          <span className="inline-flex items-center gap-2">
                            <BriefcaseMedical
                              size={15}
                              className="text-[#8b83e9]"
                            />
                            {doctor.experience}+ years experience
                          </span>

                          <span className="hidden h-4 w-px bg-[#e7e3f2] sm:block" />

                          <span>{doctor.qualification}</span>
                        </div>

                        {/* PROFILE LINK */}
                        <Link
                          href={`/doctors/${doctor.slug}`}
                          className="group/link mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#4e44e1] transition-colors hover:text-[#9122b4]"
                        >
                          View Doctor Profile

                          <ArrowRight
                            size={16}
                            className="transition-transform group-hover/link:translate-x-1"
                          />
                        </Link>
                      </div>
                    </div>

                    {/* DIVIDER */}
                    <div className="my-5 border-t border-[#eeeaf6] sm:ml-[145px]" />

                    {/* RATING + LOCATION */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:ml-[145px] lg:ml-[155px]">

                      {/* RATING */}
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#fff7e6]">
                          <Star
                            size={16}
                            fill="#f5ad35"
                            stroke="#f5ad35"
                          />
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-extrabold text-[#171526]">
                            {doctor.rating}
                          </span>

                          <span className="text-xs text-[#9996ad]">
                            ({doctor.reviews} reviews)
                          </span>
                        </div>
                      </div>

                      <span className="hidden h-5 w-px bg-[#e7e3f2] sm:block" />

                      {/* LOCATION */}
                      <div className="inline-flex items-center gap-2 text-sm text-[#68677e]">
                        <MapPin
                          size={16}
                          className="shrink-0 text-[#8b83e9]"
                        />

                        {doctor.location}
                      </div>
                    </div>

                    {/* DIVIDER */}
                    <div className="my-5 border-t border-[#eeeaf6] sm:ml-[145px] lg:ml-[155px]" />

                    {/* FEE + BUTTONS */}
                    <div className="flex flex-col gap-4 sm:ml-[145px] sm:flex-row sm:items-center sm:justify-between lg:ml-[155px]">

                      {/* FEE */}
                      <div>
                        <p className="text-xs font-medium text-[#9996ad]">
                          Consultation Fee
                        </p>

                        <div className="mt-1 flex items-baseline gap-1.5">
                          <span className="text-2xl font-extrabold tracking-tight text-[#171526]">
                            ₹{doctor.fee.toLocaleString("en-IN")}
                          </span>

                          <span className="text-xs text-[#85829e]">
                            / visit
                          </span>
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div className="flex flex-wrap gap-2.5">
                        <Link
                          href={`/doctors/${doctor.slug}`}
                          className="inline-flex h-11 items-center justify-center rounded-xl border border-[#dcd6f4] bg-white px-4 text-xs font-bold text-[#4e44e1] transition-all hover:border-[#4e44e1] hover:bg-[#f6f4ff] sm:px-5 sm:text-sm"
                        >
                          View Profile
                        </Link>

                        <Link
                          href={`/appointments/book?doctor=${doctor.slug}`}
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-4 text-xs font-bold text-white shadow-[0_5px_14px_rgba(78,68,225,0.17)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(145,34,180,0.25)] sm:px-5 sm:text-sm"
                        >
                          <CalendarCheck size={16} />
                          Book Appointment
                          <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}

                {/* NO RESULTS */}
                {filteredDoctors.length === 0 && (
                  <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#dcd6f4] bg-white px-5 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0edff] to-[#f9edff] text-[#4e44e1]">
                      <Search size={27} />
                    </div>

                    <h3 className="mt-5 text-xl font-extrabold text-[#171526]">
                      No doctors found
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-[#77758c]">
                      We couldn't find any doctors matching your current
                      search and filters. Try adjusting your selection.
                    </p>

                    <button
                      type="button"
                      onClick={clearFilters}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:shadow-lg"
                    >
                      <RotateCcw size={16} />
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
