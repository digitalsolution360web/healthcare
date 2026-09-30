"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import {
  Home,
  ChevronRight,
  BadgeCheck,
  CalendarDays,
  Star,
  MapPin,
  Clock3,
  Phone,
  Mail,
  ArrowUpRight,
  Building2,
  UsersRound,
  Stethoscope,
  ShieldCheck,
  HeartPulse,
  BedDouble,
  Activity,
  Microscope,
  Ambulance,
  CheckCircle2,
  ExternalLink,
  Navigation,
  X,
} from "lucide-react";

/* =========================================
   HOSPITAL DATA
========================================= */

const hospitals = [
  {
    id: 1,
    name: "Apollo Hospital",
    slug: "apollo-hospital",
    type: "Multispeciality Hospital",
    rating: 4.8,
    reviews: 2450,
    established: 1983,
    beds: "500+",
    doctors: "200+",
    emergency: true,
    verified: true,

    logo: "/images/hospitals/apollo-logo.png",
    banner: "/images/hospitals/apollo-banner.jpg",

    address: "Jubilee Hills, Hyderabad, Telangana",
    phone: "+91 40 2360 7777",
    email: "info@apollohospitals.com",

    about:
      "Apollo Hospital is a multispeciality healthcare institution providing comprehensive medical services across a wide range of specialties. The hospital offers modern diagnostic facilities, experienced medical professionals, advanced treatment options, and patient-focused healthcare services. Its departments provide consultations, diagnostic evaluations, surgical care, and emergency medical support.",

    departments: [
      "Cardiology",
      "Orthopedics",
      "Neurology",
      "Oncology",
      "Gynecology",
      "Pediatrics",
      "Dermatology",
      "Gastroenterology",
    ],

    facilities: [
      "24/7 Critical Care",
      "Emergency Services",
      "Pharmacy",
      "Diagnostic Laboratory",
      "Blood Bank",
      "Operation Theatre",
      "Ambulance Services",
      "Patient Rooms",
    ],

    specialties: [
      "Cardiac Sciences",
      "Neurosciences",
      "Orthopedics",
      "Cancer Care",
      "Critical Care",
      "Organ Transplant",
    ],

    hours: [
      { day: "Monday", time: "Open 24 Hours" },
      { day: "Tuesday", time: "Open 24 Hours" },
      { day: "Wednesday", time: "Open 24 Hours" },
      { day: "Thursday", time: "Open 24 Hours" },
      { day: "Friday", time: "Open 24 Hours" },
      { day: "Saturday", time: "Open 24 Hours" },
      { day: "Sunday", time: "Open 24 Hours" },
    ],

    location:
      "https://www.google.com/maps/search/?api=1&query=Apollo+Hospital+Jubilee+Hills+Hyderabad",
  },

  {
    id: 2,
    name: "Metro Hospital",
    slug: "metro-hospital",
    type: "Multispeciality Hospital",
    rating: 4.6,
    reviews: 1850,
    established: 1997,
    beds: "300+",
    doctors: "150+",
    emergency: true,
    verified: true,

    logo: "/images/hospitals/metro-logo.png",
    banner: "/images/hospitals/metro-banner.jpg",

    address: "Sector 11, Noida, Uttar Pradesh",
    phone: "+91 120 254 9999",
    email: "info@metrohospitals.com",

    about:
      "Metro Hospital provides multispeciality healthcare services with a focus on diagnosis, treatment, and patient care. The hospital offers consultations across various medical departments, diagnostic services, emergency care, and modern treatment facilities.",

    departments: [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Nephrology",
      "General Medicine",
      "Oncology",
      "Urology",
      "Pediatrics",
    ],

    facilities: [
      "Emergency Services",
      "Intensive Care Unit",
      "Pharmacy",
      "Diagnostic Laboratory",
      "Operation Theatre",
      "Ambulance Services",
      "Patient Rooms",
      "Radiology",
    ],

    specialties: [
      "Cardiac Care",
      "Neurosciences",
      "Kidney Care",
      "Orthopedics",
      "Critical Care",
      "General Medicine",
    ],

    hours: [
      { day: "Monday", time: "Open 24 Hours" },
      { day: "Tuesday", time: "Open 24 Hours" },
      { day: "Wednesday", time: "Open 24 Hours" },
      { day: "Thursday", time: "Open 24 Hours" },
      { day: "Friday", time: "Open 24 Hours" },
      { day: "Saturday", time: "Open 24 Hours" },
      { day: "Sunday", time: "Open 24 Hours" },
    ],

    location:
      "https://www.google.com/maps/search/?api=1&query=Metro+Hospital+Noida",
  },

  {
    id: 3,
    name: "Fortis Hospital",
    slug: "fortis-hospital",
    type: "Multispeciality Hospital",
    rating: 4.7,
    reviews: 2100,
    established: 2001,
    beds: "400+",
    doctors: "180+",
    emergency: true,
    verified: true,

    logo: "/images/hospitals/fortis-logo.png",
    banner: "/images/hospitals/fortis-banner.jpg",

    address: "Sector 62, Noida, Uttar Pradesh",
    phone: "+91 124 492 1021",
    email: "info@fortishealthcare.com",

    about:
      "Fortis Hospital offers a range of medical and surgical services across multiple specialties. The hospital provides diagnostic facilities, specialist consultations, critical care, and treatment services supported by trained healthcare professionals.",

    departments: [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Oncology",
      "Urology",
      "Gynecology",
      "Gastroenterology",
      "General Medicine",
    ],

    facilities: [
      "Emergency Services",
      "Intensive Care Unit",
      "Pharmacy",
      "Advanced Diagnostics",
      "Operation Theatre",
      "Ambulance Services",
      "Blood Bank",
      "Patient Rooms",
    ],

    specialties: [
      "Cardiac Sciences",
      "Cancer Care",
      "Neurosciences",
      "Orthopedics",
      "Organ Transplant",
      "Critical Care",
    ],

    hours: [
      { day: "Monday", time: "Open 24 Hours" },
      { day: "Tuesday", time: "Open 24 Hours" },
      { day: "Wednesday", time: "Open 24 Hours" },
      { day: "Thursday", time: "Open 24 Hours" },
      { day: "Friday", time: "Open 24 Hours" },
      { day: "Saturday", time: "Open 24 Hours" },
      { day: "Sunday", time: "Open 24 Hours" },
    ],

    location:
      "https://www.google.com/maps/search/?api=1&query=Fortis+Hospital+Noida",
  },

  {
    id: 4,
    name: "Max Super Speciality Hospital",
    slug: "max-super-speciality-hospital",
    type: "Super Speciality Hospital",
    rating: 4.7,
    reviews: 1650,
    established: 2006,
    beds: "500+",
    doctors: "250+",
    emergency: true,
    verified: true,

    logo: "/images/hospitals/max-logo.png",
    banner: "/images/hospitals/max-banner.jpg",

    address: "Saket, New Delhi, India",
    phone: "+91 11 2651 5050",
    email: "info@maxhealthcare.com",

    about:
      "Max Super Speciality Hospital provides specialized medical and surgical care across a range of departments. Its services include specialist consultations, diagnostic investigations, advanced treatment facilities, and emergency medical care.",

    departments: [
      "Cardiology",
      "Oncology",
      "Neurology",
      "Orthopedics",
      "Nephrology",
      "Gastroenterology",
      "Urology",
      "General Medicine",
    ],

    facilities: [
      "Emergency Services",
      "Critical Care",
      "Pharmacy",
      "Diagnostic Laboratory",
      "Advanced Imaging",
      "Operation Theatre",
      "Ambulance Services",
      "Patient Rooms",
    ],

    specialties: [
      "Cancer Care",
      "Cardiac Sciences",
      "Neurosciences",
      "Kidney Care",
      "Bone & Joint Care",
      "Critical Care",
    ],

    hours: [
      { day: "Monday", time: "Open 24 Hours" },
      { day: "Tuesday", time: "Open 24 Hours" },
      { day: "Wednesday", time: "Open 24 Hours" },
      { day: "Thursday", time: "Open 24 Hours" },
      { day: "Friday", time: "Open 24 Hours" },
      { day: "Saturday", time: "Open 24 Hours" },
      { day: "Sunday", time: "Open 24 Hours" },
    ],

    location:
      "https://www.google.com/maps/search/?api=1&query=Max+Super+Speciality+Hospital+Saket",
  },
];

type TabType =
  | "Overview"
  | "Departments"
  | "Doctors"
  | "Facilities"
  | "Location"
  | "Reviews";

/* =========================================
   SECTION TITLE
========================================= */

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-black sm:text-2xl">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-sm leading-6 text-black sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

/* =========================================
   HOSPITAL PROFILE PAGE
========================================= */

export default function HospitalProfilePage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const hospital = hospitals.find(
    (item) => item.slug === slug
  );

  const [activeTab, setActiveTab] =
    useState<TabType>("Overview");

  const [showMessage, setShowMessage] =
    useState(false);

  const [message, setMessage] = useState("");

  const tabs: TabType[] = [
    "Overview",
    "Departments",
    "Doctors",
    "Facilities",
    "Location",
    "Reviews",
  ];

  /* =========================================
     HOSPITAL NOT FOUND
  ========================================= */

  if (!hospital) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#f3f8fc] px-5 py-12">
        <div className="w-full max-w-[560px] rounded-2xl border border-[#dce6f2] bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#eff6ff] text-[#0878d1]">
            <Building2 size={36} />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-black">
            Hospital Not Found
          </h1>

          <p className="mt-4 text-base leading-7 text-black">
            The hospital profile you are looking for
            does not exist.
          </p>

          <Link
            href="/hospitals"
            className="mt-8 inline-flex min-h-[50px] items-center justify-center rounded-lg bg-[#0878d1] px-7 font-semibold text-white transition hover:bg-[#0667b5]"
          >
            Browse All Hospitals
          </Link>
        </div>
      </main>
    );
  }

  /* =========================================
     MAP URL
  ========================================= */

  const mapUrl = hospital.location;

  /* =========================================
     MAIN PAGE
  ========================================= */

  return (
    <main className="min-h-screen bg-[#f3f8fc] text-black">

      {/* =====================================
          BREADCRUMB
      ===================================== */}

      <div className="border-b border-[#dce8f5] bg-white">
        <div className="mx-auto flex h-[54px] max-w-[1440px] items-center gap-2 overflow-hidden px-4 text-sm font-medium sm:gap-3 sm:px-6 lg:px-10">

          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-[#0878d1] transition hover:text-[#075ca5]"
          >
            <Home size={17} />
            <span>Home</span>
          </Link>

          <ChevronRight
            size={16}
            className="shrink-0 text-black"
          />

          <Link
            href="/hospitals"
            className="shrink-0 text-[#0878d1] transition hover:text-[#075ca5]"
          >
            Hospitals
          </Link>

          <ChevronRight
            size={16}
            className="shrink-0 text-black"
          />

          <span className="truncate text-black">
            Hospital Profile
          </span>
        </div>
      </div>

      {/* =====================================
          PAGE CONTENT
      ===================================== */}

      <section className="px-3 pb-12 pt-5 sm:px-5 sm:pt-7 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-[1440px]">

          {/* =================================
              HOSPITAL HERO
          ================================= */}

          <div className="overflow-hidden rounded-2xl border border-[#dce6f2] bg-white shadow-[0_4px_18px_rgba(24,59,96,0.05)]">

            {/* HOSPITAL BANNER */}

            <div className="relative h-[190px] w-full overflow-hidden bg-[#e7f0fa] sm:h-[270px] lg:h-[320px]">

              <Image
                src={hospital.banner}
                alt={`${hospital.name} building`}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

              {hospital.verified && (
                <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white px-3 py-2 text-xs font-semibold text-black shadow-sm sm:right-6 sm:top-6 sm:text-sm">
                  <ShieldCheck
                    size={16}
                    className="text-[#0878d1]"
                  />
                  Verified Hospital
                </div>
              )}
            </div>

            {/* HOSPITAL INFORMATION */}

            <div className="relative px-4 pb-6 sm:px-7 sm:pb-7 lg:px-9">

              <div className="flex flex-col gap-5 md:flex-row md:items-start">

                {/* LOGO */}

                <div className="-mt-9 flex h-[105px] w-[105px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#dce6f2] bg-white p-3 shadow-sm sm:-mt-12 sm:h-[125px] sm:w-[125px]">

                  <Image
                    src={hospital.logo}
                    alt={`${hospital.name} logo`}
                    width={110}
                    height={110}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* DETAILS */}

                <div className="min-w-0 flex-1 pt-1">

                  <div className="flex flex-wrap items-center gap-2">

                    <h1 className="text-2xl font-bold leading-tight text-black sm:text-3xl">
                      {hospital.name}
                    </h1>

                    {hospital.verified && (
                      <BadgeCheck
                        size={23}
                        fill="#0878d1"
                        className="shrink-0 text-white"
                      />
                    )}
                  </div>

                  <p className="mt-2 text-sm font-medium text-black sm:text-base">
                    {hospital.type}
                  </p>

                  {/* RATING */}

                  <div className="mt-3 flex flex-wrap items-center gap-2">

                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={17}
                          fill="#fbbf24"
                          stroke="#fbbf24"
                        />
                      ))}
                    </div>

                    <span className="text-sm font-bold text-black">
                      {hospital.rating}
                    </span>

                    <span className="text-sm text-black">
                      ({hospital.reviews.toLocaleString()} reviews)
                    </span>
                  </div>

                  {/* ADDRESS */}

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-black">

                    <span className="inline-flex items-center gap-2">
                      <MapPin
                        size={17}
                        className="shrink-0 text-[#0878d1]"
                      />
                      {hospital.address}
                    </span>

                    {hospital.emergency && (
                      <span className="inline-flex items-center gap-2">
                        <CheckCircle2
                          size={17}
                          className="shrink-0 text-[#0878d1]"
                        />
                        24/7 Emergency
                      </span>
                    )}
                  </div>

                  {/* ACTION BUTTONS */}

                  <div className="mt-5 flex flex-wrap gap-3">

                    <Link
                      href={`/appointments/book?hospital=${hospital.slug}`}
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[#0878d1] px-5 text-sm font-semibold text-white transition hover:bg-[#0667b5] sm:min-h-[48px] sm:px-7 sm:text-base"
                    >
                      <CalendarDays size={18} />
                      Book Appointment
                      <ArrowUpRight size={16} />
                    </Link>

                    <a
                      href={`tel:${hospital.phone}`}
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-[#cbd8e8] bg-white px-6 text-sm font-semibold text-black transition hover:bg-[#f3f8fc] sm:min-h-[48px] sm:px-8 sm:text-base"
                    >
                      <Phone size={18} />
                      Call
                    </a>

                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-[#cbd8e8] bg-white px-5 text-sm font-semibold text-black transition hover:bg-[#f3f8fc]"
                    >
                      <Navigation size={17} />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>

              {/* QUICK TRUST DETAILS */}

              <div className="mt-7 grid grid-cols-1 gap-3 border-t border-[#e5edf5] pt-5 sm:grid-cols-3 sm:gap-0">

                <div className="flex items-center gap-3 sm:pr-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-[#0878d1]">
                    <BedDouble size={22} />
                  </div>

                  <div>
                    <p className="text-base font-bold text-black">
                      {hospital.beds}
                    </p>
                    <p className="text-sm text-black">
                      Beds
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-y border-[#e5edf5] py-3 sm:border-x sm:border-y-0 sm:px-5 sm:py-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-[#0878d1]">
                    <UsersRound size={22} />
                  </div>

                  <div>
                    <p className="text-base font-bold text-black">
                      {hospital.doctors}
                    </p>
                    <p className="text-sm text-black">
                      Doctors
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:pl-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-[#0878d1]">
                    <Building2 size={22} />
                  </div>

                  <div>
                    <p className="text-base font-bold text-black">
                      {hospital.established}
                    </p>
                    <p className="text-sm text-black">
                      Established
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* =================================
              PROFILE TABS
          ================================= */}

          <div className="mt-6 overflow-hidden rounded-2xl border border-[#dce6f2] bg-white shadow-[0_4px_18px_rgba(24,59,96,0.04)]">

            {/* TAB NAVIGATION */}

            <div className="overflow-x-auto border-b border-[#dce6f2]">
              <div className="flex min-w-max items-center gap-1 px-2 sm:px-5">

                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`relative flex h-[58px] items-center justify-center px-4 text-sm font-semibold transition-colors sm:h-[64px] sm:px-5 sm:text-base ${
                      activeTab === tab
                        ? "text-[#0878d1]"
                        : "text-black hover:text-[#0878d1]"
                    }`}
                  >
                    {tab}

                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-t-full bg-[#0878d1]" />
                    )}
                  </button>
                ))}

              </div>
            </div>

            {/* =================================
                TAB CONTENT + SIDEBAR
            ================================= */}

            <div className="grid grid-cols-1 gap-7 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-8 lg:p-7">

              {/* LEFT CONTENT */}

              <div className="min-w-0">

                {/* OVERVIEW */}

                {activeTab === "Overview" && (
                  <div className="space-y-8">

                    {/* ABOUT HOSPITAL */}

                    <section>
                      <SectionTitle
                        title="About Hospital"
                      />

                      <p className="mt-4 text-sm leading-7 text-black sm:text-base sm:leading-8">
                        {hospital.about}
                      </p>
                    </section>

                    {/* QUICK STATS */}

                    <div className="grid grid-cols-1 gap-3 border-y border-[#e5edf5] py-5 sm:grid-cols-3 sm:gap-4">

                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-[#0878d1]">
                          <BedDouble size={21} />
                        </div>

                        <div>
                          <p className="text-base font-bold text-black">
                            {hospital.beds}
                          </p>
                          <p className="text-sm text-black">
                            Beds
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-[#0878d1]">
                          <UsersRound size={21} />
                        </div>

                        <div>
                          <p className="text-base font-bold text-black">
                            {hospital.doctors}
                          </p>
                          <p className="text-sm text-black">
                            Doctors
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-[#0878d1]">
                          <Activity size={21} />
                        </div>

                        <div>
                          <p className="text-base font-bold text-black">
                            {hospital.established}
                          </p>
                          <p className="text-sm text-black">
                            Established
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* KEY DEPARTMENTS */}

                    <section>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <SectionTitle
                          title="Key Departments"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setActiveTab("Departments")
                          }
                          className="text-sm font-semibold text-[#0878d1] hover:underline"
                        >
                          View All
                        </button>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        {hospital.departments.slice(0, 8).map(
                          (department) => (
                            <div
                              key={department}
                              className="flex min-h-[45px] items-center gap-2 rounded-lg border border-[#e1eaf4] bg-white px-3 py-2.5"
                            >
                              <HeartPulse
                                size={16}
                                className="shrink-0 text-[#0878d1]"
                              />

                              <span className="text-xs font-medium text-black sm:text-sm">
                                {department}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </section>

                    {/* FACILITIES */}

                    <section>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <SectionTitle
                          title="Facilities"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setActiveTab("Facilities")
                          }
                          className="text-sm font-semibold text-[#0878d1] hover:underline"
                        >
                          View All
                        </button>
                      </div>

                      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {hospital.facilities.slice(0, 6).map(
                          (facility) => (
                            <div
                              key={facility}
                              className="flex items-center gap-3 rounded-lg border border-[#e1eaf4] p-3.5"
                            >
                              <CheckCircle2
                                size={18}
                                className="shrink-0 text-[#0878d1]"
                              />

                              <span className="text-sm font-medium text-black">
                                {facility}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </section>

                    {/* SPECIALTIES */}

                    <section>
                      <SectionTitle
                        title="Specialties"
                      />

                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {hospital.specialties.map(
                          (specialty) => (
                            <span
                              key={specialty}
                              className="rounded-full border border-[#dce6f2] bg-[#f8fbff] px-4 py-2 text-sm font-medium text-black"
                            >
                              {specialty}
                            </span>
                          )
                        )}
                      </div>
                    </section>

                  </div>
                )}

                {/* DEPARTMENTS TAB */}

                {activeTab === "Departments" && (
                  <section>
                    <SectionTitle
                      title="Hospital Departments"
                      description={`Explore the medical departments and specialties available at ${hospital.name}.`}
                    />

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {hospital.departments.map(
                        (department) => (
                          <div
                            key={department}
                            className="flex min-h-[90px] items-center gap-4 rounded-xl border border-[#e1eaf4] bg-white p-4 transition hover:border-[#b8d9f5] hover:bg-[#f8fbff]"
                          >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff] text-[#0878d1]">
                              <Stethoscope size={23} />
                            </div>

                            <div>
                              <h3 className="font-semibold text-black">
                                {department}
                              </h3>

                              <p className="mt-1 text-sm text-black">
                                Medical Department
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </section>
                )}

                {/* DOCTORS TAB */}

                {activeTab === "Doctors" && (
                  <section>
                    <SectionTitle
                      title="Doctors at Hospital"
                      description={`Find medical professionals associated with ${hospital.name}.`}
                    />

                    <div className="mt-6 rounded-xl border border-[#e1eaf4] bg-white p-6 sm:p-8">
                      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#eff6ff] text-[#0878d1]">
                          <UsersRound size={28} />
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-black">
                            Find a Doctor
                          </h3>

                          <p className="mt-1 text-sm leading-6 text-black">
                            Browse available doctors and
                            explore their specialties.
                          </p>
                        </div>
                      </div>

                      <Link
                        href="/doctors"
                        className="mt-6 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[#0878d1] px-5 text-sm font-semibold text-white transition hover:bg-[#0667b5]"
                      >
                        Browse All Doctors
                        <ArrowUpRight size={17} />
                      </Link>
                    </div>
                  </section>
                )}

                {/* FACILITIES TAB */}

                {activeTab === "Facilities" && (
                  <section>
                    <SectionTitle
                      title="Hospital Facilities"
                      description={`Facilities and services available at ${hospital.name}.`}
                    />

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {hospital.facilities.map(
                        (facility, index) => {
                          const icons = [
                            HeartPulse,
                            Ambulance,
                            Activity,
                            Microscope,
                            ShieldCheck,
                            Building2,
                            BedDouble,
                            Stethoscope,
                          ];

                          const FacilityIcon =
                            icons[index % icons.length];

                          return (
                            <div
                              key={facility}
                              className="flex min-h-[100px] items-center gap-4 rounded-xl border border-[#e1eaf4] bg-white p-5"
                            >
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff] text-[#0878d1]">
                                <FacilityIcon size={23} />
                              </div>

                              <div>
                                <h3 className="text-sm font-semibold text-black sm:text-base">
                                  {facility}
                                </h3>

                                <p className="mt-1 text-sm text-black">
                                  Available at hospital
                                </p>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </section>
                )}

                {/* LOCATION TAB */}

                {activeTab === "Location" && (
                  <section>
                    <SectionTitle
                      title="Hospital Location"
                      description="Find the hospital address and directions."
                    />

                    <div className="mt-6 rounded-xl border border-[#e1eaf4] bg-white p-5 sm:p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff] text-[#0878d1]">
                          <MapPin size={24} />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-lg font-bold text-black">
                            {hospital.name}
                          </h3>

                          <p className="mt-2 text-sm leading-7 text-black">
                            {hospital.address}
                          </p>
                        </div>
                      </div>

                      <a
                        href={mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[#0878d1] px-5 text-sm font-semibold text-white transition hover:bg-[#0667b5]"
                      >
                        <Navigation size={18} />
                        Get Directions
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </section>
                )}

                {/* REVIEWS TAB */}

                {activeTab === "Reviews" && (
                  <section>
                    <SectionTitle
                      title="Hospital Reviews"
                      description={`Ratings and feedback for ${hospital.name}.`}
                    />

                    <div className="mt-6 rounded-xl border border-[#e1eaf4] bg-white p-6 sm:p-8">
                      <div className="flex flex-wrap items-center gap-5">
                        <span className="text-5xl font-bold text-black">
                          {hospital.rating}
                        </span>

                        <div>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={21}
                                fill="#fbbf24"
                                stroke="#fbbf24"
                              />
                            ))}
                          </div>

                          <p className="mt-2 text-sm text-black">
                            Based on{" "}
                            {hospital.reviews.toLocaleString()}{" "}
                            reviews
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 border-t border-[#e5edf5] pt-5">
                        <p className="text-base font-semibold text-black">
                          Patient feedback
                        </p>

                        <p className="mt-3 text-sm leading-7 text-black">
                          Patient review details will appear
                          here when reviews are added to the
                          hospital profile.
                        </p>
                      </div>
                    </div>
                  </section>
                )}

              </div>

              {/* =================================
                  RIGHT SIDEBAR
              ================================= */}

              <aside className="space-y-5">

                {/* LOCATION CARD */}

                <div className="rounded-xl border border-[#dce6f2] bg-white p-5 sm:p-6">

                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-black">
                      Location
                    </h3>

                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#0878d1] hover:underline"
                    >
                      Get Directions
                      <ArrowUpRight size={14} />
                    </a>
                  </div>

                  <div className="mt-4 flex items-start gap-3">
                    <MapPin
                      size={19}
                      className="mt-0.5 shrink-0 text-[#0878d1]"
                    />

                    <p className="text-sm leading-6 text-black">
                      {hospital.address}
                    </p>
                  </div>

                  {/* MAP PREVIEW */}

                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open hospital location in Google Maps"
                    className="group relative mt-5 block h-[190px] overflow-hidden rounded-lg border border-[#e1eaf4] bg-[#edf5f2]"
                  >
                    <iframe
                      title={`${hospital.name} location map`}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        hospital.address
                      )}&output=embed`}
                      className="pointer-events-none h-full w-full border-0"
                      loading="lazy"
                    />

                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-xs font-semibold text-black shadow-sm">
                      <MapPin
                        size={15}
                        className="text-[#0878d1]"
                      />
                      Open Map
                      <ArrowUpRight
                        size={14}
                        className="text-[#0878d1]"
                      />
                    </span>
                  </a>

                </div>

                {/* CONSULTATION HOURS */}

                <div className="rounded-xl border border-[#dce6f2] bg-white p-5 sm:p-6">

                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-black">
                      Consultation Hours
                    </h3>

                    <Clock3
                      size={20}
                      className="shrink-0 text-[#0878d1]"
                    />
                  </div>

                  <div className="mt-5 space-y-4">
                    {hospital.hours.map((item) => (
                      <div
                        key={item.day}
                        className="flex items-start justify-between gap-3"
                      >
                        <span className="text-sm text-black">
                          {item.day}
                        </span>

                        <span className="text-right text-sm font-medium text-black">
                          {item.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-[#e5edf5] pt-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-black">
                      <CheckCircle2
                        size={17}
                        className="shrink-0 text-[#0878d1]"
                      />

                      Emergency Services Available
                    </div>
                  </div>
                </div>

                {/* CONTACT CARD */}

                <div className="rounded-xl border border-[#dce6f2] bg-white p-5 sm:p-6">

                  <h3 className="text-lg font-bold text-black">
                    Contact Information
                  </h3>

                  <div className="mt-5 space-y-4">

                    <a
                      href={`tel:${hospital.phone}`}
                      className="flex items-start gap-3 text-sm text-black transition hover:text-[#0878d1]"
                    >
                      <Phone
                        size={19}
                        className="mt-0.5 shrink-0 text-[#0878d1]"
                      />

                      <span>{hospital.phone}</span>
                    </a>

                    <a
                      href={`mailto:${hospital.email}`}
                      className="flex items-start gap-3 break-all text-sm text-black transition hover:text-[#0878d1]"
                    >
                      <Mail
                        size={19}
                        className="mt-0.5 shrink-0 text-[#0878d1]"
                      />

                      <span>{hospital.email}</span>
                    </a>

                  </div>

                  <button
                    type="button"
                    onClick={() => setShowMessage(true)}
                    className="mt-6 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg border border-[#0878d1] bg-white px-4 text-sm font-semibold text-[#0878d1] transition hover:bg-[#eff6ff]"
                  >
                    <Mail size={17} />
                    Send an Enquiry
                  </button>

                </div>

                {/* BOOK APPOINTMENT CTA */}

                <div className="rounded-xl bg-[#0878d1] p-5 text-white shadow-sm sm:p-6">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                    <CalendarDays size={25} />
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-white">
                    Book an Appointment
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white">
                    Schedule your visit to{" "}
                    {hospital.name}.
                  </p>

                  <Link
                    href={`/appointments/book?hospital=${hospital.slug}`}
                    className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-bold text-[#0878d1] transition hover:bg-[#eff7ff]"
                  >
                    Book Appointment
                    <ArrowUpRight size={17} />
                  </Link>

                </div>

              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          ENQUIRY MODAL
      ===================================== */}

      {showMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
          onClick={() => setShowMessage(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="hospital-message-title"
            className="my-auto w-full max-w-[520px] rounded-2xl border border-[#dce6f2] bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-start justify-between gap-4">

              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eff6ff] text-[#0878d1]">
                  <Mail size={24} />
                </div>

                <h2
                  id="hospital-message-title"
                  className="mt-4 text-2xl font-bold text-black"
                >
                  Send an Enquiry
                </h2>

                <p className="mt-2 text-sm leading-6 text-black">
                  Contact {hospital.name}.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowMessage(false)}
                aria-label="Close enquiry dialog"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1f5f9] text-black transition hover:bg-[#e2eaf3]"
              >
                <X size={20} />
              </button>

            </div>

            <form
              className="mt-7"
              onSubmit={(e) => {
                e.preventDefault();

                const subject = encodeURIComponent(
                  `Hospital enquiry - ${hospital.name}`
                );

                const body = encodeURIComponent(message);

                window.location.href =
                  `mailto:${hospital.email}?subject=${subject}&body=${body}`;

                setShowMessage(false);
              }}
            >

              <label
                htmlFor="hospital-message"
                className="mb-3 block text-sm font-semibold text-black"
              >
                Your Message
              </label>

              <textarea
                id="hospital-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="Write your enquiry here..."
                className="w-full resize-y rounded-xl border border-[#cbd8e8] bg-white p-4 text-sm leading-7 text-black outline-none placeholder:text-black/50 focus:border-[#0878d1] focus:ring-4 focus:ring-[#0878d1]/10"
              />

              <button
                type="submit"
                className="mt-5 flex min-h-[50px] w-full items-center justify-center gap-2 rounded-lg bg-[#0878d1] px-6 text-sm font-semibold text-white transition hover:bg-[#0667b5]"
              >
                <Mail size={18} />
                Send Enquiry
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-black">
                Your default email application will open
                to send this enquiry.
              </p>

            </form>
          </div>
        </div>
      )}

    </main>
  );
}