
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
  MessageCircle,
  ShieldCheck,
  Award,
  CheckCircle2,
  Star,
  BriefcaseMedical,
  GraduationCap,
  UsersRound,
  Building2,
  MapPin,
  Clock3,
  ExternalLink,
  Phone,
  Mail,
  ArrowUpRight,
  HeartPulse,
  X,
} from "lucide-react";

/* =========================================
   THEME COLORS
========================================= */

const THEME = {
  primary: "#4e44e1",
  secondary: "#9122b4",
  text: "#17152b",
  muted: "#5f6078",
  border: "#ebe8f4",
};

/* =========================================
   DOCTOR DATA
========================================= */

const doctors = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    slug: "dr-priya-sharma",
    specialty: "Cardiologist",
    experience: 15,
    qualification: "MBBS, MD (Cardiology)",
    rating: 4.8,
    reviews: 120,
    fee: 800,
    patients: "2000+",
    image: "/images/doctors/dr-priya-sharma.jpg",
    verified: true,
    available: true,
    about:
      "Dr. Priya Sharma is a highly experienced cardiologist with over 15 years of experience in treating heart-related conditions. She is known for her patient-centric approach and evidence-based medical care. Her expertise includes preventive cardiology, heart disease management, and comprehensive cardiac evaluation.",
    specialties: [
      "Heart Disease Treatment",
      "ECG",
      "Echocardiography",
      "Angiography",
      "Hypertension Management",
      "Preventive Cardiology",
    ],
    clinic: {
      name: "Care Multispeciality Clinic",
      address: "Sector 18, Noida, Uttar Pradesh",
      phone: "+91 98765 43210",
      email: "careclinic@example.com",
    },
    hours: [
      { day: "Monday", time: "09:00 AM - 05:00 PM" },
      { day: "Tuesday", time: "09:00 AM - 05:00 PM" },
      { day: "Wednesday", time: "09:00 AM - 05:00 PM" },
      { day: "Thursday", time: "09:00 AM - 05:00 PM" },
      { day: "Friday", time: "09:00 AM - 05:00 PM" },
      { day: "Saturday", time: "10:00 AM - 02:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
  },
  {
    id: 2,
    name: "Dr. Rahul Mehta",
    slug: "dr-rahul-mehta",
    specialty: "Dermatologist",
    experience: 8,
    qualification: "MBBS, MD (Dermatology)",
    rating: 4.7,
    reviews: 98,
    fee: 600,
    patients: "1500+",
    image: "/images/doctors/dr-rahul-mehta.jpg",
    verified: true,
    available: true,
    about:
      "Dr. Rahul Mehta is an experienced dermatologist providing consultations for common skin, hair, and nail conditions. His approach focuses on personalized treatment plans, patient education, and evidence-based dermatological care.",
    specialties: [
      "Skin Treatment",
      "Acne Treatment",
      "Hair Loss Treatment",
      "Eczema",
      "Skin Allergy",
      "Dermatological Consultation",
    ],
    clinic: {
      name: "Care Multispeciality Clinic",
      address: "Sector 62, Noida, Uttar Pradesh",
      phone: "+91 98765 43210",
      email: "careclinic@example.com",
    },
    hours: [
      { day: "Monday", time: "09:00 AM - 05:00 PM" },
      { day: "Tuesday", time: "09:00 AM - 05:00 PM" },
      { day: "Wednesday", time: "09:00 AM - 05:00 PM" },
      { day: "Thursday", time: "09:00 AM - 05:00 PM" },
      { day: "Friday", time: "09:00 AM - 05:00 PM" },
      { day: "Saturday", time: "10:00 AM - 02:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
  },
  {
    id: 3,
    name: "Dr. Neha Gupta",
    slug: "dr-neha-gupta",
    specialty: "Gynecologist",
    experience: 12,
    qualification: "MBBS, MD (Gynecology)",
    rating: 4.9,
    reviews: 150,
    fee: 900,
    patients: "1800+",
    image: "/images/doctors/dr-neha-gupta.jpg",
    verified: true,
    available: true,
    about:
      "Dr. Neha Gupta provides women's healthcare consultations, preventive care, and guidance for a range of gynecological concerns. She emphasizes patient comfort, clear communication, and individualized care.",
    specialties: [
      "Women's Health",
      "Pregnancy Consultation",
      "PCOS Management",
      "Routine Gynecological Care",
      "Preventive Screening",
    ],
    clinic: {
      name: "Care Multispeciality Clinic",
      address: "Delhi, India",
      phone: "+91 98765 43210",
      email: "careclinic@example.com",
    },
    hours: [
      { day: "Monday", time: "09:00 AM - 05:00 PM" },
      { day: "Tuesday", time: "09:00 AM - 05:00 PM" },
      { day: "Wednesday", time: "09:00 AM - 05:00 PM" },
      { day: "Thursday", time: "09:00 AM - 05:00 PM" },
      { day: "Friday", time: "09:00 AM - 05:00 PM" },
      { day: "Saturday", time: "10:00 AM - 02:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
  },
];

type Doctor = (typeof doctors)[number];
type TabType = "Overview" | "Specialties" | "Reviews" | "Clinic Info";

/* =========================================
   REUSABLE THEME CLASSES
========================================= */

const iconBox =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f3f1ff] text-[#4e44e1]";

const secondaryText = "text-[#5f6078]";
const cardBorder = "border border-[#ebe8f4]";
const hoverBorder = "transition duration-300 hover:border-[#c9c2f2]";

/* =========================================
   DOCTOR PROFILE PAGE
========================================= */

export default function DoctorProfilePage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const doctor: Doctor | undefined = doctors.find(
    (item) => item.slug === slug
  );

  const [activeTab, setActiveTab] = useState<TabType>("Overview");
  const [readMore, setReadMore] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const tabs: TabType[] = [
    "Overview",
    "Specialties",
    "Reviews",
    "Clinic Info",
  ];

  /* =========================================
     DOCTOR NOT FOUND
  ========================================= */

  if (!doctor) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#faf9ff] px-5 py-12">
        <div
          className={`w-full max-w-[560px] rounded-3xl bg-white p-8 text-center shadow-[0_15px_55px_rgba(78,68,225,0.08)] sm:p-12 ${cardBorder}`}
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#f3f1ff] text-[#4e44e1]">
            <HeartPulse size={36} />
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#17152b]">
            Doctor Not Found
          </h1>

          <p className={`mt-4 text-base leading-8 ${secondaryText}`}>
            The doctor profile you are looking for does not exist.
          </p>

          <Link
            href="/doctors"
            className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-8 text-base font-semibold text-white shadow-lg shadow-[#4e44e1]/15 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Browse All Doctors
          </Link>
        </div>
      </main>
    );
  }

  const clinicMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${doctor.clinic.name} ${doctor.clinic.address}`
  )}`;

  return (
    <main className="min-h-screen bg-[#faf9ff] text-[#17152b]">
      {/* =====================================
          BREADCRUMB
      ===================================== */}

      <div className="border-b border-[#ebe8f4]  bg-gradient-to-r from-[#f4f2ff] via-[#fbfaff] to-[#f9f0ff]">
        <div className="mx-auto flex h-[58px] max-w-[1440px] items-center gap-2.5 overflow-hidden px-4 text-sm font-medium sm:gap-3 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-[#4e44e1] transition hover:text-[#9122b4]"
          >
            <Home size={17} />
            <span>Home</span>
          </Link>

          <ChevronRight size={16} className="shrink-0 text-[#aaa5c3]" />

          <Link
            href="/doctors"
            className="shrink-0 text-[#4e44e1] transition hover:text-[#9122b4]"
          >
            Doctors
          </Link>

          <ChevronRight size={16} className="shrink-0 text-[#aaa5c3]" />

          <span className="truncate text-[#5f6078]">Doctor Profile</span>
        </div>
      </div>

      {/* =====================================
          MAIN PROFILE CONTAINER
      ===================================== */}

      <section className="px-4 pb-12 pt-7 bg-white sm:px-6 lg:px-10 lg:pb-16 lg:pt-9">
        <div className="mx-auto max-w-[1440px]">
          {/* DOCTOR HERO CARD */}

          <div
            className={`overflow-hidden rounded-2xl bg-white shadow-[0_8px_35px_rgba(47,35,100,0.055)] ${cardBorder}`}
          >
            <div className="h-1.5 bg-gradient-to-r from-[#4e44e1] via-[#7150df] to-[#9122b4]" />

            <div className="flex flex-col gap-7 p-5 sm:p-8 md:flex-row md:gap-9 lg:gap-10 lg:p-10">
              {/* DOCTOR IMAGE */}

              <div className="relative h-[320px] w-full shrink-0 overflow-hidden rounded-2xl border border-[#e7e2f3] bg-[#f0edf9] sm:h-[360px] md:h-[310px] md:w-[250px] lg:h-[350px] lg:w-[290px]">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 250px, 290px"
                  className="object-cover object-top"
                />

                {doctor.verified && (
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-[#d6f5e8] bg-white/95 px-3.5 py-2.5 text-xs font-semibold text-[#047857] shadow-sm backdrop-blur">
                    <ShieldCheck size={16} />
                    Verified Doctor
                  </div>
                )}
              </div>

              {/* DOCTOR INFORMATION */}

              <div className="min-w-0 flex-1 py-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#17152b] sm:text-4xl lg:text-[42px]">
                    {doctor.name}
                  </h1>

                  {doctor.verified && (
                    <BadgeCheck
                      size={26}
                      fill="#4e44e1"
                      className="shrink-0 text-white"
                    />
                  )}
                </div>

                <p className="mt-3 text-lg font-medium text-[#5f6078] sm:text-xl">
                  {doctor.specialty}
                </p>

                {/* EXPERIENCE */}

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-base leading-7 text-[#5f6078]">
                  <span className="inline-flex items-center gap-2">
                    <BriefcaseMedical
                      size={18}
                      className="shrink-0 text-[#4e44e1]"
                    />
                    {doctor.experience}+ years experience
                  </span>

                  <span className="hidden h-5 w-px bg-[#ddd8ed] sm:block" />

                  <span className="inline-flex items-center gap-2">
                    <GraduationCap
                      size={19}
                      className="shrink-0 text-[#9122b4]"
                    />
                    {doctor.qualification}
                  </span>
                </div>

                {/* RATING */}

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        fill="#fbbf24"
                        stroke="#fbbf24"
                      />
                    ))}
                  </div>

                  <span className="text-base font-bold text-[#17152b]">
                    {doctor.rating}
                  </span>

                  <span className="text-sm text-[#85829c]">
                    ({doctor.reviews} reviews)
                  </span>
                </div>

                {/* CONSULTATION FEE */}

                <div className="mt-5">
                  <p className="text-sm font-medium text-[#85829c]">
                    Consultation Fee
                  </p>

                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#17152b]">
                      ₹{doctor.fee}
                    </span>

                    <span className="text-base text-[#85829c]">/ visit</span>
                  </div>
                </div>

                {/* ACTION BUTTONS */}

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/appointments/book?doctor=${doctor.slug}`}
                    className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-6 text-sm font-semibold text-white shadow-md shadow-[#4e44e1]/15 transition hover:-translate-y-0.5 hover:shadow-lg sm:text-base"
                  >
                    <CalendarDays size={19} />
                    Book Appointment
                    <ArrowUpRight size={17} />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setShowMessage(true)}
                    className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl border border-[#d9d3f1] bg-white px-6 text-sm font-semibold text-[#4e44e1] transition hover:border-[#b9afea] hover:bg-[#f7f5ff] sm:text-base"
                  >
                    <MessageCircle size={19} />
                    Message
                  </button>
                </div>
              </div>
            </div>

            {/* TRUST BADGES */}

            <div className="flex flex-wrap items-center gap-3 border-t border-[#ebe8f4] bg-[#fdfcff] px-5 py-5 sm:px-8 lg:px-10">
              <span className="inline-flex min-h-[38px] items-center gap-2 rounded-full bg-[#ecfaf3] px-4 py-2 text-sm font-medium text-[#047857]">
                <ShieldCheck size={17} />
                Verified Doctor
              </span>

              <span className="inline-flex min-h-[38px] items-center gap-2 rounded-full bg-[#f3f1ff] px-4 py-2 text-sm font-medium text-[#4e44e1]">
                <Award size={17} />
                Top Rated
              </span>

              {doctor.available && (
                <span className="inline-flex min-h-[38px] items-center gap-2 rounded-full bg-[#ecfaf3] px-4 py-2 text-sm font-medium text-[#047857]">
                  <CheckCircle2 size={17} />
                  Available Today
                </span>
              )}
            </div>
          </div>

          {/* TABS + PROFILE CONTENT */}

          <div
            className={`mt-7 overflow-hidden rounded-2xl bg-white shadow-[0_8px_35px_rgba(47,35,100,0.045)] ${cardBorder}`}
          >
            {/* TAB NAVIGATION */}

            <div className="overflow-x-auto border-b border-[#ebe8f4]">
              <div className="flex min-w-max items-center gap-1 px-3 sm:px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab);
                      setReadMore(false);
                    }}
                    className={`relative flex h-[66px] items-center justify-center px-5 text-sm font-semibold transition-colors sm:px-7 sm:text-base ${
                      activeTab === tab
                        ? "text-[#4e44e1]"
                        : "text-[#77748f] hover:text-[#4e44e1]"
                    }`}
                  >
                    {tab}

                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-t-full bg-gradient-to-r from-[#4e44e1] to-[#9122b4]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB BODY */}

            <div className="grid grid-cols-1 gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-10 lg:p-9">
              {/* LEFT CONTENT */}

              <div className="min-w-0">
                {/* OVERVIEW TAB */}

                {activeTab === "Overview" && (
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-[#17152b] sm:text-[28px]">
                      About {doctor.name}
                    </h2>

                    <p className="mt-4 text-base leading-8 text-[#5f6078] sm:text-[17px]">
                      {readMore
                        ? doctor.about
                        : `${doctor.about.slice(0, 240)}...`}
                    </p>

                    <button
                      type="button"
                      onClick={() => setReadMore(!readMore)}
                      className="mt-3 inline-flex items-center gap-2 text-base font-semibold text-[#4e44e1] transition hover:text-[#9122b4]"
                    >
                      {readMore ? "Read Less" : "Read More"}
                      <ChevronRight
                        size={18}
                        className={readMore ? "-rotate-90" : "rotate-90"}
                      />
                    </button>

                    {/* QUICK STATS */}

                    <div className="mt-8 grid grid-cols-1 border-y border-[#ebe8f4] py-5 sm:grid-cols-3">
                      <div className="flex items-center gap-4 py-3 sm:py-0">
                        <div className={iconBox}>
                          <BriefcaseMedical size={23} />
                        </div>

                        <div>
                          <p className="text-base font-bold text-[#17152b]">
                            {doctor.experience}+ Years
                          </p>
                          <p className="mt-1 text-sm text-[#85829c]">
                            Experience
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 border-y border-[#ebe8f4] py-4 sm:border-x sm:border-y-0 sm:px-5 sm:py-0">
                        <div className={iconBox}>
                          <GraduationCap size={24} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-base font-bold text-[#17152b]">
                            {doctor.qualification.split(",")[0]}
                          </p>
                          <p className="mt-1 text-sm text-[#85829c]">
                            Qualification
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 py-3 sm:py-0 sm:pl-5">
                        <div className={iconBox}>
                          <UsersRound size={23} />
                        </div>

                        <div>
                          <p className="text-base font-bold text-[#17152b]">
                            {doctor.patients}
                          </p>
                          <p className="mt-1 text-sm text-[#85829c]">
                            Patients Treated
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* SPECIALTIES */}

                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-[#17152b] sm:text-2xl">
                        Specialties &amp; Services
                      </h3>

                      <div className="mt-4 flex flex-wrap gap-3">
                        {doctor.specialties.map((item) => (
                          <span
                            key={item}
                            className="inline-flex min-h-[42px] items-center rounded-full border border-[#e6e1f3] bg-[#faf9ff] px-4 py-2 text-sm font-medium leading-6 text-[#514e6b] transition hover:border-[#c9c2f2] hover:bg-[#f3f1ff] sm:text-base"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SPECIALTIES TAB */}

                {activeTab === "Specialties" && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#17152b] sm:text-[28px]">
                      Specialties &amp; Services
                    </h2>

                    <p className="mt-3 text-base leading-8 text-[#5f6078] sm:text-[17px]">
                      Services and areas of consultation offered by{" "}
                      {doctor.name}.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {doctor.specialties.map((item) => (
                        <div
                          key={item}
                          className={`flex min-h-[90px] items-center gap-4 rounded-xl bg-[#fdfcff] p-5 ${cardBorder} ${hoverBorder} hover:bg-[#faf9ff]`}
                        >
                          <div className={iconBox}>
                            <HeartPulse size={23} />
                          </div>

                          <span className="text-base font-medium leading-7 text-[#514e6b]">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* REVIEWS TAB */}

                {activeTab === "Reviews" && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#17152b] sm:text-[28px]">
                      Patient Reviews
                    </h2>

                    <p className="mt-3 text-base leading-7 text-[#85829c]">
                      Ratings and feedback for {doctor.name}.
                    </p>

                    <div
                      className={`mt-6 rounded-xl bg-gradient-to-br from-[#faf9ff] to-[#f7f1ff] p-6 sm:p-8 ${cardBorder}`}
                    >
                      <div className="flex flex-wrap items-center gap-5">
                        <span className="text-5xl font-bold text-[#17152b]">
                          {doctor.rating}
                        </span>

                        <div>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={22}
                                fill="#fbbf24"
                                stroke="#fbbf24"
                              />
                            ))}
                          </div>

                          <p className="mt-2 text-sm text-[#85829c]">
                            Based on {doctor.reviews} reviews
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={`mt-5 rounded-xl p-6 sm:p-7 ${cardBorder}`}>
                      <div className="flex items-center gap-3">
                        <div className={iconBox}>
                          <MessageCircle size={21} />
                        </div>

                        <p className="text-base font-semibold text-[#514e6b]">
                          Patient feedback
                        </p>
                      </div>

                      <p className="mt-4 text-base leading-8 text-[#85829c]">
                        Patient review details will appear here when reviews
                        are added to the doctor profile.
                      </p>
                    </div>
                  </div>
                )}

                {/* CLINIC INFO TAB */}

                {activeTab === "Clinic Info" && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#17152b] sm:text-[28px]">
                      Clinic Information
                    </h2>

                    <div className={`mt-6 rounded-xl p-6 sm:p-7 ${cardBorder}`}>
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f3f1ff] text-[#4e44e1]">
                          <Building2 size={26} />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-xl font-bold text-[#17152b]">
                            {doctor.clinic.name}
                          </h3>

                          <p className="mt-3 text-base leading-7 text-[#5f6078]">
                            {doctor.clinic.address}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 space-y-5 border-t border-[#ebe8f4] pt-6">
                        <a
                          href={`tel:${doctor.clinic.phone}`}
                          className="flex items-center gap-4 text-base text-[#514e6b] transition hover:text-[#4e44e1]"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f3f1ff] text-[#4e44e1]">
                            <Phone size={19} />
                          </div>
                          {doctor.clinic.phone}
                        </a>

                        <a
                          href={`mailto:${doctor.clinic.email}`}
                          className="flex items-center gap-4 break-all text-base text-[#514e6b] transition hover:text-[#4e44e1]"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f3f1ff] text-[#4e44e1]">
                            <Mail size={19} />
                          </div>
                          {doctor.clinic.email}
                        </a>

                        <a
                          href={clinicMapUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-5 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-[#4e44e1]/15"
                        >
                          <MapPin size={18} />
                          View Clinic on Map
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT SIDEBAR */}

              <aside className="space-y-6">
                {/* CLINIC & HOSPITAL */}

                <div className={`rounded-xl bg-white p-5 sm:p-6 ${cardBorder}`}>
                  <h3 className="text-lg font-bold text-[#17152b]">
                    Clinic &amp; Hospital
                  </h3>

                  <div className="mt-5 flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f3f1ff] text-[#4e44e1]">
                      <Building2 size={23} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-base font-semibold leading-6 text-[#514e6b]">
                        {doctor.clinic.name}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-[#85829c]">
                        {doctor.clinic.address}
                      </p>

                      <a
                        href={clinicMapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#4e44e1] hover:text-[#9122b4] hover:underline"
                      >
                        View Location
                        <ExternalLink size={15} />
                      </a>
                    </div>
                  </div>

                  {/* MAP PREVIEW */}

                  <a
                    href={clinicMapUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open clinic location in Google Maps"
                    className="group relative mt-5 block h-[170px] overflow-hidden rounded-xl border border-[#e7e2f3] bg-[#f1effa]"
                  >
                    <div className="absolute inset-0">
                      <div className="absolute left-[-10%] top-[27%] h-[10px] w-[120%] rotate-[16deg] bg-white/90" />
                      <div className="absolute left-[-10%] top-[30%] h-px w-[120%] rotate-[16deg] bg-[#dcd6ef]" />

                      <div className="absolute left-[-10%] top-[62%] h-[8px] w-[120%] -rotate-[12deg] bg-white/90" />
                      <div className="absolute left-[-10%] top-[65%] h-px w-[120%] -rotate-[12deg] bg-[#dcd6ef]" />

                      <div className="absolute left-[22%] top-[-20%] h-[150%] w-[8px] rotate-[-22deg] bg-white/90" />
                      <div className="absolute left-[24%] top-[-20%] h-[150%] w-px rotate-[-22deg] bg-[#dcd6ef]" />

                      <div className="absolute right-[30%] top-[-20%] h-[150%] w-[7px] rotate-[13deg] bg-white/90" />
                      <div className="absolute right-[32%] top-[-20%] h-[150%] w-px rotate-[13deg] bg-[#dcd6ef]" />

                      <div className="absolute left-[12%] top-[10%] h-5 w-12 rounded bg-[#e1dcf4]" />
                      <div className="absolute right-[12%] top-[18%] h-8 w-10 rounded bg-[#e1dcf4]" />
                      <div className="absolute bottom-[12%] left-[45%] h-7 w-12 rounded bg-[#e1dcf4]" />
                    </div>

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#9122b4] drop-shadow-sm transition-transform group-hover:-translate-y-[60%]">
                      <MapPin size={42} fill="currentColor" stroke="white" />
                    </div>

                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2.5 text-xs font-semibold text-[#4e44e1] shadow-sm">
                      <MapPin size={15} />
                      Open Map
                      <ArrowUpRight size={15} />
                    </span>
                  </a>
                </div>

                {/* CONSULTATION HOURS */}

                <div className={`rounded-xl bg-white p-5 sm:p-6 ${cardBorder}`}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-[#17152b]">
                      Consultation Hours
                    </h3>

                    <Clock3 size={20} className="shrink-0 text-[#4e44e1]" />
                  </div>

                  <div className="mt-5 space-y-4">
                    {doctor.hours.map((item) => (
                      <div
                        key={item.day}
                        className="flex items-start justify-between gap-3"
                      >
                        <span className="text-sm text-[#85829c]">
                          {item.day}
                        </span>

                        <span
                          className={`text-right text-sm font-medium leading-5 ${
                            item.time === "Closed"
                              ? "text-red-500"
                              : "text-[#514e6b]"
                          }`}
                        >
                          {item.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-[#ebe8f4] pt-4">
                    <div className="flex items-center gap-2.5 text-sm font-medium text-[#047857]">
                      <CheckCircle2 size={18} className="shrink-0" />

                      {doctor.available
                        ? "Available for appointments"
                        : "Currently unavailable"}
                    </div>
                  </div>
                </div>

                {/* QUICK APPOINTMENT CTA */}

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4e44e1] via-[#6650dc] to-[#9122b4] p-6 text-white shadow-lg shadow-[#4e44e1]/15">
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/10 bg-white/10" />
                  <div className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/15">
                      <CalendarDays size={25} />
                    </div>

                    <h3 className="mt-4 text-xl font-bold">
                      Book an Appointment
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/85">
                      Schedule a consultation with {doctor.name}.
                    </p>

                    <Link
                      href={`/appointments/book?doctor=${doctor.slug}`}
                      className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-[#4e44e1] transition hover:bg-[#f5f2ff]"
                    >
                      Book Appointment
                      <ArrowUpRight size={17} />
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          MESSAGE MODAL
      ===================================== */}

      {showMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#17152b]/55 p-4 backdrop-blur-[4px]"
          onClick={() => setShowMessage(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="message-title"
            className={`my-auto w-full max-w-[540px] overflow-hidden rounded-2xl bg-white shadow-2xl ${cardBorder}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1.5 bg-gradient-to-r from-[#4e44e1] to-[#9122b4]" />

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3f1ff] text-[#4e44e1]">
                    <MessageCircle size={24} />
                  </div>

                  <h2
                    id="message-title"
                    className="mt-4 text-2xl font-bold text-[#17152b] sm:text-3xl"
                  >
                    Message Doctor
                  </h2>

                  <p className="mt-2 text-base text-[#85829c]">
                    Send an enquiry to {doctor.name}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowMessage(false)}
                  aria-label="Close message dialog"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5f3fb] text-[#77748f] transition hover:bg-[#ebe7f8] hover:text-[#4e44e1]"
                >
                  <X size={21} />
                </button>
              </div>

              <form
                className="mt-7"
                onSubmit={(e) => {
                  e.preventDefault();

                  const subject = encodeURIComponent(
                    `Appointment enquiry for ${doctor.name}`
                  );

                  const body = encodeURIComponent(message);

                  window.location.href =
                    `mailto:${doctor.clinic.email}?subject=${subject}&body=${body}`;

                  setShowMessage(false);
                }}
              >
                <label
                  htmlFor="doctor-message"
                  className="mb-3 block text-base font-semibold text-[#514e6b]"
                >
                  Your Message
                </label>

                <textarea
                  id="doctor-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  placeholder="Write your message here..."
                  className="w-full resize-y rounded-xl border border-[#ddd8ed] bg-white p-4 text-base leading-7 text-[#17152b] outline-none placeholder:text-[#a09cb5] focus:border-[#7165e8] focus:ring-4 focus:ring-[#4e44e1]/10"
                />

                <button
                  type="submit"
                  className="mt-5 flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-6 text-base font-semibold text-white shadow-md shadow-[#4e44e1]/15 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <Mail size={19} />
                  Send Message
                </button>

                <p className="mt-4 text-center text-sm leading-6 text-[#85829c]">
                  Your default email application will open to send this
                  message.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
