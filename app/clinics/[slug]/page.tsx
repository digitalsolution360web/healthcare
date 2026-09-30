"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
  Stethoscope,
  HeartPulse,
  ShieldCheck,
  Award,
  Image as ImageIcon,
  MessageCircle,
  X,
} from "lucide-react";

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
    fullAddress:
      "Sector 18, Noida, Uttar Pradesh, India",

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
    fullAddress:
      "Sector 62, Noida, Uttar Pradesh, India",

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
   PROFILE PAGE
========================================= */

export default function ClinicProfilePage() {
  const params = useParams<{ slug: string }>();

  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug;

  const clinic = clinics.find(
    (item) => item.slug === slug
  );

  const [activeTab, setActiveTab] =
    useState<TabName>("Overview");

  const [showAllServices, setShowAllServices] =
    useState(false);

  const [showCallInfo, setShowCallInfo] =
    useState(false);

  /* =========================================
     NOT FOUND
  ========================================= */

  if (!clinic) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-white px-5">
        <div className="w-full max-w-lg rounded-2xl border border-[#dce6f2] bg-white p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eff6ff] text-[#0878d1]">
            <Building2 size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#183b60]">
            Clinic Not Found
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#475569]">
            We couldn't find this clinic. Please return to
            the clinic listing and select a clinic.
          </p>

          <Link
            href="/clinics"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0878d1] px-5 text-sm font-semibold text-white hover:bg-[#0667b5]"
          >
            <ArrowRight size={16} className="rotate-180" />
            Back to Clinics
          </Link>
        </div>
      </main>
    );
  }

  /* =========================================
     TABS
  ========================================= */

  const tabs: TabName[] = [
    "Overview",
    "Doctors",
    "Services",
    "Gallery",
    "Location",
    "Reviews",
  ];

  /* =========================================
     TAB CONTENT
  ========================================= */

  const renderTabContent = () => {
    switch (activeTab) {
      case "Doctors":
        return (
          <section className="rounded-xl border border-[#dce6f2] bg-white p-5 sm:p-6">
            <h2 className="text-[25px] font-bold text-black">
               Doctors at this Clinic
                </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {Array.from(
                { length: clinic.doctors },
                (_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-xl border border-[#e2e8f0] p-4"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-[#0878d1]">
                      <UserRound size={26} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-bold text-[#183b60]">
                        {index === 0
                          ? "Clinic Specialist"
                          : `Clinic Doctor ${index + 1}`}
                      </h3>

                      <p className="mt-1 text-sm text-[#475569]">
                        {clinic.specialty}
                      </p>

                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#0878d1]">
                        <Building2 size={13} />
                        {clinic.name}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>

            <p className="mt-4 text-xs leading-5 text-[#64748b]">
              Doctor names and profiles can be connected
              when the clinic's doctor data is available.
            </p>
          </section>
        );

      case "Services":
        return (
          <section className="rounded-xl border border-[#dce6f2] bg-white p-5 sm:p-6">
             <h2 className="text-[25px] font-bold text-black">
              Our Services
                </h2>


            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {clinic.services.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-3 rounded-lg border border-[#e2e8f0] bg-white p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-[#0878d1]">
                    <CheckCircle2 size={18} />
                  </div>

                  <span className="text-sm font-medium text-[#344f6a]">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </section>
        );

      case "Gallery":
        return (
          <section className="rounded-xl border border-[#dce6f2] bg-white p-5 sm:p-6">
            <SectionTitle
              title="Clinic Gallery"
              description="Take a look inside the clinic."
            />

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {clinic.gallery.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="relative h-[220px] overflow-hidden rounded-xl border border-[#e2e8f0] bg-[#f1f5f9]"
                >
                  <Image
                    src={image}
                    alt={`${clinic.name} gallery ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        );

      case "Location":
        return (
          <section className="rounded-xl border border-[#dce6f2] bg-white p-5 sm:p-6">
            <SectionTitle
              title="Clinic Location"
              description="Find the clinic's address and directions."
            />

            <div className="mt-5 flex flex-col gap-4 rounded-xl border border-[#e2e8f0] p-4 sm:flex-row sm:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff] text-[#0878d1]">
                <MapPin size={23} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-[#183b60]">
                  {clinic.name}
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#475569]">
                  {clinic.fullAddress}
                </p>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  clinic.fullAddress
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0878d1] px-4 text-sm font-semibold text-white hover:bg-[#0667b5]"
              >
                <Navigation size={16} />
                Get Directions
              </a>
            </div>

            <div className="mt-4 flex h-[240px] flex-col items-center justify-center rounded-xl border border-[#dce6f2] bg-[#f1f7fd] px-5 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#0878d1]">
                <MapPin size={28} />
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#183b60]">
                {clinic.location}
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#475569]">
                {clinic.fullAddress}
              </p>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  clinic.fullAddress
                )}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 text-sm font-semibold text-[#0878d1] hover:text-[#075ca5]"
              >
                Open in Google Maps →
              </a>
            </div>
          </section>
        );

      case "Reviews":
        return (
          <section className="rounded-xl border border-[#dce6f2] bg-white p-5 sm:p-6">
            <SectionTitle
              title="Patient Reviews"
              description="Ratings and feedback for this clinic."
            />

            <div className="mt-5 flex flex-col gap-5 rounded-xl bg-[#f8fafc] p-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-4xl font-extrabold text-[#183b60]">
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

                <p className="mt-2 text-sm text-[#475569]">
                  Based on {clinic.reviews} reviews
                </p>
              </div>

              <div className="h-px w-full bg-[#dce6f2] sm:h-16 sm:w-px" />

              <div>
                <h3 className="font-bold text-[#183b60]">
                  Share your experience
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#475569]">
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

            <section className="rounded-xl border border-[#dce6f2] bg-white p-5 sm:p-6">
            <h2 className="text-[30px] font-bold text-black">
                About Clinic
                </h2>

              <p className="mt-3 text-[14px] leading-[1.9] text-[#405975]">
                {clinic.description}
              </p>

              {/* CLINIC STATISTICS */}

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

            <section className="rounded-xl border border-[#dce6f2] bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
              <h2 className="text-[25px] font-bold text-black">
                Services
                </h2>

                {clinic.services.length > 4 && (
                  <button
                    type="button"
                    onClick={() =>
                      setShowAllServices(!showAllServices)
                    }
                    className="shrink-0 text-sm font-semibold text-[#0878d1] hover:text-[#075ca5]"
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
                    className="flex items-center gap-3 text-[14px] text-[#344f6a]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-[#0878d1]">
                      <CheckCircle2 size={17} />
                    </span>

                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FACILITIES */}

            <section className="rounded-xl border border-[#dce6f2] bg-white p-5 sm:p-6">
             <h2 className="text-[25px] font-bold text-black">
                Clinic Facilities
                </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {clinic.facilities.map((facility) => (
                  <div
                    key={facility}
                    className="flex items-center gap-3 text-sm text-[#344f6a]"
                  >
                    <ShieldCheck
                      size={18}
                      className="shrink-0 text-[#0878d1]"
                    />

                    {facility}
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  /* =========================================
     PAGE UI
  ========================================= */

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#183b60]">

      {/* BREADCRUMB */}

      <div className="border-b border-[#e2e8f0] bg-white px-5 py-3.5 sm:px-8 lg:px-[5.25%]">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex max-w-7xl items-center gap-2.5 text-[13px] font-medium"
        >
          <Link
            href="/"
            aria-label="Home"
            className="text-[#0878d1] hover:text-[#075ca5]"
          >
            <Home size={16} />
          </Link>

          <ChevronRight
            size={14}
            className="text-[#94a3b8]"
          />

          <Link
            href="/clinics"
            className="text-[#53677f] hover:text-[#0878d1]"
          >
            Clinics
          </Link>

          <ChevronRight
            size={14}
            className="text-[#94a3b8]"
          />

          <span className="truncate font-semibold text-[#183b60]">
            {clinic.name}
          </span>
        </nav>
      </div>

      {/* =====================================
          CLINIC PROFILE HEADER
      ===================================== */}

      <section className="border-b border-[#dce6f2] bg-white px-5 py-6 sm:px-8 sm:py-8 lg:px-[5.25%]">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 sm:flex-row sm:gap-7">

          {/* CLINIC IMAGE */}

          <div className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-xl border border-[#dce6f2] bg-[#f1f5f9] sm:h-[190px] sm:w-[240px] lg:h-[210px] lg:w-[270px]">
            <Image
              src={clinic.image}
              alt={clinic.name}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 270px"
              className="object-cover"
            />
          </div>

          {/* PROFILE DETAILS */}

          <div className="min-w-0 flex-1">

            {/* NAME */}

            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-[25px] font-extrabold leading-tight tracking-[-0.6px] text-black sm:text-[30px]">
                {clinic.name}
              </h1>

              <BadgeCheck
                size={21}
                fill="#0878d1"
                className="shrink-0 text-white"
              />
            </div>

            <p className="mt-2 text-[14px] font-medium text-[#53677f]">
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

              <span className="text-[14px] font-bold text-[#183b60]">
                {clinic.rating.toFixed(1)}
              </span>

              <span className="text-[13px] text-[#64748b]">
                ({clinic.reviews} reviews)
              </span>

              <span className="mx-1 hidden h-4 w-px bg-[#dce6f2] sm:block" />

              <span className="text-[13px] font-medium text-[#53677f]">
                {clinic.specialty}
              </span>
            </div>

            {/* LOCATION & HOURS */}

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <div className="flex items-start gap-2 text-[13px] text-[#405975]">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-[#0878d1]"
                />

                <span>{clinic.fullAddress}</span>
              </div>

              <div className="flex items-center gap-2 text-[13px] text-[#405975]">
                <Clock3
                  size={17}
                  className="shrink-0 text-[#0878d1]"
                />

                <span>
                  {clinic.workingHours[0].hours}
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS */}

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/appointments/book?clinic=${clinic.slug}`}
                className="inline-flex h-[46px] items-center justify-center gap-2 rounded-lg bg-[#0878d1] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#0667b5]"
              >
                <CalendarDays size={17} />
                Book Appointment
              </Link>

              <button
                type="button"
                onClick={() => setShowCallInfo(!showCallInfo)}
                className="inline-flex h-[46px] items-center justify-center gap-2 rounded-lg border border-[#cbd8e8] bg-white px-6 text-[14px] font-semibold text-[#183b60] transition-colors hover:bg-[#f8fafc]"
              >
                <Phone size={17} />
                Call Clinic
              </button>
            </div>

            {showCallInfo && (
              <div className="mt-3 inline-flex flex-wrap items-center gap-3 rounded-lg border border-[#dce6f2] bg-[#f8fafc] px-4 py-3">
                <Phone
                  size={17}
                  className="text-[#0878d1]"
                />

                <span className="text-sm font-semibold text-[#183b60]">
                  {clinic.phone}
                </span>

                <a
                  href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                  className="text-sm font-bold text-[#0878d1] hover:text-[#075ca5]"
                >
                  Call Now
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================
          PROFILE TABS
      ===================================== */}

      <section className="border-b border-[#dce6f2] bg-white px-5 sm:px-8 lg:px-[5.25%]">
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
                onClick={() => setActiveTab(tab)}
                className={`relative flex h-[58px]  items-center justify-center px-4 text-[14px] font-semibold transition-colors sm:px-5 ${
                  activeTab === tab
                    ? "text-black"
                    : "text-black hover:text-[#0878d1]"
                }`}
              >
                {tab}

                {activeTab === tab && (
                  <span className="absolute bottom-0 left-4 right-4 h-[3px] rounded-t-full bg-[#0878d1] sm:left-5 sm:right-5" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================
          MAIN PROFILE CONTENT
      ===================================== */}

      <section className="bg-[#f8fafc] px-5 py-6 sm:px-8 sm:py-8 lg:px-[5.25%]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_310px] xl:grid-cols-[minmax(0,1fr)_340px]">

          {/* LEFT CONTENT */}

          <div className="min-w-0">
            {renderTabContent()}
          </div>

          {/* RIGHT SIDEBAR */}

          <aside className="space-y-5">

            {/* LOCATION CARD */}

            <section className="overflow-hidden rounded-xl border border-[#dce6f2] bg-white">
              <div className="flex items-center justify-between gap-3 px-5 pt-5">
                <h2 className="text-[17px] font-bold text-black">
                  Location
                </h2>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    clinic.fullAddress
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[12px] font-semibold text-[#0878d1] hover:text-[#075ca5]"
                >
                  Get Directions
                </a>
              </div>

              {/* MAP PLACEHOLDER */}

              <div className="relative mx-5 mt-4 h-[180px] overflow-hidden rounded-lg border border-[#e2e8f0] bg-[#edf4f4]">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(#d7e5e5 1px, transparent 1px), linear-gradient(90deg, #d7e5e5 1px, transparent 1px)",
                    backgroundSize: "34px 34px",
                  }}
                />

                <div className="absolute left-[-15px] top-[48px] h-[15px] w-[115%] rotate-[19deg] border-y border-white bg-[#e2e9dc]" />

                <div className="absolute left-[42%] top-[-30px] h-[250px] w-[13px] rotate-[13deg] border-x border-white bg-[#e2e9dc]" />

                <div className="absolute bottom-[30px] left-[-20px] h-[10px] w-[120%] -rotate-[17deg] border-y border-white bg-[#e2e9dc]" />

                <div className="absolute right-[-20px] top-[12px] h-[55px] w-[90px] rounded-bl-[30px] bg-[#d6e8ef]" />

                <div className="absolute left-[48%] top-[42%] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                  <MapPin
                    size={37}
                    fill="#dc2626"
                    stroke="white"
                    strokeWidth={1.8}
                  />
                </div>

                <div className="absolute bottom-2 left-2 rounded-md border border-[#dce6f2] bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#183b60]">
                  {clinic.location}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start gap-2.5">
                  <MapPin
                    size={17}
                    className="mt-0.5 shrink-0 text-[#0878d1]"
                  />

                  <p className="text-[13px] leading-6 text-[#405975]">
                    {clinic.fullAddress}
                  </p>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    clinic.fullAddress
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#cbd8e8] text-[13px] font-semibold text-[#0878d1] hover:bg-[#eff6ff]"
                >
                  <Navigation size={15} />
                  Get Directions
                </a>
              </div>
            </section>

            {/* WORKING HOURS */}

            <section className="rounded-xl border border-[#dce6f2] bg-white p-5">
              <div className="flex items-center gap-2.5">
                <Clock3
                  size={19}
                  className="text-[#0878d1]"
                />

                <h2 className="text-[17px] font-bold text-[#183b60]">
                  Working Hours
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                {clinic.workingHours.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-start justify-between gap-3 text-[12px] sm:text-[13px]"
                  >
                    <span className="font-medium text-[#53677f]">
                      {item.short}
                    </span>

                    <span
                      className={`text-right font-semibold ${
                        item.hours === "Closed"
                          ? "text-[#dc2626]"
                          : "text-[#344f6a]"
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-[#e2e8f0] pt-4">
                <div className="flex items-center gap-2 text-[12px] font-medium text-[#047857]">
                  <span className="h-2 w-2 rounded-full bg-[#059669]" />
                  Check availability before visiting
                </div>
              </div>
            </section>

            {/* CONTACT CARD */}

            <section className="rounded-xl border border-[#dce6f2] bg-white p-5">
              <div className="flex items-center gap-2.5">
                <Phone
                  size={19}
                  className="text-[#0878d1]"
                />

                <h2 className="text-[17px] font-bold text-[#183b60]">
                  Contact Clinic
                </h2>
              </div>

              <p className="mt-3 text-[13px] leading-6 text-[#53677f]">
                For appointments and clinic-related enquiries,
                contact the clinic directly.
              </p>

              <a
                href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0878d1] px-4 text-[13px] font-bold text-white hover:bg-[#0667b5]"
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
      <h2 className="text-[20px] font-bold tracking-[-0.3px] text-[#183b60]">
        {title}
      </h2>

      {description && (
        <p className="mt-1.5 text-[13px] leading-6 text-[#64748b]">
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
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#e2e8f0] bg-white p-3.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-[#0878d1]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[14px] font-bold text-[#183b60]">
          {value}
        </p>

        <p className="mt-0.5 text-[12px] text-[#64748b]">
          {label}
        </p>
      </div>
    </div>
  );
}