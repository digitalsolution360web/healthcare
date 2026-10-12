"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronDown,
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
  {/* BACKGROUND GRADIENT GLOWS */}
  <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#4e44e1]/15 blur-[120px]" />
  <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#9122b4]/15 blur-[140px]" />
  <div className="pointer-events-none absolute bottom-0 left-1/3 h-[300px] w-[500px] rounded-full bg-[#4e44e1]/5 blur-[120px]" />

  <section className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl flex-col px-5 pb-10 pt-16 sm:px-8 lg:min-h-[768px] lg:px-0 lg:pt-[127px]">

    <div className="grid flex-1 grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-[65px]">

      {/* LEFT CONTENT */}
      <div className="relative z-10 max-w-[570px]">

        {/* TRUST BADGE */}
        <div className="inline-flex h-[51px] items-center gap-[13px] rounded-full border border-[#4e44e1]/20 bg-white/90 px-[21px] shadow-[0_8px_30px_rgba(78,68,225,0.08)] backdrop-blur-sm">
          <span className="h-[13px] w-[13px] rounded-full bg-gradient-to-r from-[#4e44e1] to-[#9122b4] shadow-[0_0_12px_rgba(78,68,225,0.45)]" />

          <span className="text-[16px] font-medium tracking-[-0.2px] text-black sm:text-[17px]">
            Your Health, Our Priority
          </span>
        </div>

        {/* HEADING */}
        <h1 className="mt-[27px] text-[43px] font-extrabold leading-[1.08] tracking-[-1.8px] text-black sm:text-[54px] lg:text-[68px] lg:leading-[1.03] lg:tracking-[-2.2px]">
          Find the Right
          <br />

          <span className="bg-gradient-to-r from-[#4e44e1] via-[#6f35d2] to-[#9122b4] bg-clip-text text-transparent">
            Doctor, Clinic
          </span>{" "}
          or

          <br />

          <span className="bg-gradient-to-r from-[#4e44e1] to-[#9122b4] bg-clip-text text-transparent">
            Hospital Near You
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-[29px] max-w-[550px] text-[17px] leading-[1.55] text-[#536078] sm:text-[19px] lg:text-[21px] lg:leading-[1.5]">
          Book appointments, read reviews and get the best healthcare
          services — all in one place.
        </p>

        {/* TRUST POINTS */}
        <div className="mt-[34px] flex flex-wrap items-center gap-x-7 gap-y-4">

          {/* VERIFIED DOCTOR */}
          <div className="flex items-center gap-[13px]">
            <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4e44e1] to-[#9122b4] text-white shadow-[0_8px_20px_rgba(78,68,225,0.22)]">
              <Check size={21} strokeWidth={3} />
            </span>

            <span className="whitespace-nowrap text-[15px] font-medium text-black sm:text-[17px]">
              Verified Doctor
            </span>
          </div>

          <span className="hidden h-[35px] w-px bg-gradient-to-b from-[#4e44e1] to-[#9122b4] sm:block" />

          {/* EASY APPOINTMENTS */}
          <div className="flex items-center gap-[13px]">
            <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4e44e1] to-[#9122b4] text-white shadow-[0_8px_20px_rgba(145,34,180,0.18)]">
              <Check size={21} strokeWidth={3} />
            </span>

            <span className="whitespace-nowrap text-[15px] font-medium text-black sm:text-[17px]">
              Easy Appointments
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative mt-0 h-[380px] w-full lg:mt-[157px] lg:h-[430px]">

        {/* IMAGE BACKGROUND */}
        <div className="absolute -inset-[1px] overflow-hidden rounded-[24px] bg-gradient-to-br from-[#4e44e1] to-[#9122b4] p-[2px] shadow-[0_25px_70px_rgba(78,68,225,0.18)]">
          <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-[#f4f2ff]">
            <Image
              src="/images/doctor-hero.jpg"
              alt="Doctor providing trusted healthcare"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />

            {/* IMAGE OVERLAY */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#4e44e1]/10 via-transparent to-[#9122b4]/20" />
          </div>
        </div>

        {/* TRUSTED CARE CARD */}
        <div className="absolute bottom-[30px] left-[10px] z-10 flex min-h-[89px] items-center gap-[14px] rounded-[17px] border border-[#e7e4f8] bg-white/95 px-[21px] py-4 shadow-[0_12px_35px_rgba(78,68,225,0.14)] backdrop-blur-md sm:bottom-[30px] sm:left-[10px]">

          <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4e44e1] to-[#9122b4]">
            <ShieldCheck
              size={24}
              strokeWidth={2.5}
              className="text-white"
            />
          </div>

          <div>
            <h2 className="whitespace-nowrap text-[16px] font-semibold leading-6 text-black sm:text-[18px]">
              Trusted Care
            </h2>

            <p className="whitespace-nowrap text-[14px] leading-6 text-[#536078] sm:text-[16px]">
              Healthcare Professionals
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* SEARCH BAR */}
    <div className="relative z-20 mt-8 w-full lg:absolute lg:bottom-[9px] lg:left-0 lg:mt-0">

      <form
        onSubmit={handleSearch}
        className="grid min-h-[94px] grid-cols-1 gap-3 rounded-[17px] border border-[#e3def3] bg-white p-3 shadow-[0_18px_50px_rgba(78,68,225,0.10)] sm:grid-cols-2 lg:grid-cols-[1.05fr_1.05fr_1.05fr_160px] lg:items-center lg:gap-0 lg:p-[10px]"
      >

        {/* DOCTOR FIELD */}
        <div className="relative flex h-[68px] items-center border-b border-[#ece8f5] px-3 sm:border-r sm:border-b-0 lg:px-[25px]">
          <Search
            size={21}
            className="shrink-0 text-[#4e44e1]"
            strokeWidth={2}
          />

          <input
            type="text"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            placeholder="Doctor"
            aria-label="Doctor name"
            className="ml-[18px] h-full min-w-0 flex-1 bg-transparent text-[17px] text-black outline-none placeholder:text-[#7c8497]"
          />

          <ChevronDown
            size={18}
            className="ml-2 shrink-0 text-[#9b9bad]"
          />
        </div>

        {/* SPECIALTY FIELD */}
        <div className="relative flex h-[68px] items-center border-b border-[#ece8f5] px-3 sm:border-b-0 sm:border-r lg:px-[25px]">
          <Stethoscope
            size={21}
            className="shrink-0 text-[#9122b4]"
            strokeWidth={2}
          />

          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            aria-label="Select specialty"
            className="ml-[18px] h-full min-w-0 flex-1 cursor-pointer appearance-none bg-transparent text-[17px] text-black outline-none"
          >
            <option value="">Specialty</option>
            <option value="cardiology">Cardiology</option>
            <option value="dermatology">Dermatology</option>
            <option value="dentistry">Dentistry</option>
            <option value="neurology">Neurology</option>
            <option value="orthopedics">Orthopedics</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="gynecology">Gynecology</option>
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none ml-2 shrink-0 text-[#9b9bad]"
          />
        </div>

        {/* LOCATION FIELD */}
        <div className="relative flex h-[68px] items-center px-3 lg:px-[25px]">
          <MapPin
            size={21}
            className="shrink-0 text-[#4e44e1]"
            strokeWidth={1.8}
          />

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            aria-label="City or location"
            className="ml-[18px] h-full min-w-0 flex-1 bg-transparent text-[17px] text-black outline-none placeholder:text-[#7c8497]"
          />

          <ChevronDown
            size={18}
            className="ml-2 shrink-0 text-[#9b9bad]"
          />
        </div>

        {/* SEARCH BUTTON */}
        <button
          type="submit"
          className="flex h-[70px] w-full items-center justify-center gap-[13px] rounded-[13px] bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-5 text-[17px] font-semibold text-white shadow-[0_10px_25px_rgba(78,68,225,0.22)] transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_14px_30px_rgba(145,34,180,0.28)] focus:outline-none focus:ring-4 focus:ring-[#4e44e1]/20"
        >
          <Search size={21} strokeWidth={2.5} />
          Search
        </button>
      </form>
    </div>
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
</section>

{/* TOP SPECIALTIES SECTION */}

<section className="relative w-full overflow-hidden bg-white px-5 py-12 sm:px-8 lg:px-[31px] lg:py-[42px]">

  {/* BACKGROUND ACCENTS */}
  <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#4e44e1]/5 blur-[100px]" />
  <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#9122b4]/5 blur-[110px]" />

  <div className="relative z-10 mx-auto max-w-7xl">

    {/* SECTION HEADER */}
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

      {/* HEADING CONTENT */}
      <div>

        {/* EYEBROW */}
        <div className="mb-[14px] flex items-center gap-[11px]">
          <span className="h-[4px] w-[36px] rounded-full bg-gradient-to-r from-[#4e44e1] to-[#9122b4]" />

          <span className="bg-gradient-to-r from-[#4e44e1] to-[#9122b4] bg-clip-text text-[14px] font-semibold uppercase tracking-[3px] text-transparent">
            Find Your Specialist
          </span>
        </div>

        {/* TITLE */}
        <h2 className="text-[38px] font-extrabold leading-[1.15] tracking-[-1.5px] text-black sm:text-[46px]">
          Top{" "}
          <span className="bg-gradient-to-r from-[#4e44e1] via-[#6d35d2] to-[#9122b4] bg-clip-text text-transparent">
            Specialties
          </span>
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-[10px] max-w-[650px] text-[17px] leading-[1.65] text-[#536078] sm:text-[20px]">
          Explore our medical specialties and find the right expert for your
          <br className="hidden lg:block" /> healthcare needs.
        </p>
      </div>

      {/* VIEW ALL BUTTON */}
      <Link
        href="/specialties"
        className="group inline-flex h-[56px] w-fit shrink-0 items-center justify-center gap-[13px] rounded-[9px] border border-[#d8d3f4] bg-[#f7f5ff] px-[23px] text-[16px] font-semibold text-[#4e44e1] transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-[#4e44e1] hover:to-[#9122b4] hover:text-white hover:shadow-[0_10px_25px_rgba(78,68,225,0.20)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4e44e1] focus-visible:ring-offset-2 sm:text-[17px]"
      >
        View All Specialties

        <ArrowRight
          size={20}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>

    </div>

    {/* SPECIALTY CARDS */}
    <div className="mt-[42px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

      {[
        {
          title: "Cardiology",
          subtitle: "Heart Care",
          icon: HeartPulse,
          iconColor: "text-[#9122b4]",
          iconBg: "bg-[#f9efff]",
        },
        {
          title: "Dermatology",
          subtitle: "Skin & Hair",
          icon: UserRound,
          iconColor: "text-[#4e44e1]",
          iconBg: "bg-[#f0efff]",
        },
        {
          title: "Orthopedics",
          subtitle: "Bone & Joint",
          icon: Bone,
          iconColor: "text-[#6d35d2]",
          iconBg: "bg-[#f4f0ff]",
        },
        {
          title: "Gynecology",
          subtitle: "Women's Health",
          icon: Venus,
          iconColor: "text-[#9122b4]",
          iconBg: "bg-[#faeffb]",
        },
        {
          title: "Pediatrics",
          subtitle: "Child Care",
          icon: Baby,
          iconColor: "text-[#4e44e1]",
          iconBg: "bg-[#f0f1ff]",
        },
        {
          title: "Dentistry",
          subtitle: "Oral Health",
          icon: Smile,
          iconColor: "text-[#6d35d2]",
          iconBg: "bg-[#f3f0ff]",
        },
      ].map((specialty) => {
        const Icon = specialty.icon;

        return (
          <Link
            key={specialty.title}
            href={`/specialties/${specialty.title.toLowerCase()}`}
            className="group relative flex min-h-[192px] flex-col items-start overflow-hidden rounded-[14px] border border-[#e4e0f2] bg-[#faf9fd] px-[22px] py-[23px] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#c9c3eb] hover:bg-white hover:shadow-[0_12px_30px_rgba(78,68,225,0.11)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4e44e1] focus-visible:ring-offset-2"
          >

            {/* TOP GRADIENT ACCENT */}
            <span className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#4e44e1] to-[#9122b4] transition-transform duration-300 group-hover:scale-x-100" />

            {/* SIDE GRADIENT ACCENT */}
            <span className="absolute bottom-0 left-0 h-full w-[3px] origin-bottom scale-y-0 rounded-full bg-gradient-to-t from-[#4e44e1] to-[#9122b4] transition-transform duration-300 group-hover:scale-y-100" />

            {/* ICON */}
            <div
              className={`relative flex h-[63px] w-[63px] items-center justify-center rounded-[13px] ${specialty.iconBg} transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(78,68,225,0.10)]`}
            >
              <Icon
                size={27}
                strokeWidth={2.2}
                className={`${specialty.iconColor} transition-transform duration-300 group-hover:scale-110`}
              />
            </div>

            {/* TITLE */}
            <h3 className="mt-[24px] text-[17px] font-semibold leading-[24px] tracking-[-0.25px] text-black transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-[#4e44e1] group-hover:to-[#9122b4] group-hover:bg-clip-text group-hover:text-transparent sm:text-[18px]">
              {specialty.title}
            </h3>

            {/* SUBTITLE */}
            <p className="mt-[7px] text-[15px] leading-[22px] text-[#68748b] sm:text-[16px]">
              {specialty.subtitle}
            </p>

            {/* HOVER ARROW */}
            <span className="absolute bottom-[18px] right-[18px] translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <ArrowRight
                size={17}
                strokeWidth={2.2}
                className="text-[#4e44e1]"
              />
            </span>

          </Link>
        );
      })}

    </div>

  </div>
</section>


{/* FEATURED DOCTORS SECTION */}

<section className="relative w-full overflow-hidden border-b border-[#e5e1f2] bg-[#faf9fd] px-5 py-12 sm:px-8 lg:px-[45px] lg:py-[64px]">

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

        {/* HEADING */}
        <h2 className="text-[36px] font-extrabold leading-[1.15] tracking-[-1.3px] text-black sm:text-[42px]">
          Featured{" "}
          <span className="bg-gradient-to-r from-[#4e44e1] via-[#6d35d2] to-[#9122b4] bg-clip-text text-transparent">
            Doctors
          </span>
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-[10px] text-[16px] leading-7 text-[#536078] sm:text-[18px]">
          Connect with experienced and trusted healthcare professionals.
        </p>
      </div>

      {/* VIEW ALL DOCTORS */}
      <Link
        href="/doctors"
        className="group inline-flex w-fit shrink-0 items-center gap-[10px] pb-[5px] text-[16px] font-semibold text-[#4e44e1] transition-all duration-200 hover:bg-gradient-to-r hover:from-[#4e44e1] hover:to-[#9122b4] hover:bg-clip-text hover:text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4e44e1] focus-visible:ring-offset-4"
      >
        View All

        <ArrowRight
          size={19}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>

    </div>

    {/* DOCTOR CARDS */}
    <div className="mt-[38px] grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-[22px]">

      {[
        {
          name: "Dr. Priya Sharma",
          specialty: "Cardiologist",
          experience: "10+ years experience",
          fee: "₹800 consultation fee",
          rating: "4.9",
          reviews: "120 reviews",
          image: "/images/doctors/dr-priya-sharma.jpg",
          href: "/doctors/dr-priya-sharma",
        },
        {
          name: "Dr. Rahul Mehta",
          specialty: "Dermatologist",
          experience: "8+ years experience",
          fee: "₹700 consultation fee",
          rating: "4.8",
          reviews: "95 reviews",
          image: "/images/doctors/dr-rahul-mehta.jpg",
          href: "/doctors/dr-rahul-mehta",
        },
        {
          name: "Dr. Neha Gupta",
          specialty: "Gynecologist",
          experience: "12+ years experience",
          fee: "₹900 consultation fee",
          rating: "4.9",
          reviews: "150 reviews",
          image: "/images/doctors/dr-neha-gupta.jpg",
          href: "/doctors/dr-neha-gupta",
        },
      ].map((doctor) => (
        <Link
          key={doctor.name}
          href={doctor.href}
          className="group relative flex min-h-[222px] items-center gap-[18px] overflow-hidden rounded-[18px] border border-[#e3def0] bg-white p-[16px] shadow-[0_4px_18px_rgba(78,68,225,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9c2eb] hover:shadow-[0_14px_35px_rgba(78,68,225,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4e44e1] focus-visible:ring-offset-2 sm:gap-[19px] sm:p-[22px]"
        >

          {/* TOP GRADIENT ACCENT */}
          <span className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#4e44e1] to-[#9122b4] transition-transform duration-300 group-hover:scale-x-100" />

          {/* DOCTOR IMAGE */}
          <div className="relative h-[174px] w-[112px] shrink-0 overflow-hidden rounded-[13px] bg-[#f0eef9] sm:w-[129px]">

            <Image
              src={doctor.image}
              alt={doctor.name}
              fill
              sizes="(max-width: 640px) 112px, 129px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            />

            {/* IMAGE OVERLAY */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#4e44e1]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* VERIFIED BADGE */}
            <div className="absolute bottom-[8px] left-[8px] flex h-[27px] w-[27px] items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#4e44e1] to-[#9122b4] text-white shadow-[0_4px_12px_rgba(78,68,225,0.28)]">
              <BadgeCheck size={17} strokeWidth={2.5} />
            </div>

          </div>

          {/* DOCTOR DETAILS */}
          <div className="min-w-0 flex-1">

            {/* NAME */}
            <h3 className="text-[17px] font-semibold leading-[25px] tracking-[-0.3px] text-black transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-[#4e44e1] group-hover:to-[#9122b4] group-hover:bg-clip-text group-hover:text-transparent sm:text-[20px]">
              {doctor.name}
            </h3>

            {/* SPECIALTY */}
            <p className="mt-[3px] bg-gradient-to-r from-[#4e44e1] to-[#9122b4] bg-clip-text text-[14px] font-semibold text-transparent sm:text-[16px]">
              {doctor.specialty}
            </p>

            {/* EXPERIENCE */}
            <div className="mt-[15px] flex items-center gap-[9px]">
              <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#f1efff]">
                <BriefcaseMedical
                  size={16}
                  className="text-[#4e44e1]"
                  strokeWidth={2}
                />
              </span>

              <span className="text-[13px] leading-5 text-[#536078] sm:text-[15px]">
                {doctor.experience}
              </span>
            </div>

            {/* CONSULTATION FEE */}
            <div className="mt-[9px] flex items-center gap-[9px]">
              <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#f9efff]">
                <Wallet
                  size={16}
                  className="text-[#9122b4]"
                  strokeWidth={2}
                />
              </span>

              <span className="text-[13px] leading-5 text-[#536078] sm:text-[15px]">
                {doctor.fee}
              </span>
            </div>

            {/* RATING */}
            <div className="mt-[17px] flex flex-wrap items-center gap-x-[7px] gap-y-1">

              <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#fff7df]">
                <Star
                  size={16}
                  fill="#fbbf24"
                  stroke="#fbbf24"
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
          <div className="absolute bottom-[18px] right-[18px] flex h-[30px] w-[30px] translate-x-2 items-center justify-center rounded-full bg-[#f1efff] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            <ArrowRight
              size={16}
              strokeWidth={2.2}
              className="text-[#4e44e1]"
            />
          </div>

        </Link>
      ))}

    </div>
  </div>
</section>

    </main>
    </>
  );
}