
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  Home,
  ChevronRight,
  MapPin,
  Star,
  Clock3,
  CalendarDays,
  Phone,
  CheckCircle2,
  BadgeCheck,
  Building2,
  Users,
  UserRound,
  ArrowRight,
  Navigation,
  ShieldCheck,
} from "lucide-react";

/* =========================================
   THEME
========================================= */

const THEME = {
  primary: "#4e44e1",
  secondary: "#9122b4",
  heading: "#17152b",
  text: "#4B5568",
  muted: "#77748c",
  border: "#ebe8f4",
  background: "#f5f3ff",
  soft: "#fbfaff",
  iconBg: "#f1edff",
};

/* =========================================
   CLINIC DATA
========================================= */

const clinics = [
  {
    id: 1,
    name: "Smile Dental Clinic",
    slug: "smile-dental-clinic",
    specialty: "Dentistry",
    category: "Dental Clinic",
    rating: 4.8,
    reviews: 120,
    location: "Sector 18, Noida",
    fullAddress: "Sector 18, Noida, Uttar Pradesh, India",
    phone: "+91 98765 43210",
    description:
      "Smile Dental Clinic is a modern dental care center offering a wide range of dental treatments with experienced professionals and advanced equipment. Our goal is to provide safe, comfortable and high-quality dental care for every patient.",
    image: "/images/clinics/smile-dental-clinic.jpg",
    doctors: 5,
    experience: "10+ Years",
    patients: "2,500+",
    services: [
      "General Dentistry",
      "Braces & Orthodontics",
      "Cosmetic Dentistry",
      "Teeth Cleaning",
      "Root Canal Treatment",
      "Teeth Whitening",
    ],
    facilities: [
      "Experienced Dental Professionals",
      "Modern Equipment",
      "Comfortable Waiting Area",
      "Appointment Booking",
    ],
    workingHours: [
      { day: "Monday", short: "Mon", hours: "09:00 AM - 08:00 PM" },
      { day: "Tuesday", short: "Tue", hours: "09:00 AM - 08:00 PM" },
      { day: "Wednesday", short: "Wed", hours: "09:00 AM - 08:00 PM" },
      { day: "Thursday", short: "Thu", hours: "09:00 AM - 08:00 PM" },
      { day: "Friday", short: "Fri", hours: "09:00 AM - 08:00 PM" },
      { day: "Saturday", short: "Sat", hours: "10:00 AM - 06:00 PM" },
      { day: "Sunday", short: "Sun", hours: "Closed" },
    ],
    gallery: [
      "/images/clinics/smile-dental-clinic.jpg",
      "/images/clinics/smile-dental-clinic.jpg",
      "/images/clinics/smile-dental-clinic.jpg",
    ],
  },
  {
    id: 2,
    name: "Skin Care Clinic",
    slug: "skin-care-clinic",
    specialty: "Dermatology",
    category: "Skin & Hair Clinic",
    rating: 4.8,
    reviews: 96,
    location: "Sector 62, Noida",
    fullAddress: "Sector 62, Noida, Uttar Pradesh, India",
    phone: "+91 98765 12345",
    description:
      "Skin Care Clinic provides dermatology and aesthetic services in a professional clinical environment. The clinic offers personalized skin and hair care consultations.",
    image: "/images/clinics/skin-care-clinic.jpg",
    doctors: 4,
    experience: "8+ Years",
    patients: "1,800+",
    services: [
      "Skin Consultation",
      "Acne Treatment",
      "Hair Care",
      "Laser Treatments",
      "Skin Rejuvenation",
      "Cosmetic Dermatology",
    ],
    facilities: [
      "Qualified Specialists",
      "Modern Equipment",
      "Personalized Care",
      "Appointment Booking",
    ],
    workingHours: [
      { day: "Monday", short: "Mon", hours: "10:00 AM - 07:00 PM" },
      { day: "Tuesday", short: "Tue", hours: "10:00 AM - 07:00 PM" },
      { day: "Wednesday", short: "Wed", hours: "10:00 AM - 07:00 PM" },
      { day: "Thursday", short: "Thu", hours: "10:00 AM - 07:00 PM" },
      { day: "Friday", short: "Fri", hours: "10:00 AM - 07:00 PM" },
      { day: "Saturday", short: "Sat", hours: "10:00 AM - 05:00 PM" },
      { day: "Sunday", short: "Sun", hours: "Closed" },
    ],
    gallery: [
      "/images/clinics/skin-care-clinic.jpg",
      "/images/clinics/skin-care-clinic.jpg",
      "/images/clinics/skin-care-clinic.jpg",
    ],
  },
  {
    id: 3,
    name: "Life Care Physiotherapy",
    slug: "life-care-physiotherapy",
    specialty: "Physiotherapy",
    category: "Physiotherapy Clinic",
    rating: 4.7,
    reviews: 85,
    location: "Delhi",
    fullAddress: "New Delhi, India",
    phone: "+91 98765 67890",
    description:
      "Life Care Physiotherapy provides physiotherapy, rehabilitation and personalized care to help patients improve mobility and physical function.",
    image: "/images/clinics/life-care-physiotherapy.jpg",
    doctors: 3,
    experience: "9+ Years",
    patients: "1,500+",
    services: [
      "Physiotherapy",
      "Sports Rehabilitation",
      "Pain Management",
      "Post-Surgery Rehab",
      "Back Pain Treatment",
      "Mobility Therapy",
    ],
    facilities: [
      "Experienced Therapists",
      "Rehabilitation Equipment",
      "Personalized Treatment",
      "Appointment Booking",
    ],
    workingHours: [
      { day: "Monday", short: "Mon", hours: "08:00 AM - 08:00 PM" },
      { day: "Tuesday", short: "Tue", hours: "08:00 AM - 08:00 PM" },
      { day: "Wednesday", short: "Wed", hours: "08:00 AM - 08:00 PM" },
      { day: "Thursday", short: "Thu", hours: "08:00 AM - 08:00 PM" },
      { day: "Friday", short: "Fri", hours: "08:00 AM - 08:00 PM" },
      { day: "Saturday", short: "Sat", hours: "09:00 AM - 05:00 PM" },
      { day: "Sunday", short: "Sun", hours: "Closed" },
    ],
    gallery: [
      "/images/clinics/life-care-physiotherapy.jpg",
      "/images/clinics/life-care-physiotherapy.jpg",
      "/images/clinics/life-care-physiotherapy.jpg",
    ],
  },
  {
    id: 4,
    name: "Apollo Clinic",
    slug: "apollo-clinic",
    specialty: "General Medicine",
    category: "General Clinic",
    rating: 4.8,
    reviews: 145,
    location: "Gurugram",
    fullAddress: "Gurugram, Haryana, India",
    phone: "+91 98765 11111",
    description:
      "Apollo Clinic offers general medical consultations and healthcare services in a patient-focused clinical environment.",
    image: "/images/clinics/apollo-clinic.jpg",
    doctors: 8,
    experience: "12+ Years",
    patients: "3,000+",
    services: [
      "General Consultation",
      "Health Checkups",
      "Preventive Care",
      "Diagnostic Services",
      "Family Healthcare",
      "Follow-up Consultation",
    ],
    facilities: [
      "Qualified Doctors",
      "Diagnostic Facilities",
      "Patient Support",
      "Appointment Booking",
    ],
    workingHours: [
      { day: "Monday", short: "Mon", hours: "09:00 AM - 09:00 PM" },
      { day: "Tuesday", short: "Tue", hours: "09:00 AM - 09:00 PM" },
      { day: "Wednesday", short: "Wed", hours: "09:00 AM - 09:00 PM" },
      { day: "Thursday", short: "Thu", hours: "09:00 AM - 09:00 PM" },
      { day: "Friday", short: "Fri", hours: "09:00 AM - 09:00 PM" },
      { day: "Saturday", short: "Sat", hours: "09:00 AM - 07:00 PM" },
      { day: "Sunday", short: "Sun", hours: "10:00 AM - 02:00 PM" },
    ],
    gallery: [
      "/images/clinics/apollo-clinic.jpg",
      "/images/clinics/apollo-clinic.jpg",
      "/images/clinics/apollo-clinic.jpg",
    ],
  },
];

/* =========================================
   TYPES
========================================= */

type Clinic = (typeof clinics)[number];

type TabName =
  | "Overview"
  | "Doctors"
  | "Services"
  | "Gallery"
  | "Location"
  | "Reviews";

/* =========================================
   HELPERS
========================================= */

const cardClass =
  "rounded-2xl border border-[#ebe8f4] bg-white shadow-[0_8px_30px_rgba(43,29,96,0.035)]";

const iconBoxClass =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f1edff] text-[#4e44e1]";

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] font-bold text-white shadow-[0_8px_20px_rgba(78,68,225,0.20)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(78,68,225,0.28)]";

function getDirectionsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
}

/* =========================================
   PROFILE PAGE
========================================= */

export default function ClinicProfilePage() {
  const params = useParams<{ slug: string }>();

  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug;

  const clinic = clinics.find((item) => item.slug === slug);

  const [activeTab, setActiveTab] = useState<TabName>("Overview");
  const [showAllServices, setShowAllServices] = useState(false);
  const [showCallInfo, setShowCallInfo] = useState(false);

  if (!clinic) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f5f3ff] px-5 py-12">
        <div className="w-full max-w-lg rounded-3xl border border-[#ebe8f4] bg-white p-8 text-center shadow-[0_15px_50px_rgba(43,29,96,0.08)] sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f1edff] text-[#4e44e1]">
            <Building2 size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-[#17152b]">
            Clinic Not Found
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#4B5568]">
            We couldn&apos;t find this clinic. Please return to
            the clinic listing and select a clinic.
          </p>

          <Link
            href="/clinics"
            className={`${primaryButtonClass} mt-6 h-12 px-6 text-sm`}
          >
            <ArrowRight size={16} className="rotate-180" />
            Back to Clinics
          </Link>
        </div>
      </main>
    );
  }

  const tabs: TabName[] = [
    "Overview",
    "Doctors",
    "Services",
    "Gallery",
    "Location",
    "Reviews",
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Doctors":
        return (
          <section className={`${cardClass} p-5 sm:p-7`}>
            <SectionTitle
              title="Doctors at this Clinic"
              description="Meet the medical team associated with this clinic."
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {Array.from({ length: clinic.doctors }, (_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-xl border border-[#ebe8f4] bg-[#fbfaff] p-4 transition hover:border-[#cfc5ff] hover:bg-white"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f1edff] text-[#4e44e1]">
                    <UserRound size={26} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-[#17152b]">
                      {index === 0
                        ? "Clinic Specialist"
                        : `Clinic Doctor ${index + 1}`}
                    </h3>

                    <p className="mt-1 text-sm text-[#4B5568]">
                      {clinic.specialty}
                    </p>

                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#4e44e1]">
                      <Building2 size={13} />
                      {clinic.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-5 rounded-xl bg-[#f5f3ff] p-3 text-xs leading-6 text-[#77748c]">
              Doctor names and profiles can be connected when
              verified clinic doctor data is available.
            </p>
          </section>
        );

      case "Services":
        return (
          <section className={`${cardClass} p-5 sm:p-7`}>
            <SectionTitle
              title="Our Services"
              description="Explore the healthcare services available at this clinic."
            />

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {clinic.services.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-3 rounded-xl border border-[#ebe8f4] bg-white p-4 transition hover:border-[#cfc5ff] hover:bg-[#fbfaff]"
                >
                  <div className={iconBoxClass}>
                    <CheckCircle2 size={19} />
                  </div>

                  <span className="text-sm font-medium text-[#4B5568]">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </section>
        );

      case "Gallery":
        return (
          <section className={`${cardClass} p-5 sm:p-7`}>
            <SectionTitle
              title="Clinic Gallery"
              description="Take a look inside the clinic."
            />

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {clinic.gallery.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="group relative h-[220px] overflow-hidden rounded-2xl border border-[#ebe8f4] bg-[#f5f3ff]"
                >
                  <Image
                    src={image}
                    alt={`${clinic.name} gallery ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17152b]/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </section>
        );

      case "Location":
        return (
          <section className={`${cardClass} p-5 sm:p-7`}>
            <SectionTitle
              title="Clinic Location"
              description="Find the clinic address and open directions in Google Maps."
            />

            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#ebe8f4] bg-[#fbfaff] p-4 sm:flex-row sm:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f1edff] text-[#4e44e1]">
                <MapPin size={23} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-[#17152b]">
                  {clinic.name}
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#4B5568]">
                  {clinic.fullAddress}
                </p>
              </div>

              <a
                href={getDirectionsUrl(clinic.fullAddress)}
                target="_blank"
                rel="noreferrer"
                className={`${primaryButtonClass} h-11 shrink-0 px-4 text-sm`}
              >
                <Navigation size={16} />
                Get Directions
              </a>
            </div>

            <div className="mt-5 flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-[#ebe8f4] bg-gradient-to-br from-[#f1edff] via-[#fbfaff] to-[#f9f0ff] px-5 py-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#4e44e1] shadow-sm">
                <MapPin size={28} />
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#17152b]">
                {clinic.location}
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#4B5568]">
                {clinic.fullAddress}
              </p>

              <a
                href={getDirectionsUrl(clinic.fullAddress)}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#4e44e1] hover:text-[#9122b4]"
              >
                Open in Google Maps
                <ArrowRight size={15} />
              </a>
            </div>
          </section>
        );

      case "Reviews":
        return (
          <section className={`${cardClass} p-5 sm:p-7`}>
            <SectionTitle
              title="Patient Reviews"
              description="Ratings and feedback for this clinic."
            />

            <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-[#ebe8f4] bg-[#fbfaff] p-5 sm:flex-row sm:items-center sm:p-6">
              <div className="shrink-0">
                <p className="text-4xl font-extrabold tracking-tight text-[#17152b]">
                  {clinic.rating.toFixed(1)}
                </p>

                <div className="mt-2 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={17}
                      fill={
                        index < Math.round(clinic.rating)
                          ? "#fbbf24"
                          : "none"
                      }
                      stroke="#d99a06"
                    />
                  ))}
                </div>

                <p className="mt-2 text-sm text-[#77748c]">
                  Based on {clinic.reviews} reviews
                </p>
              </div>

              <div className="h-px w-full bg-[#ebe8f4] sm:h-16 sm:w-px" />

              <div>
                <h3 className="font-bold text-[#17152b]">
                  Share your experience
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#4B5568]">
                  Patient feedback can be displayed here when
                  verified review data is connected.
                </p>
              </div>
            </div>
          </section>
        );

      default:
        return (
          <div className="space-y-5">
            {/* ABOUT CLINIC */}

            <section className={`${cardClass} p-5 sm:p-7`}>
              <SectionTitle
                title="About Clinic"
                description="Learn more about this healthcare facility."
              />

              <p className="mt-4 text-sm leading-7 text-[#4B5568]">
                {clinic.description}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <StatCard
                  icon={<UserRound size={21} />}
                  value={`${clinic.doctors} Doctors`}
                  label="Our Team"
                />

                <StatCard
                  icon={<Clock3 size={21} />}
                  value={clinic.experience}
                  label="Experience"
                />

                <StatCard
                  icon={<Users size={21} />}
                  value={clinic.patients}
                  label="Patients Served"
                />
              </div>
            </section>

            {/* SERVICES */}

            <section className={`${cardClass} p-5 sm:p-7`}>
              <div className="flex items-center justify-between gap-3">
                <SectionTitle
                  title="Services"
                  description="Healthcare services offered by the clinic."
                />

                {clinic.services.length > 4 && (
                  <button
                    type="button"
                    onClick={() => setShowAllServices(!showAllServices)}
                    aria-expanded={showAllServices}
                    className="shrink-0 rounded-lg px-2 py-1 text-sm font-bold text-[#4e44e1] transition hover:bg-[#f1edff] hover:text-[#9122b4]"
                  >
                    {showAllServices ? "Show Less" : "View All"}
                  </button>
                )}
              </div>

              <div className="mt-5 grid gap-x-5 gap-y-4 sm:grid-cols-2">
                {(showAllServices
                  ? clinic.services
                  : clinic.services.slice(0, 4)
                ).map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 text-sm text-[#4B5568]"
                  >
                    <span className={iconBoxClass}>
                      <CheckCircle2 size={17} />
                    </span>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FACILITIES */}

            <section className={`${cardClass} p-5 sm:p-7`}>
              <SectionTitle
                title="Clinic Facilities"
                description="Facilities designed to support a comfortable visit."
              />

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {clinic.facilities.map((facility) => (
                  <div
                    key={facility}
                    className="flex items-center gap-3 text-sm text-[#4B5568]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f1edff] text-[#4e44e1]">
                      <ShieldCheck size={18} />
                    </span>
                    {facility}
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#4B5568]">
      {/* BREADCRUMB */}

      <div className="border-b border-[#ebe8f4] bg-white px-5 py-3.5 sm:px-8 lg:px-[5.25%]">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex max-w-7xl items-center gap-2.5 text-[13px] font-medium"
        >
          <Link
            href="/"
            aria-label="Home"
            className="text-[#4e44e1] transition hover:text-[#9122b4]"
          >
            <Home size={16} />
          </Link>

          <ChevronRight size={14} className="text-[#b0abc5]" />

          <Link
            href="/clinics"
            className="text-[#77748c] transition hover:text-[#4e44e1]"
          >
            Clinics
          </Link>

          <ChevronRight size={14} className="text-[#b0abc5]" />

          <span className="truncate font-semibold text-[#17152b]">
            {clinic.name}
          </span>
        </nav>
      </div>

      {/* CLINIC PROFILE HEADER */}

      <section className="relative isolate overflow-hidden border-b border-[#ebe8f4] bg-white px-5 py-7 sm:px-8 sm:py-9 lg:px-[5.25%]">
        <div className="pointer-events-none absolute -right-20 -top-28 -z-10 h-72 w-72 rounded-full bg-[#9122b4]/[0.07] blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-32 left-[20%] -z-10 h-64 w-64 rounded-full bg-[#4e44e1]/[0.06] blur-[90px]" />

        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 sm:flex-row sm:gap-7">
          {/* CLINIC IMAGE */}

          <div className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-2xl border border-[#ebe8f4] bg-[#f1edff] shadow-sm sm:h-[190px] sm:w-[240px] lg:h-[220px] lg:w-[280px]">
            <Image
              src={clinic.image}
              alt={clinic.name}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 280px"
              className="object-cover"
            />
          </div>

          {/* PROFILE DETAILS */}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-[27px] font-extrabold leading-tight tracking-[-0.7px] text-[#17152b] sm:text-[32px]">
                {clinic.name}
              </h1>

              <BadgeCheck
                size={22}
                fill="#4e44e1"
                className="shrink-0 text-white"
              />
            </div>

            <p className="mt-2 text-sm font-medium text-[#77748c]">
              {clinic.category}
            </p>

            {/* RATING */}

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    fill={
                      index < Math.round(clinic.rating)
                        ? "#fbbf24"
                        : "none"
                    }
                    stroke="#d99a06"
                  />
                ))}
              </div>

              <span className="text-sm font-bold text-[#17152b]">
                {clinic.rating.toFixed(1)}
              </span>

              <span className="text-[13px] text-[#77748c]">
                ({clinic.reviews} reviews)
              </span>

              <span className="mx-1 hidden h-4 w-px bg-[#ebe8f4] sm:block" />

              <span className="text-[13px] font-medium text-[#4B5568]">
                {clinic.specialty}
              </span>
            </div>

            {/* LOCATION & HOURS */}

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <div className="flex items-start gap-2 text-[13px] text-[#4B5568]">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-[#4e44e1]"
                />
                <span>{clinic.fullAddress}</span>
              </div>

              <div className="flex items-center gap-2 text-[13px] text-[#4B5568]">
                <Clock3 size={17} className="shrink-0 text-[#4e44e1]" />
                <span>{clinic.workingHours[0].hours}</span>
              </div>
            </div>

            {/* ACTION BUTTONS */}

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/appointments/book?clinic=${clinic.slug}`}
                className={`${primaryButtonClass} h-[46px] px-6 text-sm`}
              >
                <CalendarDays size={17} />
                Book Appointment
              </Link>

              <button
                type="button"
                onClick={() => setShowCallInfo(!showCallInfo)}
                aria-expanded={showCallInfo}
                className="inline-flex h-[46px] items-center justify-center gap-2 rounded-xl border border-[#ddd9ee] bg-white px-6 text-sm font-semibold text-[#4B5568] transition hover:border-[#cfc5ff] hover:bg-[#fbfaff] hover:text-[#4e44e1]"
              >
                <Phone size={17} />
                Call Clinic
              </button>
            </div>

            {showCallInfo && (
              <div className="mt-3 inline-flex flex-wrap items-center gap-3 rounded-xl border border-[#ebe8f4] bg-[#fbfaff] px-4 py-3">
                <Phone size={17} className="text-[#4e44e1]" />

                <span className="text-sm font-semibold text-[#17152b]">
                  {clinic.phone}
                </span>

                <a
                  href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                  className="text-sm font-bold text-[#4e44e1] hover:text-[#9122b4]"
                >
                  Call Now
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PROFILE TABS */}

      <section className="sticky top-0 z-30 border-b border-[#ebe8f4] bg-white/95 px-5 backdrop-blur-xl sm:px-8 lg:px-[5.25%]">
        <div className="mx-auto max-w-7xl overflow-x-auto">
          <div
            role="tablist"
            aria-label="Clinic profile sections"
            className="flex min-w-max items-center gap-1"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => {
                  setActiveTab(tab);
                  setShowAllServices(false);
                }}
                className={`relative flex h-[60px] items-center justify-center px-4 text-sm font-semibold transition-colors sm:px-5 ${
                  activeTab === tab
                    ? "text-[#4e44e1]"
                    : "text-[#77748c] hover:text-[#4e44e1]"
                }`}
              >
                {tab}

                {activeTab === tab && (
                  <span className="absolute bottom-0 left-4 right-4 h-[3px] rounded-t-full bg-gradient-to-r from-[#4e44e1] to-[#9122b4] sm:left-5 sm:right-5" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN PROFILE CONTENT */}

      <section className="px-5 py-7 sm:px-8 sm:py-9 lg:px-[5.25%]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_310px] xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* LEFT CONTENT */}

          <div className="min-w-0">{renderTabContent()}</div>

          {/* RIGHT SIDEBAR */}

          <aside className="space-y-5">
            {/* LOCATION CARD */}

            <section className={`${cardClass} overflow-hidden`}>
              <div className="flex items-center justify-between gap-3 px-5 pt-5">
                <h2 className="text-[17px] font-bold text-[#17152b]">
                  Location
                </h2>

                <a
                  href={getDirectionsUrl(clinic.fullAddress)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-[#4e44e1] hover:text-[#9122b4]"
                >
                  Get Directions
                </a>
              </div>

              {/* MAP PLACEHOLDER */}

              <div className="relative mx-5 mt-4 h-[180px] overflow-hidden rounded-xl border border-[#ebe8f4] bg-[#f0edf9]">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(#ddd8ed 1px, transparent 1px), linear-gradient(90deg, #ddd8ed 1px, transparent 1px)",
                    backgroundSize: "34px 34px",
                  }}
                />

                <div className="absolute left-[-15px] top-[48px] h-[15px] w-[115%] rotate-[19deg] border-y border-white bg-[#e9e4f4]" />

                <div className="absolute left-[42%] top-[-30px] h-[250px] w-[13px] rotate-[13deg] border-x border-white bg-[#e9e4f4]" />

                <div className="absolute bottom-[30px] left-[-20px] h-[10px] w-[120%] -rotate-[17deg] border-y border-white bg-[#e9e4f4]" />

                <div className="absolute right-[-20px] top-[12px] h-[55px] w-[90px] rounded-bl-[30px] bg-[#e3e0fa]" />

                <div className="absolute left-[48%] top-[42%] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                  <MapPin
                    size={37}
                    fill="#4e44e1"
                    stroke="white"
                    strokeWidth={1.8}
                  />
                </div>

                <div className="absolute bottom-2 left-2 rounded-lg border border-[#ebe8f4] bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#17152b] shadow-sm">
                  {clinic.location}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start gap-2.5">
                  <MapPin
                    size={17}
                    className="mt-0.5 shrink-0 text-[#4e44e1]"
                  />

                  <p className="text-[13px] leading-6 text-[#4B5568]">
                    {clinic.fullAddress}
                  </p>
                </div>

                <a
                  href={getDirectionsUrl(clinic.fullAddress)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#ddd9ee] text-[13px] font-semibold text-[#4e44e1] transition hover:border-[#cfc5ff] hover:bg-[#f5f3ff]"
                >
                  <Navigation size={15} />
                  Get Directions
                </a>
              </div>
            </section>

            {/* WORKING HOURS */}

            <section className={`${cardClass} p-5`}>
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f1edff] text-[#4e44e1]">
                  <Clock3 size={18} />
                </div>

                <h2 className="text-[17px] font-bold text-[#17152b]">
                  Working Hours
                </h2>
              </div>

              <div className="mt-5 space-y-3.5">
                {clinic.workingHours.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-start justify-between gap-3 text-xs sm:text-[13px]"
                  >
                    <span className="font-medium text-[#77748c]">
                      {item.short}
                    </span>

                    <span
                      className={`text-right font-semibold ${
                        item.hours === "Closed"
                          ? "text-[#dc4c64]"
                          : "text-[#4B5568]"
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-[#ebe8f4] pt-4">
                <div className="flex items-center gap-2 text-xs font-medium text-[#4e44e1]">
                  <span className="h-2 w-2 rounded-full bg-[#4e44e1]" />
                  Check availability before visiting
                </div>
              </div>
            </section>

            {/* CONTACT CARD */}

            <section className={`${cardClass} p-5`}>
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f1edff] text-[#4e44e1]">
                  <Phone size={18} />
                </div>

                <h2 className="text-[17px] font-bold text-[#17152b]">
                  Contact Clinic
                </h2>
              </div>

              <p className="mt-3 text-[13px] leading-6 text-[#4B5568]">
                For appointments and clinic-related enquiries,
                contact the clinic directly.
              </p>

              <a
                href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                className={`${primaryButtonClass} mt-4 h-11 w-full px-3 text-[13px]`}
              >
                <Phone size={16} />
                {clinic.phone}
              </a>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* =========================================
   REUSABLE SECTION TITLE
========================================= */

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-[-0.4px] text-[#17152b] sm:text-[22px]">
        {title}
      </h2>

      {description && (
        <p className="mt-1.5 text-[13px] leading-6 text-[#77748c]">
          {description}
        </p>
      )}
    </div>
  );
}

/* =========================================
   STAT CARD
========================================= */

function StatCard({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#ebe8f4] bg-[#fbfaff] p-3.5 transition hover:border-[#cfc5ff] hover:bg-white">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f1edff] text-[#4e44e1]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-bold text-[#17152b]">{value}</p>
        <p className="mt-0.5 text-xs text-[#77748c]">{label}</p>
      </div>
    </div>
  );
}
