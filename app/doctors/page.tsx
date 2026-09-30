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
  BriefcaseMedical,
  Wallet,
  Star,
  ArrowRight,
  X,
} from "lucide-react";

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
   DOCTORS PAGE
========================================= */

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    []
  );
  const [experience, setExperience] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /* =========================================
     TOGGLE SPECIALTY
  ========================================= */

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((item) => item !== specialty)
        : [...prev, specialty]
    );
  };

  /* =========================================
     CLEAR FILTERS
  ========================================= */

  const clearFilters = () => {
    setSearch("");
    setLocation("All Locations");
    setSelectedSpecialties([]);
    setExperience("all");
    setSortBy("recommended");
  };

  /* =========================================
     FILTER AND SORT DOCTORS
  ========================================= */

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

  /* =========================================
     FILTER SIDEBAR CONTENT
  ========================================= */

  const FilterContent = () => (
    <>
      {/* FILTER HEADER */}
      <div className="flex h-[60px] items-center justify-between border-b border-[#dce6f2] px-5">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal
            size={19}
            className="text-text-black"
          />

          <h2 className="text-[16px] font-semibold text-black">
            Filters
          </h2>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="text-[13px] font-semibold text-[#0878d1] transition-colors hover:text-[#075ca5]"
        >
          Clear All
        </button>
      </div>

      {/* LOCATION FILTER */}
      <div className="border-b border-[#dce6f2] px-5 py-5">
        <label
          htmlFor="filter-location"
          className="mb-3 block text-[15px] font-semibold text-black"
        >
          Location
        </label>

        <div className="relative">
          <select
            id="filter-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-[43px] w-full appearance-none rounded-[8px] border border-[#cbd8e8] bg-white px-3 pr-9 text-[13px] text-[#344f6a] outline-none transition focus:border-[#0878d1] focus:ring-2 focus:ring-[#0878d1]/10"
          >
            {locations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#53677f]"
          />
        </div>
      </div>

      {/* SPECIALTY FILTER */}
      <div className="border-b border-[#dce6f2] px-5 py-5">
        <h3 className="mb-4 text-[15px] font-semibold text-black">
          Specialty
        </h3>

        <div className="space-y-3">
          {specialties.map((specialty) => (
            <label
              key={specialty}
              className="flex cursor-pointer items-center gap-3 text-[14px] text-[#344f6a] transition-colors hover:text-[#0878d1]"
            >
              <input
                type="checkbox"
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => toggleSpecialty(specialty)}
                className="h-[15px] w-[15px] shrink-0 cursor-pointer accent-[#0878d1]"
              />

              <span>{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      {/* EXPERIENCE FILTER */}
      <div className="px-5 py-5">
        <h3 className="mb-4 text-[15px] font-semibold text-black">
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
              className="flex cursor-pointer items-center gap-3 text-[14px] text-[#344f6a] transition-colors hover:text-[#0878d1]"
            >
              <input
                type="radio"
                name="experience"
                value={item.value}
                checked={experience === item.value}
                onChange={() => setExperience(item.value)}
                className="h-[15px] w-[15px] shrink-0 cursor-pointer accent-[#0878d1]"
              />

              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  /* =========================================
     PAGE UI
  ========================================= */

  return (
    <main className="min-h-screen bg-white text-black">

      {/* =====================================
          FIND DOCTORS HEADER
      ===================================== */}

      <section className="relative overflow-hidden border-b border-[#cfe2f8] bg-gradient-to-r from-[#eaf5ff] via-[#f4faff] to-[#e4f2ff] px-5 pb-9 pt-8 sm:px-8 lg:px-[5.25%] lg:pb-[38px] lg:pt-[38px]">
        <div className="relative z-10 mx-auto max-w-7xl">

          {/* BREADCRUMB */}
          <div className="mb-4 flex items-center gap-3 text-[14px] font-medium">
            <Link
              href="/"
              aria-label="Home"
              className="text-black transition-colors hover:text-[#104e9c]"
            >
              <Home size={17} fill="currentColor" />
            </Link>

            <span className="text-[#7b91aa]">/</span>

            <span className="text-black">
              Doctors
            </span>
          </div>

          {/* TITLE AND ICON */}
          <div className="flex items-center justify-between gap-5">
            <div>
              <h1 className="text-[34px] font-extrabold leading-[1.2] tracking-[-1px] text-black sm:text-[40px] lg:text-[42px]">
                Find Doctors
              </h1>

              <p className="mt-3 max-w-[750px] text-[16px] font-medium leading-7 text-[#405975] sm:text-[18px]">
                Book appointments with experienced, top-rated doctors near you.
              </p>
            </div>

            {/* DOCTOR ICON */}
            <div className="hidden h-[62px] w-[62px] shrink-0 items-center justify-center rounded-[16px] border border-white bg-white text-[#0878d1] shadow-[0_5px_16px_rgba(24,59,96,0.10)] sm:flex">
              <UserRound
                size={29}
                strokeWidth={2.2}
                fill="#0878d1"
                className="text-white"
              />
            </div>
          </div>

          {/* SEARCH FORM */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_205px_125px] lg:grid-cols-[minmax(0,1fr)_210px_130px] lg:gap-4"
          >
            {/* SEARCH INPUT */}
            <div className="flex h-[52px] items-center gap-3 rounded-[10px] border border-[#c5d6e9] bg-white px-4 transition-colors focus-within:border-[#0878d1] focus-within:ring-2 focus-within:ring-[#0878d1]/15">
              <Search
                size={18}
                className="shrink-0 text-[#7189a5]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search doctor, specialty or name..."
                aria-label="Search doctors"
                className="h-full w-full min-w-0 bg-transparent text-[15px] font-medium text-black outline-none placeholder:font-normal placeholder:text-[#71839c] sm:text-[16px]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="shrink-0 text-[#71839c] transition hover:text-black"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* LOCATION DROPDOWN */}
            <div className="relative flex h-[52px] items-center gap-3 rounded-[10px] border border-[#c5d6e9] bg-white px-4 transition-colors focus-within:border-[#0878d1]">
              <MapPin
                size={17}
                fill="#7189a5"
                className="shrink-0 text-white"
              />

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                aria-label="Filter by location"
                className="h-full w-full min-w-0 appearance-none bg-transparent pr-5 text-[14px] font-medium text-[#344f6a] outline-none sm:text-[15px]"
              >
                {locations.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-3 text-[#53677f]"
              />
            </div>

            {/* SEARCH BUTTON */}
            <button
              type="submit"
              className="flex h-[52px] items-center justify-center gap-2 rounded-[10px] bg-[#0878d1] px-5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#0667b5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0878d1] focus-visible:ring-offset-2"
            >
              <Search size={18} strokeWidth={2.5} />
              Search
            </button>
          </form>
        </div>
      </section>

      {/* =====================================
          DOCTORS LISTING SECTION
      ===================================== */}

      <section className="bg-white px-5 py-9 sm:px-8 lg:px-[5.25%] lg:py-[38px]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-5 lg:grid-cols-[270px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-5">

          {/* MOBILE FILTER BUTTON */}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex h-[48px] items-center justify-center gap-2 rounded-[9px] border border-[#dce6f2] bg-white text-[15px] font-medium text-black lg:hidden"
          >
            <SlidersHorizontal
              size={18}
              className="text-[#0878d1]"
            />

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
            className={`overflow-hidden rounded-[13px] border border-[#dce6f2] bg-white ${
              mobileFiltersOpen ? "block" : "hidden"
            } lg:block`}
          >
            <FilterContent />
          </aside>

          {/* RIGHT CONTENT */}
          <div className="min-w-0">

            {/* RESULTS TOOLBAR */}
            <div className="flex min-h-[68px] flex-wrap items-center justify-between gap-3 rounded-[11px] border border-[#dce6f2] bg-[#f8fafc] px-4 py-3 sm:px-5">
              <p className="text-[14px] text-[#53677f] sm:text-[15px]">
                Showing{" "}
                <span className="mx-1 font-bold text-black">
                  {filteredDoctors.length}
                </span>{" "}
                doctors
              </p>

              <div className="flex items-center gap-3">
                <label
                  htmlFor="sort-doctors"
                  className="whitespace-nowrap text-[13px] font-medium text-black"
                >
                  Sort by:
                </label>

                <div className="relative">
                  <select
                    id="sort-doctors"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-[42px] min-w-[145px] appearance-none rounded-[8px] border border-[#cbd8e8] bg-white px-3 pr-9 text-[13px] text-black  outline-none transition focus:border-[#0878d1]"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="rating">Highest Rated</option>
                    <option value="experience">Most Experienced</option>
                    <option value="fee-low">Fee: Low to High</option>
                    <option value="fee-high">Fee: High to Low</option>
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#53677f]"
                  />
                </div>
              </div>
            </div>

            {/* DOCTOR CARDS */}
            <div className="mt-[18px] space-y-[18px]">

              {filteredDoctors.map((doctor: Doctor) => (
                <article
                  key={doctor.id}
                  className="rounded-[15px] border border-[#dce6f2] bg-white p-5 shadow-[0_1px_3px_rgba(24,59,96,0.04)] transition-all duration-300 hover:border-[#b9d5f5] hover:shadow-[0_8px_24px_rgba(24,59,96,0.07)] sm:p-[22px]"
                >
                  {/* TOP ROW */}
                  <div className="flex flex-col gap-5 sm:flex-row">

                    {/* DOCTOR IMAGE */}
                    <Link
                      href={`/doctors/${doctor.slug}`}
                      aria-label={`View ${doctor.name}'s profile`}
                      className="relative h-[160px] w-[125px] shrink-0 self-start overflow-hidden rounded-[13px] border border-[#e0e6ed] bg-[#e9edf2] sm:h-[145px] sm:w-[120px] lg:h-[150px] lg:w-[125px]"
                    >
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        sizes="(max-width: 640px) 125px, 125px"
                        className="object-cover object-top transition-transform duration-300 hover:scale-105"
                      />
                    </Link>

                    {/* DOCTOR DETAILS */}
                    <div className="min-w-0 flex-1">

                      {/* NAME AND AVAILABILITY */}
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h2 className="text-[20px] font-bold leading-[28px] tracking-[-0.3px] text-black sm:text-[21px]">
                            {doctor.name}
                          </h2>

                          <p className="mt-[4px] text-[15px] font-medium text-[#0878d1] sm:text-[16px]">
                            {doctor.specialty}
                          </p>
                        </div>

                        {doctor.available && (
                          <span className="inline-flex h-[34px] shrink-0 items-center gap-[8px] rounded-full border border-[#c9f5e3] bg-[#effdf7] px-[13px] text-[12px] font-semibold text-[#047857]">
                            <span className="h-[6px] w-[6px] rounded-full bg-[#059669]" />
                            Available Today
                          </span>
                        )}
                      </div>

                      {/* EXPERIENCE AND QUALIFICATION */}
                      <div className="mt-[11px] flex flex-wrap items-center gap-x-[13px] gap-y-2 text-[14px] leading-5 text-[#344f6a]">
                        <span>
                          {doctor.experience}+ years experience
                        </span>

                        <span className="hidden h-[18px] w-px bg-[#d5dfeb] sm:block" />

                        <span className="text-[#53677f]">
                          {doctor.qualification}
                        </span>
                      </div>

                      {/* PROFILE LINK */}
                      <Link
                        href={`/doctors/${doctor.slug}`}
                        className="group mt-[11px] inline-flex items-center gap-[7px] text-[14px] font-semibold text-black transition-colors hover:text-[#075ca5]"
                      >
                        View Doctor Profile

                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>

                  {/* DIVIDER */}
                  <div className="my-[17px] border-t border-[#e8eef5] sm:ml-[145px]" />

                  {/* RATING AND LOCATION */}
                  <div className="flex flex-wrap items-center gap-x-[22px] gap-y-3 sm:ml-[145px]">
                    {/* RATING */}
                    <div className="flex items-center gap-[8px]">
                      <Star
                        size={17}
                        fill="#fbbf24"
                        stroke="#fbbf24"
                      />

                      <span className="text-[14px] font-bold text-black">
                        {doctor.rating}
                      </span>

                      <span className="text-[13px] text-[#71839c]">
                        ({doctor.reviews} reviews)
                      </span>
                    </div>

                    <span className="hidden h-[18px] w-px bg-[#dce6f2] sm:block" />

                    {/* LOCATION */}
                    <div className="flex items-center gap-[8px] text-[13px] text-[#344f6a]">
                      <MapPin
                        size={17}
                        fill="#0878d1"
                        stroke="white"
                      />

                      {doctor.location}
                    </div>
                  </div>

                  {/* BOTTOM DIVIDER */}
                  <div className="my-[17px] border-t border-[#dce6f2] sm:ml-[145px]" />

                  {/* FEE AND ACTION BUTTONS */}
                  <div className="flex flex-col gap-4 sm:ml-[145px] sm:flex-row sm:items-center sm:justify-between">

                    {/* CONSULTATION FEE */}
                    <div>
                      <p className="text-[13px] text-[#71839c]">
                        Consultation Fee
                      </p>

                      <div className="mt-[4px] flex items-baseline gap-[6px]">
                        <span className="text-[23px] font-bold text-black">
                          ₹{doctor.fee}
                        </span>

                        <span className="text-[13px] text-[#53677f]">
                          / visit
                        </span>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-wrap items-center gap-[10px]">
                      <Link
                        href={`/doctors/${doctor.slug}`}
                        className="inline-flex h-[42px] items-center justify-center rounded-[9px] border border-[#0878d1] px-[19px] text-[13px] font-semibold text-black transition-colors hover:bg-[#eff7ff]"
                      >
                        View Profile
                      </Link>

                      <Link
  href={`/appointments/book?doctor=${doctor.slug}`}
  className="inline-flex h-[42px] items-center justify-center gap-[9px] rounded-[9px] bg-[#0878d1] px-[18px] text-[13px] font-semibold text-white transition-colors hover:bg-[#0667b5]"
>
  Book Appointment
  <ArrowRight size={16} />
</Link>
                    </div>
                  </div>
                </article>
              ))}

              {/* NO RESULTS */}
              {filteredDoctors.length === 0 && (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[15px] border border-dashed border-[#cbd8e8] bg-[#f8fafc] px-5 text-center">
                  <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#eaf2ff] text-black">
                    <Search size={25} />
                  </div>

                  <h3 className="mt-5 text-[20px] font-semibold text-black">
                    No doctors found
                  </h3>

                  <p className="mt-2 text-[15px] text-[#53677f]">
                    Try changing your search or filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 rounded-[9px] bg-[#0878d1] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#0667b5]"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}