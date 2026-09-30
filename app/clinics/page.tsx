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
  Phone,
} from "lucide-react";

/* =========================================
   PAGE SEO
========================================= */

const PAGE_TITLE = "Find Clinics Near You | HealthCare360";

const PAGE_DESCRIPTION =
  "Find and explore trusted clinics near you. Compare clinic specialties, ratings, locations and consultation options on HealthCare360.";

/* =========================================
   CLINIC SPECIALTIES
========================================= */

const specialties = [
  "All Specialties",
  "Dental",
  "Skin & Hair",
  "Physiotherapy",
  "ENT",
  "General Physician",
  "Pediatrics",
  "Cardiology",
  "Orthopedics",
  "Gynecology",
  "Eye Care",
];

/* =========================================
   CLINIC LOCATIONS
========================================= */

const locations = [
  "All Locations",
  "Noida",
  "Noida, Sector 18",
  "Noida, Sector 62",
  "Delhi",
  "Gurugram",
  "Mumbai",
];

/* =========================================
   CLINIC DATA
   Replace image paths with your actual
   clinic images whenever available.
========================================= */

const clinics = [
  {
    id: 1,
    name: "Smile Dental Clinic",
    specialty: "Dental",
    description: "Complete Dental Care",
    rating: 4.9,
    reviews: 120,
    location: "Noida, Sector 18",
    address: "Sector 18, Noida, Uttar Pradesh",
    openingHours: "9:00 AM - 8:00 PM",
    consultationModes: ["In-Clinic"],
    image: "/images/clinics/smile-dental-clinic.jpg",
    slug: "smile-dental-clinic",
    available: true,
    popular: 98,
  },
  {
    id: 2,
    name: "Skin Care Clinic",
    specialty: "Skin & Hair",
    description: "Dermatology & Aesthetics",
    rating: 4.8,
    reviews: 96,
    location: "Noida, Sector 62",
    address: "Sector 62, Noida, Uttar Pradesh",
    openingHours: "10:00 AM - 7:00 PM",
    consultationModes: ["In-Clinic", "Online"],
    image: "/images/clinics/skin-care-clinic.jpg",
    slug: "skin-care-clinic",
    available: true,
    popular: 92,
  },
  {
    id: 3,
    name: "Life Care Physiotherapy",
    specialty: "Physiotherapy",
    description: "Physiotherapy & Rehabilitation",
    rating: 4.7,
    reviews: 85,
    location: "Delhi",
    address: "South Delhi, New Delhi",
    openingHours: "8:00 AM - 8:00 PM",
    consultationModes: ["In-Clinic"],
    image: "/images/clinics/life-care-physiotherapy.jpg",
    slug: "life-care-physiotherapy",
    available: true,
    popular: 88,
  },
  {
    id: 4,
    name: "Apollo Clinic",
    specialty: "General Physician",
    description: "General Medical Services",
    rating: 4.8,
    reviews: 145,
    location: "Gurugram",
    address: "Gurugram, Haryana",
    openingHours: "9:00 AM - 9:00 PM",
    consultationModes: ["In-Clinic", "Online"],
    image: "/images/clinics/apollo-clinic.jpg",
    slug: "apollo-clinic",
    available: true,
    popular: 96,
  },
  {
    id: 5,
    name: "City ENT Clinic",
    specialty: "ENT",
    description: "Ear, Nose & Throat Care",
    rating: 4.6,
    reviews: 72,
    location: "Noida, Sector 18",
    address: "Sector 18, Noida, Uttar Pradesh",
    openingHours: "10:00 AM - 6:00 PM",
    consultationModes: ["In-Clinic"],
    image: "/images/clinics/city-ent-clinic.jpg",
    slug: "city-ent-clinic",
    available: false,
    popular: 78,
  },
  {
    id: 6,
    name: "Family Health Clinic",
    specialty: "Pediatrics",
    description: "Family & Child Healthcare",
    rating: 4.7,
    reviews: 110,
    location: "Mumbai",
    address: "Andheri West, Mumbai",
    openingHours: "9:00 AM - 7:00 PM",
    consultationModes: ["In-Clinic", "Online"],
    image: "/images/clinics/family-health-clinic.jpg",
    slug: "family-health-clinic",
    available: true,
    popular: 85,
  },
  {
    id: 7,
    name: "Heart Care Clinic",
    specialty: "Cardiology",
    description: "Cardiac Consultation & Care",
    rating: 4.9,
    reviews: 132,
    location: "Delhi",
    address: "Dwarka, New Delhi",
    openingHours: "9:00 AM - 6:00 PM",
    consultationModes: ["In-Clinic", "Online"],
    image: "/images/clinics/heart-care-clinic.jpg",
    slug: "heart-care-clinic",
    available: true,
    popular: 94,
  },
  {
    id: 8,
    name: "Ortho Plus Clinic",
    specialty: "Orthopedics",
    description: "Bone, Joint & Spine Care",
    rating: 4.6,
    reviews: 68,
    location: "Noida, Sector 62",
    address: "Sector 62, Noida, Uttar Pradesh",
    openingHours: "10:00 AM - 8:00 PM",
    consultationModes: ["In-Clinic"],
    image: "/images/clinics/ortho-plus-clinic.jpg",
    slug: "ortho-plus-clinic",
    available: true,
    popular: 80,
  },
];

type Clinic = (typeof clinics)[number];

/* =========================================
   CLINICS PAGE
========================================= */

export default function ClinicsPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");

  const [selectedSpecialties, setSelectedSpecialties] =
    useState<string[]>([]);

  const [rating, setRating] = useState("all");
  const [consultationMode, setConsultationMode] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /* =========================================
     PAGE TITLE & DESCRIPTION
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
     CLEAR ALL FILTERS
  ========================================= */

  const clearFilters = () => {
    setSearch("");
    setLocation("All Locations");
    setSelectedSpecialties([]);
    setRating("all");
    setConsultationMode("all");
    setSortBy("popular");
  };

  /* =========================================
     FILTER & SORT CLINICS
  ========================================= */

  const filteredClinics = useMemo(() => {
    const query = search.toLowerCase().trim();

    let result = clinics.filter((clinic) => {
      const matchesSearch =
        !query ||
        clinic.name.toLowerCase().includes(query) ||
        clinic.specialty.toLowerCase().includes(query) ||
        clinic.description.toLowerCase().includes(query) ||
        clinic.location.toLowerCase().includes(query) ||
        clinic.address.toLowerCase().includes(query);

      const matchesLocation =
        location === "All Locations" ||
        clinic.location === location ||
        (location === "Noida" &&
          clinic.location.startsWith("Noida"));

      const matchesSpecialty =
        selectedSpecialties.length === 0 ||
        selectedSpecialties.includes(clinic.specialty);

      const matchesRating =
        rating === "all" ||
        (rating === "4+" && clinic.rating >= 4) ||
        (rating === "4.5+" && clinic.rating >= 4.5) ||
        (rating === "4.8+" && clinic.rating >= 4.8);

      const matchesConsultation =
        consultationMode === "all" ||
        clinic.consultationModes.includes(consultationMode);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesSpecialty &&
        matchesRating &&
        matchesConsultation
      );
    });

    if (sortBy === "rating") {
      result = [...result].sort(
        (a, b) => b.rating - a.rating
      );
    } else if (sortBy === "reviews") {
      result = [...result].sort(
        (a, b) => b.reviews - a.reviews
      );
    } else if (sortBy === "popular") {
      result = [...result].sort(
        (a, b) => b.popular - a.popular
      );
    }

    return result;
  }, [
    search,
    location,
    selectedSpecialties,
    rating,
    consultationMode,
    sortBy,
  ]);

  /* =========================================
     FILTER SIDEBAR
  ========================================= */

  const FilterContent = () => (
    <>
      {/* FILTER HEADER */}

      <div className="flex h-[60px] items-center justify-between border-b border-[#dce6f2] px-5">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal
            size={18}
            className="text-[#0878d1]"
          />

          <h2 className="text-[16px] font-bold text-black">
            Filters
          </h2>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="text-[13px] font-semibold text-[#0878d1] hover:text-[#075ca5]"
        >
          Clear All
        </button>
      </div>

      {/* LOCATION */}

      <div className="border-b border-[#e2e8f0] px-5 py-5">
        <label
          htmlFor="clinic-location-filter"
          className="mb-3 block text-[14px] font-bold text-black"
        >
          Location
        </label>

        <div className="relative">
          <select
            id="clinic-location-filter"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-[44px] w-full appearance-none rounded-[8px] border border-[#cbd8e8] bg-white px-3 pr-9 text-[14px] text-[#263f59] outline-none focus:border-[#0878d1] focus:ring-2 focus:ring-[#0878d1]/15"
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

      {/* SPECIALTY */}

      <div className="border-b border-[#e2e8f0] px-5 py-5">
        <h3 className="mb-4 text-[14px] font-bold text-black">
          Specialty
        </h3>

        <div className="space-y-3">
          {specialties
            .filter((item) => item !== "All Specialties")
            .map((specialty) => (
              <label
                key={specialty}
                className="flex cursor-pointer items-center gap-3 text-[14px] text-[#344f6a] hover:text-[#0878d1]"
              >
                <input
                  type="checkbox"
                  checked={selectedSpecialties.includes(specialty)}
                  onChange={() => toggleSpecialty(specialty)}
                  className="h-[16px] w-[16px] shrink-0 cursor-pointer accent-[#0878d1]"
                />

                <span>{specialty}</span>
              </label>
            ))}
        </div>
      </div>

      {/* RATING */}

      <div className="border-b border-[#e2e8f0] px-5 py-5">
        <h3 className="mb-4 text-[14px] font-bold text-black">
          Rating
        </h3>

        <div className="space-y-3">
          {[
            { label: "Any Rating", value: "all" },
            { label: "4+ Stars", value: "4+" },
            { label: "4.5+ Stars", value: "4.5+" },
            { label: "4.8+ Stars", value: "4.8+" },
          ].map((item) => (
            <label
              key={item.value}
              className="flex cursor-pointer items-center gap-3 text-[14px] text-[#344f6a] hover:text-[#0878d1]"
            >
              <input
                type="radio"
                name="clinic-rating"
                value={item.value}
                checked={rating === item.value}
                onChange={() => setRating(item.value)}
                className="h-[16px] w-[16px] cursor-pointer accent-[#0878d1]"
              />

              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* CONSULTATION MODE */}

      <div className="px-5 py-5">
        <h3 className="mb-4 text-[14px] font-bold text-black">
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
              className="flex cursor-pointer items-center gap-3 text-[14px] text-[#344f6a] hover:text-[#0878d1]"
            >
              <input
                type="radio"
                name="consultation-mode"
                value={item.value}
                checked={consultationMode === item.value}
                onChange={() =>
                  setConsultationMode(item.value)
                }
                className="h-[16px] w-[16px] cursor-pointer accent-[#0878d1]"
              />

              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  /* =========================================
     MAIN PAGE UI
  ========================================= */

  return (
    <main className="min-h-screen bg-white text-black">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <section className="border-b border-[#dce6f2] bg-[#f1f7fd] px-5 py-8 sm:px-8 sm:py-9 lg:px-[5.25%] lg:py-10">
        <div className="mx-auto max-w-7xl">

          {/* BREADCRUMB */}

          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex items-center gap-3 text-[14px] font-medium"
          >
            <Link
              href="/"
              aria-label="Home"
              className="text-[#0878d1] hover:text-[#075ca5]"
            >
              <Home size={18} />
            </Link>

            <span className="text-[#94a3b8]">/</span>

            <span className="text-black">
              Clinics
            </span>
          </nav>

          {/* TITLE */}

          <div className="flex items-center justify-between gap-5">
            <div>
              <h1 className="text-[30px] font-extrabold leading-tight tracking-[-0.7px] text-black sm:text-[36px] lg:text-[40px]">
                Clinics Near You
              </h1>

              <p className="mt-2 text-[15px] font-medium leading-7 text-[#405975] sm:text-[17px]">
                Find and book appointments at trusted clinics
                near you.
              </p>
            </div>

            <div className="hidden h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[14px] border border-[#dce6f2] bg-white text-[#0878d1] sm:flex">
              <Building2 size={29} strokeWidth={2} />
            </div>
          </div>

          {/* SEARCH FORM */}

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_205px_125px] lg:grid-cols-[minmax(0,1fr)_220px_130px] lg:gap-4"
          >
            {/* SEARCH INPUT */}

            <div className="flex h-[52px] min-w-0 items-center gap-3 rounded-[9px] border border-[#cbd8e8] bg-white px-4 focus-within:border-[#0878d1] focus-within:ring-2 focus-within:ring-[#0878d1]/15">
              <Search
                size={19}
                className="shrink-0 text-[#647b94]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search clinic name or specialty..."
                aria-label="Search clinics"
                className="h-full w-full min-w-0 bg-transparent text-[15px] font-medium text-black outline-none placeholder:font-normal placeholder:text-[#64748b]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="shrink-0 text-[#64748b] hover:text-black"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* LOCATION DROPDOWN */}

            <div className="relative flex h-[52px] min-w-0 items-center gap-3 rounded-[9px] border border-[#cbd8e8] bg-white px-4 focus-within:border-[#0878d1]">
              <MapPin
                size={18}
                className="shrink-0 text-[#647b94]"
              />

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                aria-label="Filter clinics by location"
                className="h-full w-full min-w-0 appearance-none bg-transparent pr-5 text-[14px] font-medium text-[#344f6a] outline-none"
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
              className="flex h-[52px] items-center justify-center gap-2 rounded-[9px] bg-[#0878d1] px-5 text-[14px] font-bold text-white transition-colors hover:bg-[#0667b5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0878d1] focus-visible:ring-offset-2"
            >
              <Search size={17} strokeWidth={2.5} />
              Search
            </button>
          </form>
        </div>
      </section>

      {/* =====================================
          CLINIC LISTING
      ===================================== */}

      <section className="bg-white px-5 py-7 sm:px-8 sm:py-9 lg:px-[5.25%] lg:py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-5 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">

          {/* MOBILE FILTER BUTTON */}

          <button
            type="button"
            onClick={() =>
              setMobileFiltersOpen(!mobileFiltersOpen)
            }
            aria-expanded={mobileFiltersOpen}
            className="flex h-[48px] items-center justify-center gap-2 rounded-[9px] border border-[#dce6f2] bg-white text-[14px] font-semibold  text-black lg:hidden"
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
            className={`overflow-hidden rounded-[12px] border border-[#dce6f2] bg-white ${
              mobileFiltersOpen ? "block" : "hidden"
            } lg:block`}
          >
            <FilterContent />
          </aside>

          {/* RIGHT CONTENT */}

          <div className="min-w-0">

            {/* RESULTS TOOLBAR */}

            <div className="flex min-h-[60px] flex-wrap items-center justify-between gap-3 border-b border-[#dce6f2] bg-white px-1 py-3">
              <p className="text-[14px] text-[#475569]">
                Showing{" "}
                <span className="font-bold text-black">
                  {filteredClinics.length}
                </span>{" "}
                clinics
              </p>

              <div className="flex items-center gap-2">
                <label
                  htmlFor="sort-clinics"
                  className="whitespace-nowrap text-[13px] font-medium text-[#475569]"
                >
                  Sort by:
                </label>

                <div className="relative">
                  <select
                    id="sort-clinics"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-[40px] min-w-[140px] appearance-none rounded-[8px] border border-[#cbd8e8] bg-white px-3 pr-9 text-[13px] font-medium text-black outline-none focus:border-[#0878d1]"
                  >
                    <option value="popular">Popularity</option>
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviewed</option>
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#53677f]"
                  />
                </div>
              </div>
            </div>

            {/* CLINIC CARDS */}

            <div className="mt-4 space-y-4">
              {filteredClinics.map((clinic: Clinic) => (
                <article
                  key={clinic.id}
                  className="rounded-[12px] border border-[#dce6f2] bg-white p-4 transition-colors duration-200 hover:border-[#b7d5f3] sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">

                    {/* CLINIC IMAGE */}

                    <Link
                      href={`/clinics/${clinic.slug}`}
                      aria-label={`View ${clinic.name} profile`}
                      className="relative h-[190px] w-full shrink-0 overflow-hidden rounded-[9px] border border-[#e2e8f0] bg-[#f1f5f9] sm:h-[145px] sm:w-[150px] lg:h-[150px] lg:w-[155px]"
                    >
                      <Image
                        src={clinic.image}
                        alt={clinic.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 155px"
                        className="object-cover"
                      />
                    </Link>

                    {/* CLINIC DETAILS */}

                    <div className="min-w-0 flex-1">

                      {/* NAME & AVAILABILITY */}

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <h2 className="text-[19px] font-bold leading-[27px] tracking-[-0.25px] text-black sm:text-[20px]">
                            {clinic.name}
                          </h2>

                          <p className="mt-1 text-[14px] font-medium text-[#405975]">
                            {clinic.description}
                          </p>
                        </div>

                        {clinic.available ? (
                          <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-3 py-1.5 text-[12px] font-semibold text-[#166534]">
                            <CheckCircle2 size={14} />
                            Open
                          </span>
                        ) : (
                          <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-3 py-1.5 text-[12px] font-semibold text-[#475569]">
                            <Clock3 size={14} />
                            Check Hours
                          </span>
                        )}
                      </div>

                      {/* SPECIALTY */}

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-[#eff6ff] px-2.5 py-1.5 text-[12px] font-semibold text-[#075ca5]">
                          <Stethoscope size={14} />
                          {clinic.specialty}
                        </span>

                        {clinic.consultationModes.includes("Online") && (
                          <span className="rounded-md border border-[#dce6f2] bg-white px-2.5 py-1.5 text-[12px] font-medium text-[#475569]">
                            Online Consultation
                          </span>
                        )}
                      </div>

                      {/* RATING */}

                      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
                        <div className="flex items-center gap-1.5">
                          <Star
                            size={16}
                            fill="#fbbf24"
                            stroke="#d99a06"
                          />

                          <span className="text-[14px] font-bold text-black">
                            {clinic.rating.toFixed(1)}
                          </span>
                        </div>

                        <span className="text-[13px] text-[#64748b]">
                          ({clinic.reviews} reviews)
                        </span>
                      </div>

                      {/* LOCATION */}

                      <div className="mt-3 flex items-start gap-2 text-[13px] leading-5 text-[#405975]">
                        <MapPin
                          size={16}
                          className="mt-0.5 shrink-0 text-[#0878d1]"
                        />

                        <span>{clinic.address}</span>
                      </div>

                      {/* OPENING HOURS */}

                      <div className="mt-2 flex items-center gap-2 text-[13px] leading-5 text-[#405975]">
                        <Clock3
                          size={16}
                          className="shrink-0 text-[#0878d1]"
                        />

                        <span>
                          {clinic.openingHours}
                        </span>
                      </div>

                      {/* VIEW PROFILE LINK */}

                      <Link
                        href={`/clinics/${clinic.slug}`}
                        className="group mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0878d1] hover:text-[#075ca5]"
                      >
                        View Clinic Profile

                        <ArrowRight
                          size={15}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>

                  {/* DIVIDER */}

                  <div className="my-4 border-t border-[#e2e8f0]" />

                  {/* BOTTOM ROW */}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    {/* CLINIC INFO */}

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <div className="flex items-center gap-2 text-[13px] text-[#475569]">
                        <HeartPulse
                          size={16}
                          className="text-[#0878d1]"
                        />

                        <span>{clinic.specialty} Clinic</span>
                      </div>

                      <span className="hidden h-4 w-px bg-[#dce6f2] sm:block" />

                      <div className="flex items-center gap-2 text-[13px] text-[#475569]">
                        <CalendarDays
                          size={16}
                          className="text-[#0878d1]"
                        />

                        <span>Appointment Available</span>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}

                    <div className="flex flex-wrap items-center gap-2.5">
                      <Link
                        href={`/clinics/${clinic.slug}`}
                        className="inline-flex h-[42px] flex-1 items-center justify-center rounded-[8px] border border-[#0878d1] px-4 text-[13px] font-semibold text-[#0878d1] transition-colors hover:bg-[#eff7ff] sm:flex-none"
                      >
                        View Profile
                      </Link>

                      <Link
  href={`/appointments/book?clinic=${clinic.slug}`}
  className="inline-flex h-[42px] items-center justify-center gap-2 rounded-lg bg-[#0878d1] px-5 text-sm font-semibold text-white hover:bg-[#0667b5]"
>
  Book Appointment
  <ArrowRight size={16} />
</Link>
                   
                    </div>
                  </div>
                </article>
              ))}

              {/* NO RESULTS */}

              {filteredClinics.length === 0 && (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[12px] border border-dashed border-[#cbd8e8] bg-[#f8fafc] px-5 text-center">
                  <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#eaf2ff] text-[#0878d1]">
                    <Search size={25} />
                  </div>

                  <h3 className="mt-5 text-[20px] font-bold text-black">
                    No clinics found
                  </h3>

                  <p className="mt-2 max-w-md text-[14px] leading-6 text-[#53677f]">
                    We couldn't find any clinics matching your
                    search. Try changing your location or filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 inline-flex h-[44px] items-center justify-center rounded-[8px] bg-[#0878d1] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#0667b5]"
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