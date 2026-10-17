"use client";

import Image from "next/image";
import Link from "next/link";


import {
  Check,
  ChevronDown,
   Brain,
  Eye,
  Ear,
  MapPin,
  Search,
  ShieldCheck,
  Stethoscope,
  HousePlus,
  Hospital,
  FlaskConical,
  HeartPulse,
  UserRound,
  Bone,
  Venus,
  Baby,
  Smile,
  ArrowRight,
  BadgeCheck,
  BriefcaseMedical,
  Wallet,
  Star,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";


export default function Home() 
{const [activeCard, setActiveCard] = useState<number>(0);
  const [doctor, setDoctor] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (doctor) params.set("doctor", doctor);
    if (specialty) params.set("specialty", specialty);
    if (location) params.set("location", location);

    window.location.href = `/doctors?${params.toString()}`;
  };

  return (
    <>
    <main className="relative min-h-screen overflow-hidden bg-[#eef7ff] font-sans text-black">
      {/* BACKGROUND DECORATIONS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[310px] top-[610px] h-[540px] w-[540px] rounded-full bg-[#dceeff]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[15%] top-[184px] h-[420px] w-[420px] rounded-full bg-[#cce5ff]"
      />

      {/* HERO */}
  
<section className="relative overflow-hidden bg-white">
  {/* Background Gradient Glows */}
  <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#4e44e1]/15 blur-[120px]" />
  <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#9122b4]/15 blur-[140px]" />
  <div className="pointer-events-none absolute bottom-0 left-1/3 h-[300px] w-[500px] rounded-full bg-[#4e44e1]/5 blur-[120px]" />

  <section className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl flex-col px-5 pb-12 pt-20 sm:px-8 lg:min-h-[790px] lg:px-0 lg:pt-[115px]">

    <div className="grid flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-[65px]">

      {/* LEFT CONTENT */}
      <div className="relative z-10 max-w-[590px]">

        {/* TRUST BADGE */}
        <div className="inline-flex min-h-[46px] items-center gap-3 rounded-full border border-[#4e44e1]/20 bg-white/90 px-5 py-2 shadow-[0_8px_30px_rgba(78,68,225,0.08)] backdrop-blur-sm">
          <span className="h-3 w-3 rounded-full bg-gradient-to-r from-[#4e44e1] to-[#9122b4]" />
          <span className="text-sm font-semibold tracking-[-0.2px] text-black sm:text-base">
            Your Health, Our Priority
          </span>
        </div>

        {/* SEO H1 */}
        <h1 className="mt-7 text-[40px] font-extrabold leading-[1.12] tracking-[-1.5px] text-black sm:text-[52px] lg:text-[62px] lg:leading-[1.06] lg:tracking-[-2px]">
          Find the Right{" "}
          <span className="bg-gradient-to-r from-[#4e44e1] via-[#6f35d2] to-[#9122b4] bg-clip-text text-transparent">
            Doctor, Clinic or Hospital Near You
          </span>
        </h1>

        {/* SEO DESCRIPTION */}
        <p className="mt-6 max-w-[560px] text-base leading-7 text-[#536078] sm:text-lg sm:leading-8">
          Looking for doctors near you? DocLister helps you discover
          doctors, medical specialists, clinics, hospitals and diagnostic
          centres in your area. Explore healthcare providers by specialty
          and location, learn about available medical services, and find
          the right healthcare professional for your needs.
        </p>

        {/* TRUST POINTS */}
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">

          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4e44e1] to-[#9122b4] text-white shadow-md">
              <Check size={20} strokeWidth={3} />
            </span>
            <span className="text-sm font-semibold text-black sm:text-base">
              Explore Healthcare Providers
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4e44e1] to-[#9122b4] text-white shadow-md">
              <Check size={20} strokeWidth={3} />
            </span>
            <span className="text-sm font-semibold text-black sm:text-base">
              Search by Location
            </span>
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/doctors"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-6 py-3 text-base font-semibold text-white shadow-[0_10px_25px_rgba(78,68,225,0.20)] transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#4e44e1]/20"
          >
            Find a Doctor
            <ArrowUpRight size={19} />
          </Link>

          <Link
            href="/hospitals"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-[#4e44e1]/20 bg-white px-6 py-3 text-base font-semibold text-[#4e44e1] transition hover:border-[#9122b4] hover:bg-[#f8f6ff] focus:outline-none focus:ring-4 focus:ring-[#4e44e1]/10"
          >
            Explore Hospitals
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative mt-2 h-[320px] w-full sm:h-[410px] lg:mt-8 lg:h-[455px]">

        <div className="absolute -inset-[1px] overflow-hidden rounded-[24px] bg-gradient-to-br from-[#4e44e1] to-[#9122b4] p-[2px] shadow-[0_25px_70px_rgba(78,68,225,0.18)]">
          <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-[#f4f2ff]">

            <Image
              src="/home.webp"
              alt="Healthcare professional providing patient care at a medical clinic"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-center"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#4e44e1]/10 via-transparent to-[#9122b4]/20" />
          </div>
        </div>

        {/* TRUST CARD */}
        <div className="absolute bottom-5 left-3 z-10 flex items-center gap-3 rounded-2xl border border-[#e7e4f8] bg-white/95 px-4 py-3 shadow-[0_12px_35px_rgba(78,68,225,0.14)] backdrop-blur-md sm:bottom-7 sm:left-5 sm:gap-4 sm:px-5 sm:py-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4e44e1] to-[#9122b4] sm:h-12 sm:w-12">
            <ShieldCheck
              size={24}
              strokeWidth={2.5}
              className="text-white"
            />
          </div>

          <div>
            <h2 className="text-base font-semibold leading-6 text-black sm:text-lg">
              Your Healthcare Directory
            </h2>
            <p className="text-xs leading-5 text-[#536078] sm:text-sm">
              Doctors, Clinics & Hospitals
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* PROMINENT HEALTHCARE SEARCH BAR */}
    <div
      id="healthcare-search"
      className="relative z-20 mt-10 w-full lg:mt-8"
    >
      <form
        onSubmit={handleSearch}
        role="search"
        aria-label="Search healthcare providers"
        className="grid grid-cols-1 gap-2 rounded-2xl border border-[#e3def3] bg-white p-3 shadow-[0_18px_50px_rgba(78,68,225,0.12)] sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_175px] lg:items-center lg:gap-0 lg:p-2.5"
      >

        {/* DOCTOR OR SPECIALIST */}
        <div className="flex h-[62px] min-w-0 items-center gap-3 border-b border-[#ece8f5] px-3 sm:border-r sm:border-b-0 lg:px-4">
          <Search
            size={21}
            className="shrink-0 text-[#4e44e1]"
            aria-hidden="true"
          />

          <div className="min-w-0 flex-1">
            <label
              htmlFor="doctor-search"
              className="mb-0.5 block text-xs font-semibold text-[#536078]"
            >
              Doctor or Specialist
            </label>

            <input
              id="doctor-search"
              type="text"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              placeholder="e.g. Cardiologist"
              autoComplete="off"
              className="h-7 w-full min-w-0 bg-transparent text-sm text-black outline-none placeholder:text-[#9298a8] sm:text-base"
            />
          </div>
        </div>

        {/* SPECIALTY FILTER */}
        <div className="flex h-[62px] min-w-0 items-center gap-3 border-b border-[#ece8f5] px-3 sm:border-b-0 lg:border-r lg:px-4">
          <Stethoscope
            size={21}
            className="shrink-0 text-[#9122b4]"
            aria-hidden="true"
          />

          <div className="min-w-0 flex-1">
            <label
              htmlFor="specialty-search"
              className="mb-0.5 block text-xs font-semibold text-[#536078]"
            >
              Medical Specialty
            </label>

            <select
              id="specialty-search"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="h-7 w-full min-w-0 cursor-pointer bg-transparent text-sm text-black outline-none sm:text-base"
            >
              <option value="">All Specialties</option>
              <option value="cardiology">Cardiology</option>
              <option value="dermatology">Dermatology</option>
              <option value="dentistry">Dentistry</option>
              <option value="neurology">Neurology</option>
              <option value="orthopedics">Orthopedics</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="gynecology">Gynecology</option>
              <option value="general-physician">General Physician</option>
              <option value="ent">ENT Specialist</option>
            </select>
          </div>
        </div>

        {/* CITY OR LOCATION */}
        <div className="flex h-[62px] min-w-0 items-center gap-3 px-3 lg:px-4">
          <MapPin
            size={21}
            className="shrink-0 text-[#4e44e1]"
            aria-hidden="true"
          />

          <div className="min-w-0 flex-1">
            <label
              htmlFor="location-search"
              className="mb-0.5 block text-xs font-semibold text-[#536078]"
            >
              City or Location
            </label>

            <input
              id="location-search"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city or area"
              autoComplete="address-level2"
              className="h-7 w-full min-w-0 bg-transparent text-sm text-black outline-none placeholder:text-[#9298a8] sm:text-base"
            />
          </div>
        </div>

        {/* SEARCH BUTTON */}
        <button
          type="submit"
          className="flex h-[58px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-5 text-base font-semibold text-white shadow-[0_10px_25px_rgba(78,68,225,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(145,34,180,0.28)] focus:outline-none focus:ring-4 focus:ring-[#4e44e1]/20 lg:h-[62px]"
        >
          <Search size={20} strokeWidth={2.5} />
          Search Providers
        </button>
      </form>

      <p className="mt-3 text-center text-xs leading-5 text-[#6b7280] sm:text-sm">
        Find doctors, specialists, clinics and hospitals by name, specialty or location.
      </p>
    </div>
  </section>
</section>

  {/* HEALTHCARE CATEGORIES */}
  <section className="relative z-20 w-full bg-white px-5 py-8 sm:px-6 lg:px-[18px]">

    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

      {[
        {
          title: "Doctors",
          description: "Find the best doctors",
          icon: Stethoscope,
          iconColor: "text-[#4e44e1]",
          iconBg: "bg-[#f0efff]",
          href: "/doctors",
        },
        {
          title: "Clinics",
          description: "Top rated clinics",
          icon: HousePlus,
          iconColor: "text-[#9122b4]",
          iconBg: "bg-[#f9edff]",
          href: "/clinics",
        },
        {
          title: "Hospitals",
          description: "Trusted hospitals",
          icon: Hospital,
          iconColor: "text-[#6f35d2]",
          iconBg: "bg-[#f2efff]",
          href: "/hospitals",
        },
        {
          title: "Lab Tests",
          description: "Book diagnostic tests",
          icon: FlaskConical,
          iconColor: "text-[#4e44e1]",
          iconBg: "bg-[#efefff]",
          href: "/lab-tests",
        },
      ].map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.title}
            href={item.href}
            className="group relative flex min-h-[146px] items-start gap-4 overflow-hidden rounded-[15px] border border-[#e9e5f3] bg-white px-5 py-6 transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-[#c7c0ee] hover:shadow-[0_12px_32px_rgba(78,68,225,0.11)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4e44e1] focus-visible:ring-offset-2 sm:gap-[18px] sm:px-[23px]"
          >

            {/* GRADIENT HOVER ACCENT */}
            <span className="absolute left-0 top-0 h-full w-[3px] origin-center scale-y-0 rounded-full bg-gradient-to-b from-[#4e44e1] to-[#9122b4] transition-transform duration-300 group-hover:scale-y-100 group-focus-visible:scale-y-100" />

            {/* ICON BOX */}
            <div
              className={`relative flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[11px] ${item.iconBg} transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm`}
            >
              <Icon
                size={25}
                strokeWidth={2.1}
                className={`${item.iconColor} transition-transform duration-300 group-hover:scale-110`}
              />
            </div>

            {/* CONTENT */}
            <div className="min-w-0 pt-[4px]">
              <h3 className="text-[18px] font-semibold leading-6 tracking-[-0.35px] text-black transition-colors duration-200 group-hover:bg-gradient-to-r group-hover:from-[#4e44e1] group-hover:to-[#9122b4] group-hover:bg-clip-text group-hover:text-transparent">
                {item.title}
              </h3>

              <p className="mt-[7px] text-[15px] leading-[22px] text-[#71809a] sm:text-[16px]">
                {item.description}
              </p>
            </div>

            {/* HOVER ARROW */}
            <span className="absolute bottom-[17px] right-[19px] translate-x-1 bg-gradient-to-r from-[#4e44e1] to-[#9122b4] bg-clip-text text-transparent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </span>
          </Link>
        );
      })}
    </div>
  </section>



{/* SECTION 3: MEDICAL SPECIALTIES */}
<section
  id="medical-specialties"
  className="relative w-full overflow-hidden bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-[31px] lg:py-20"
>
  {/* BACKGROUND ACCENTS */}
  <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#4e44e1]/5 blur-[100px]" />
  <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#9122b4]/5 blur-[110px]" />

  <div className="relative z-10 mx-auto max-w-7xl">

    {/* SECTION HEADER */}
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

      <div className="max-w-3xl">
        {/* EYEBROW */}
        <div className="mb-4 flex items-center gap-3">
          <span className="h-1 w-9 rounded-full bg-gradient-to-r from-[#4e44e1] to-[#9122b4]" />

          <span className="bg-gradient-to-r from-[#4e44e1] to-[#9122b4] bg-clip-text text-xs font-bold uppercase tracking-[2.5px] text-transparent sm:text-sm">
            Find Your Specialist
          </span>
        </div>

        {/* SEO H2 */}
        <h2 className="text-3xl font-extrabold leading-tight tracking-[-1px] text-black sm:text-4xl lg:text-[46px] lg:tracking-[-1.5px]">
          Find Doctors by{" "}
          <span className="bg-gradient-to-r from-[#4e44e1] via-[#6d35d2] to-[#9122b4] bg-clip-text text-transparent">
            Medical Specialty
          </span>
        </h2>

        {/* SEO DESCRIPTION */}
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#536078] sm:text-lg sm:leading-8">
          Looking for specialist doctors near you? Explore the DocLister
          medical directory to discover healthcare providers by specialty
          and department. Find cardiologists, dermatologists, orthopedic
          doctors, pediatricians, dentists and other medical specialists
          to help you identify relevant healthcare services in your area.
        </p>
      </div>

      {/* VIEW ALL BUTTON */}
      <Link
        href="/specialties"
        className="group inline-flex min-h-[52px] w-fit shrink-0 items-center justify-center gap-3 rounded-xl border border-[#d8d3f4] bg-[#f7f5ff] px-5 py-3 text-sm font-semibold text-[#4e44e1] transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-[#4e44e1] hover:to-[#9122b4] hover:text-white hover:shadow-[0_10px_25px_rgba(78,68,225,0.20)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4e44e1] focus-visible:ring-offset-2 sm:text-base"
      >
        View All Medical Specialties
        <ArrowRight
          size={19}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>

    {/* SPECIALTY CARDS */}
    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

      {[
        {
          title: "Cardiologists",
          subtitle: "Heart Specialists",
          description:
            "Explore doctors specializing in heart health and cardiovascular care.",
          icon: HeartPulse,
          iconColor: "text-[#9122b4]",
          iconBg: "bg-[#f9efff]",
          slug: "cardiology",
          keyword: "Heart Care",
        },
        {
          title: "Dermatologists",
          subtitle: "Skin & Hair Specialists",
          description:
            "Discover specialists providing care for skin, hair and nail conditions.",
          icon: UserRound,
          iconColor: "text-[#4e44e1]",
          iconBg: "bg-[#f0efff]",
          slug: "dermatology",
          keyword: "Skin & Hair",
        },
        {
          title: "Orthopedic Doctors",
          subtitle: "Bone & Joint Specialists",
          description:
            "Find doctors specializing in bones, joints, muscles and mobility.",
          icon: Bone,
          iconColor: "text-[#6d35d2]",
          iconBg: "bg-[#f4f0ff]",
          slug: "orthopedics",
          keyword: "Bone & Joint",
        },
        {
          title: "Gynecologists",
          subtitle: "Women's Healthcare",
          description:
            "Explore specialists in women's reproductive and gynecological health.",
          icon: Venus,
          iconColor: "text-[#9122b4]",
          iconBg: "bg-[#faeffb]",
          slug: "gynecology",
          keyword: "Women's Health",
        },
        {
          title: "Pediatricians",
          subtitle: "Child Healthcare",
          description:
            "Discover doctors focused on children's health, growth and development.",
          icon: Baby,
          iconColor: "text-[#4e44e1]",
          iconBg: "bg-[#f0f1ff]",
          slug: "pediatrics",
          keyword: "Child Care",
        },
        {
          title: "Dentists",
          subtitle: "Dental Care Specialists",
          description:
            "Find dental professionals offering preventive and general oral care.",
          icon: Smile,
          iconColor: "text-[#6d35d2]",
          iconBg: "bg-[#f3f0ff]",
          slug: "dentistry",
          keyword: "Oral Health",
        },
        {
          title: "Neurologists",
          subtitle: "Brain & Nerve Specialists",
          description:
            "Explore doctors specializing in conditions affecting the brain and nervous system.",
          icon: Brain,
          iconColor: "text-[#4e44e1]",
          iconBg: "bg-[#f0efff]",
          slug: "neurology",
          keyword: "Brain & Nerves",
        },
        {
          title: "Ophthalmologists",
          subtitle: "Eye Care Specialists",
          description:
            "Discover medical professionals specializing in eye health and vision care.",
          icon: Eye,
          iconColor: "text-[#9122b4]",
          iconBg: "bg-[#f9efff]",
          slug: "ophthalmology",
          keyword: "Eye Care",
        },
        {
          title: "ENT Specialists",
          subtitle: "Ear, Nose & Throat",
          description:
            "Find specialists for medical concerns involving the ears, nose and throat.",
          icon: Ear,
          iconColor: "text-[#6d35d2]",
          iconBg: "bg-[#f4f0ff]",
          slug: "ent",
          keyword: "ENT Care",
        },
        {
          title: "General Physicians",
          subtitle: "Primary Healthcare",
          description:
            "Explore general physicians for routine consultations and common health concerns.",
          icon: Stethoscope,
          iconColor: "text-[#4e44e1]",
          iconBg: "bg-[#f0efff]",
          slug: "general-physician",
          keyword: "General Care",
        },
      ].map((specialty) => {
        const Icon = specialty.icon;

        return (
          <Link
            key={specialty.slug}
            href={`/specialties/${specialty.slug}`}
            aria-label={`Explore ${specialty.title} and ${specialty.subtitle}`}
            className="group relative flex min-h-[245px] flex-col items-start overflow-hidden rounded-2xl border border-[#e4e0f2] bg-[#faf9fd] p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#c9c3eb] hover:bg-white hover:shadow-[0_12px_30px_rgba(78,68,225,0.11)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4e44e1] focus-visible:ring-offset-2 sm:p-6"
          >
            {/* TOP GRADIENT ACCENT */}
            <span className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#4e44e1] to-[#9122b4] transition-transform duration-300 group-hover:scale-x-100" />

            {/* SIDE ACCENT */}
            <span className="absolute bottom-0 left-0 h-full w-[3px] origin-bottom scale-y-0 rounded-full bg-gradient-to-t from-[#4e44e1] to-[#9122b4] transition-transform duration-300 group-hover:scale-y-100" />

            {/* ICON */}
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${specialty.iconBg} transition-all duration-300 group-hover:scale-105`}
            >
              <Icon
                size={26}
                strokeWidth={2}
                className={specialty.iconColor}
                aria-hidden="true"
              />
            </div>

            {/* SPECIALTY CONTENT */}
            <h3 className="mt-5 text-lg font-bold leading-6 tracking-[-0.3px] text-black transition-colors duration-200 group-hover:text-[#6d35d2]">
              {specialty.title}
            </h3>

            <p className="mt-1.5 text-sm font-semibold text-[#6d35d2]">
              {specialty.subtitle}
            </p>

            <p className="mt-3 flex-1 text-sm leading-6 text-[#68748b]">
              {specialty.description}
            </p>

            {/* CARD FOOTER */}
            <div className="mt-4 flex w-full items-center justify-between border-t border-[#ece8f5] pt-3">
              <span className="text-xs font-semibold text-[#7b7893]">
                {specialty.keyword}
              </span>

              <ArrowRight
                size={17}
                className="text-[#4e44e1] transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </div>
          </Link>
        );
      })}
    </div>

    {/* BOTTOM CTA */}
    <div className="mt-10 rounded-2xl border border-[#e9e5f3] bg-gradient-to-r from-[#f7f5ff] via-white to-[#fcf5ff] px-5 py-7 text-center sm:mt-12 sm:px-8 sm:py-9">
      <h3 className="text-xl font-bold tracking-[-0.5px] text-black sm:text-2xl">
        Find the Right Medical Specialist for Your Needs
      </h3>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#647087] sm:text-base">
        Browse medical specialties, explore doctor listings and discover
        healthcare providers by specialty and location with DocLister.
      </p>

      <Link
        href="/specialties"
        className="mt-6 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(78,68,225,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#4e44e1]/20 sm:text-base"
      >
        Browse All Medical Specialties
        <ArrowRight size={19} />
      </Link>
    </div>

  </div>
</section>



{/* FEATURED DOCTORS SECTION */}

<section
  aria-labelledby="featured-doctors-heading"
  className="relative w-full overflow-hidden border-b border-[#e5e1f2] bg-[#faf9fd] px-5 py-12 sm:px-8 lg:px-[45px] lg:py-[64px]"
>
  {/* BACKGROUND GLOWS */}
  <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-[#4e44e1]/5 blur-[110px]" />
  <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#9122b4]/5 blur-[120px]" />

  <div className="relative z-10 mx-auto max-w-7xl">

    {/* SECTION HEADER */}
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {/* EYEBROW */}
        <div className="mb-[13px] flex items-center gap-[11px]">
          <span className="h-[4px] w-[30px] rounded-full bg-gradient-to-r from-[#4e44e1] to-[#9122b4]" />

          <span className="bg-gradient-to-r from-[#4e44e1] to-[#9122b4] bg-clip-text text-[13px] font-semibold uppercase tracking-[2.5px] text-transparent">
            Meet Our Specialists
          </span>
        </div>

        {/* SEO-FRIENDLY HEADING */}
        <h2
          id="featured-doctors-heading"
          className="text-[32px] font-extrabold leading-[1.2] tracking-[-1.1px] text-black sm:text-[42px]"
        >
          Explore{" "}
          <span className="bg-gradient-to-r from-[#4e44e1] via-[#6d35d2] to-[#9122b4] bg-clip-text text-transparent">
            Experienced Doctors
          </span>
          {" "}and Healthcare Specialists
        </h2>

        {/* SEO-FRIENDLY DESCRIPTION */}
        <p className="mt-[12px] max-w-3xl text-[15px] leading-7 text-[#536078] sm:text-[17px]">
          Find experienced doctors across different medical specialties
          and location with DocLister. Explore doctor profiles to learn
          about their qualifications, clinical experience, areas of
          expertise, consultation fees, clinic or hospital affiliations,
          patient reviews, and appointment options.
        </p>
      </div>

      {/* VIEW ALL DOCTORS */}
      <Link
        href="/doctors"
        aria-label="Explore all doctors and medical specialists"
        className="group inline-flex w-fit shrink-0 items-center gap-[10px] pb-[5px] text-[16px] font-semibold text-[#4e44e1] transition-all duration-200 hover:bg-gradient-to-r hover:from-[#4e44e1] hover:to-[#9122b4] hover:bg-clip-text hover:text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4e44e1] focus-visible:ring-offset-4"
      >
        View All Doctors

        <ArrowRight
          size={19}
          strokeWidth={2}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>

    {/* FEATURED DOCTOR PROFILES */}
    <div className="mt-[34px] grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-[22px]">
      {[
        {
          name: "Dr. Priya Sharma",
          specialty: "Cardiologist",
          experience: "10+ years experience",
          fee: "₹800 consultation fee",
          rating: "4.9",
          reviews: "120 reviews",
          image: "/dr/priya-sharma.webp",
          href: "/doctors/dr-priya-sharma",
          description:
            "Explore cardiology services and information about heart health consultations.",
        },
        {
          name: "Dr. Rahul Mehta",
          specialty: "Dermatologist",
          experience: "8+ years experience",
          fee: "₹700 consultation fee",
          rating: "4.8",
          reviews: "95 reviews",
          image: "/dr/rahul.webp",
          href: "/doctors/dr-rahul-mehta",
          description:
            "Learn about dermatology consultations and skin health services.",
        },
        {
          name: "Dr. Neha Gupta",
          specialty: "Gynecologist",
          experience: "12+ years experience",
          fee: "₹900 consultation fee",
          rating: "4.9",
          reviews: "150 reviews",
          image: "/dr/neha-gupta.webp",
          href: "/doctors/dr-neha-gupta",
          description:
            "Explore women's health consultations and gynecology services.",
        },
      ].map((doctor) => (
        <Link
          key={doctor.name}
          href={doctor.href}
          aria-label={`View ${doctor.name}, ${doctor.specialty} profile`}
          className="group relative flex min-h-[222px] items-center gap-[14px] overflow-hidden rounded-[18px] border border-[#e3def0] bg-white p-[14px] shadow-[0_4px_18px_rgba(78,68,225,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9c2eb] hover:shadow-[0_14px_35px_rgba(78,68,225,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4e44e1] focus-visible:ring-offset-2 sm:gap-[19px] sm:p-[22px]"
        >
          {/* TOP GRADIENT ACCENT */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#4e44e1] to-[#9122b4] transition-transform duration-300 group-hover:scale-x-100"
          />

          {/* DOCTOR IMAGE */}
          <div className="relative h-[174px] w-[100px] shrink-0 overflow-hidden rounded-[13px] bg-[#f0eef9] sm:w-[129px]">
            <Image
              src={doctor.image}
              alt={`${doctor.name} - ${doctor.specialty}`}
              fill
              sizes="(max-width: 640px) 100px, 129px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            />

            {/* IMAGE OVERLAY */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#4e44e1]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />

            {/* VERIFIED BADGE */}
            <div
              className="absolute bottom-[8px] left-[8px] flex h-[27px] w-[27px] items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#4e44e1] to-[#9122b4] text-white shadow-[0_4px_12px_rgba(78,68,225,0.28)]"
              title="Verified profile"
            >
              <BadgeCheck size={17} strokeWidth={2.5} />
            </div>
          </div>

          {/* DOCTOR DETAILS */}
          <div className="min-w-0 flex-1">
            {/* NAME */}
            <h3 className="text-[17px] font-semibold leading-[25px] tracking-[-0.3px] text-black transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-[#4e44e1] group-hover:to-[#9122b4] group-hover:bg-clip-text group-hover:text-transparent sm:text-[19px]">
              {doctor.name}
            </h3>

            {/* SPECIALTY */}
            <p className="mt-[3px] bg-gradient-to-r from-[#4e44e1] to-[#9122b4] bg-clip-text text-[14px] font-semibold text-transparent sm:text-[16px]">
              {doctor.specialty}
            </p>

            {/* EXPERIENCE */}
            <div className="mt-[13px] flex items-center gap-[9px]">
              <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#f1efff]">
                <BriefcaseMedical
                  size={16}
                  className="text-[#4e44e1]"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </span>

              <span className="text-[12px] leading-5 text-[#536078] sm:text-[14px]">
                {doctor.experience}
              </span>
            </div>

            {/* CONSULTATION FEE */}
            <div className="mt-[8px] flex items-center gap-[9px]">
              <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#f9efff]">
                <Wallet
                  size={16}
                  className="text-[#9122b4]"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </span>

              <span className="text-[12px] leading-5 text-[#536078] sm:text-[14px]">
                {doctor.fee}
              </span>
            </div>

            {/* RATING */}
            <div className="mt-[14px] flex flex-wrap items-center gap-x-[7px] gap-y-1">
              <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#fff7df]">
                <Star
                  size={16}
                  fill="#fbbf24"
                  stroke="#fbbf24"
                  aria-hidden="true"
                />
              </span>

              <span className="text-[15px] font-bold text-black sm:text-[16px]">
                {doctor.rating}
              </span>

              <span className="text-[12px] text-[#71809a] sm:text-[13px]">
                ({doctor.reviews})
              </span>
            </div>
          </div>

          {/* HOVER ARROW */}
          <div
            aria-hidden="true"
            className="absolute bottom-[12px] right-[12px] flex h-[28px] w-[28px] translate-x-2 items-center justify-center rounded-full bg-[#f1efff] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:bottom-[18px] sm:right-[18px]"
          >
            <ArrowRight
              size={16}
              strokeWidth={2.2}
              className="text-[#4e44e1]"
            />
          </div>
        </Link>
      ))}
    </div>

    {/* SUPPORTING SEO CONTENT */}
    <div className="mt-8 rounded-2xl border border-[#e8e3f4] bg-white/80 p-5 sm:p-6">
      <h3 className="text-[18px] font-bold text-[#171525] sm:text-[20px]">
        Find the Right Doctor for Your Healthcare Needs
      </h3>

      <p className="mt-2 text-[14px] leading-7 text-[#536078] sm:text-[15px]">
        Whether you are looking for a cardiologist, dermatologist,
        gynecologist, or another medical specialist, DocLister helps you
        explore doctor profiles and compare available healthcare
        information. Review professional qualifications, experience,
        consultation details, and clinic or hospital locations to make
        an informed decision about your healthcare options.
      </p>
    </div>
  </div>
</section>
    </main>
    </>
  );
}