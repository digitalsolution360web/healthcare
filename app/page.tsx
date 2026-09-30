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
    <main className="relative min-h-screen overflow-hidden bg-[#eef7ff] font-sans text-[#183b60]">
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
      <section className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl flex-col px-5 pb-10 pt-16 sm:px-8 lg:min-h-[768px] lg:px-0 lg:pt-[127px]">
        <div className="grid flex-1 grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-[65px]">
          {/* LEFT CONTENT */}
          <div className="relative z-10 max-w-[570px]">
            {/* TRUST BADGE */}
            <div className="inline-flex h-[51px] items-center gap-[13px] rounded-full border-2 border-[#c2ddff] bg-white/80 px-[21px]">
              <span className="h-[13px] w-[13px] rounded-full bg-[#10b981]" />

              <span className="text-[16px] font-medium tracking-[-0.2px] text-[#183b60] sm:text-[17px]">
                Your Health, Our Priority
              </span>
            </div>

            {/* HEADING */}
            <h1 className="mt-[27px] text-[43px] font-extrabold leading-[1.08] tracking-[-1.8px] text-[#183b60] sm:text-[54px] lg:text-[68px] lg:leading-[1.03] lg:tracking-[-2.2px]">
              Find the Right
              <br />

              <span className="text-[#1971d4]">Doctor, Clinic</span> or
              <br />

              Hospital Near You
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-[29px] max-w-[550px] text-[17px] leading-[1.55] text-[#344f6a] sm:text-[19px] lg:text-[21px] lg:leading-[1.5]">
              Book appointments, read reviews and get the best healthcare
              services — all in one place.
            </p>

            {/* TRUST POINTS */}
            <div className="mt-[34px] flex flex-wrap items-center gap-x-7 gap-y-4">
              <div className="flex items-center gap-[13px]">
                <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#10b981] text-white">
                  <Check size={21} strokeWidth={3} />
                </span>

                <span className="whitespace-nowrap text-[15px] font-medium text-[#183b60] sm:text-[17px]">
                  Verified Doctor
                </span>
              </div>

              <span className="hidden h-[35px] w-px bg-[#1971d4] sm:block" />

              <div className="flex items-center gap-[13px]">
                <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#10b981] text-white">
                  <Check size={21} strokeWidth={3} />
                </span>

                <span className="whitespace-nowrap text-[15px] font-medium text-[#183b60] sm:text-[17px]">
                  Easy Appointments
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative mt-0 h-[380px] w-full lg:mt-[157px] lg:h-[430px]">
            {/* IMAGE BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden bg-[#d9eafa]">
              <Image
                src="/images/doctor-hero.jpg"
                alt="Doctor providing trusted healthcare"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            {/* TRUSTED CARE CARD */}
            <div className="absolute bottom-[30px] left-[10px] z-10 flex min-h-[89px] items-center gap-[14px] rounded-[17px] border border-[#e5edf5] bg-white px-[21px] py-4 shadow-[0_8px_30px_rgba(20,55,90,0.08)] sm:bottom-[30px] sm:left-[10px]">
              <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#d1fae5]">
                <ShieldCheck
                  size={24}
                  strokeWidth={2.5}
                  className="fill-[#079b71] text-white"
                />
              </div>

              <div>
                <h2 className="whitespace-nowrap text-[16px] font-semibold leading-6 text-[#183b60] sm:text-[18px]">
                  Trusted Care
                </h2>

                <p className="whitespace-nowrap text-[14px] leading-6 text-[#344f6a] sm:text-[16px]">
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
            className="grid min-h-[94px] grid-cols-1 gap-3 rounded-[17px] border border-[#d8e6f5] bg-white p-3 shadow-[0_15px_40px_rgba(35,76,115,0.07)] sm:grid-cols-2 lg:grid-cols-[1.05fr_1.05fr_1.05fr_160px] lg:items-center lg:gap-0 lg:p-[10px]"
          >
            {/* DOCTOR FIELD */}
            <div className="relative flex h-[68px] items-center border-b border-[#e0eaf5] px-3 sm:border-r sm:border-b-0 lg:px-[25px]">
              <Search
                size={21}
                className="shrink-0 text-[#6484a6]"
                strokeWidth={2}
              />

              <input
                type="text"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                placeholder="Doctor"
                aria-label="Doctor name"
                className="ml-[18px] h-full min-w-0 flex-1 bg-transparent text-[17px] text-[#183b60] outline-none placeholder:text-[#536d89]"
              />

              <ChevronDown
                size={18}
                className="ml-2 shrink-0 text-[#8ba4bf]"
              />
            </div>

            {/* SPECIALTY FIELD */}
            <div className="relative flex h-[68px] items-center border-b border-[#e0eaf5] px-3 sm:border-b-0 sm:border-r lg:px-[25px]">
              <Stethoscope
                size={21}
                className="shrink-0 text-[#6484a6]"
                strokeWidth={2}
              />

              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                aria-label="Select specialty"
                className="ml-[18px] h-full min-w-0 flex-1 cursor-pointer appearance-none bg-transparent text-[17px] text-[#183b60] outline-none"
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
                className="pointer-events-none ml-2 shrink-0 text-[#536d89]"
              />
            </div>

            {/* LOCATION FIELD */}
            <div className="relative flex h-[68px] items-center px-3 lg:px-[25px]">
              <MapPin
                size={21}
                className="shrink-0 text-[#6484a6]"
                fill="#6484a6"
                strokeWidth={1.5}
              />

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                aria-label="City or location"
                className="ml-[18px] h-full min-w-0 flex-1 bg-transparent text-[17px] text-[#183b60] outline-none placeholder:text-[#536d89]"
              />

              <ChevronDown
                size={18}
                className="ml-2 shrink-0 text-[#8ba4bf]"
              />
            </div>

            {/* SEARCH BUTTON */}
            <button
              type="submit"
              className="flex h-[70px] w-full items-center justify-center gap-[13px] rounded-[13px] bg-[#1769cf] px-5 text-[17px] font-semibold text-white transition-colors hover:bg-[#1259b4] focus:outline-none focus:ring-4 focus:ring-[#1769cf]/20"
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
        iconColor: "text-[#1971d4]",
        iconBg: "bg-[#eaf2ff]",
        href: "/doctors",
      },
      {
        title: "Clinics",
        description: "Top rated clinics",
        icon: HousePlus,
        iconColor: "text-[#059669]",
        iconBg: "bg-[#e8faf2]",
        href: "/clinics",
      },
      {
        title: "Hospitals",
        description: "Trusted hospitals",
        icon: Hospital,
        iconColor: "text-[#7c3aed]",
        iconBg: "bg-[#f2edff]",
        href: "/hospitals",
      },
      {
        title: "Lab Tests",
        description: "Book diagnostic tests",
        icon: FlaskConical,
        iconColor: "text-[#0284c7]",
        iconBg: "bg-[#eaf7ff]",
        href: "/lab-tests",
      },
    ].map((item) => {
      const Icon = item.icon;

      return (
        <Link
          key={item.title}
          href={item.href}
          className="group relative flex min-h-[146px] items-start gap-4 overflow-hidden rounded-[15px] border border-[#e8eef5] bg-white px-5 py-6 transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-[#b9d5ff] hover:shadow-[0_10px_28px_rgba(25,81,145,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1971d4] focus-visible:ring-offset-2 sm:gap-[18px] sm:px-[23px]"
        >
          {/* SUBTLE HOVER ACCENT */}
          <span className="absolute left-0 top-0 h-full w-[3px] origin-center scale-y-0 rounded-full bg-[#1971d4] transition-transform duration-300 group-hover:scale-y-100 group-focus-visible:scale-y-100" />

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
            <h3 className="text-[18px] font-semibold leading-6 tracking-[-0.35px] text-[#183b60] transition-colors duration-200 group-hover:text-[#1769cf]">
              {item.title}
            </h3>

            <p className="mt-[7px] text-[15px] leading-[22px] text-[#71839c] sm:text-[16px]">
              {item.description}
            </p>
          </div>

          {/* HOVER ARROW */}
          <span className="absolute bottom-[17px] right-[19px] translate-x-1 text-[#1971d4] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
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

{/* TOP SPECIALTIES SECTION */}
<section className="relative w-full bg-white px-5 py-12 sm:px-8 lg:px-[31px] lg:py-[42px]">

  <div className="mx-auto max-w-7xl">

    {/* SECTION HEADER */}
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

      {/* HEADING CONTENT */}
      <div>
        {/* EYEBROW */}
        <div className="mb-[14px] flex items-center gap-[11px]">
          <span className="h-[4px] w-[36px] rounded-full bg-[#1971d4]" />

          <span className="text-[14px] font-semibold uppercase tracking-[3px] text-[#1971d4]">
            Find Your Specialist
          </span>
        </div>

        {/* TITLE */}
        <h2 className="text-[38px] font-extrabold leading-[1.15] tracking-[-1.5px] text-[#183b60] sm:text-[46px]">
          Top{" "}
          <span className="text-[#1971d4]">
            Specialties
          </span>
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-[10px] max-w-[650px] text-[17px] leading-[1.65] text-[#53677f] sm:text-[20px]">
          Explore our medical specialties and find the right expert for your
          <br className="hidden lg:block" /> healthcare needs.
        </p>
      </div>

      {/* VIEW ALL BUTTON */}
      <Link
        href="/specialties"
        className="group inline-flex h-[56px] w-fit shrink-0 items-center justify-center gap-[13px] rounded-[9px] border border-[#c5dcff] bg-[#f0f7ff] px-[23px] text-[16px] font-semibold text-[#1769cf] transition-all duration-300 hover:border-[#1769cf] hover:bg-[#1769cf] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769cf] focus-visible:ring-offset-2 sm:text-[17px]"
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
          iconColor: "text-[#e11d48]",
          iconBg: "bg-[#fff0f3]",
          href: "/specialties/cardiology",
        },
        {
          title: "Dermatology",
          subtitle: "Skin & Hair",
          icon: UserRound,
          iconColor: "text-[#2563eb]",
          iconBg: "bg-[#eff6ff]",
          href: "/specialties/dermatology",
        },
        {
          title: "Orthopedics",
          subtitle: "Bone & Joint",
          icon: Bone,
          iconColor: "text-[#d97706]",
          iconBg: "bg-[#fffbeb]",
          href: "/specialties/orthopedics",
        },
        {
          title: "Gynecology",
          subtitle: "Women's Health",
          icon: Venus,
          iconColor: "text-[#db2777]",
          iconBg: "bg-[#fdf2f8]",
          href: "/specialties/gynecology",
        },
        {
          title: "Pediatrics",
          subtitle: "Child Care",
          icon: Baby,
          iconColor: "text-[#0d9488]",
          iconBg: "bg-[#f0fdfa]",
          href: "/specialties/pediatrics",
        },
        {
          title: "Dentistry",
          subtitle: "Oral Health",
          icon: Smile,
          iconColor: "text-[#0284c7]",
          iconBg: "bg-[#f0f9ff]",
          href: "/specialties/dentistry",
        },
      ].map((specialty) => {
        const Icon = specialty.icon;

        return (
          <Link
            key={specialty.title}
            href={specialty.href}
            className="group relative flex min-h-[192px] flex-col items-start rounded-[14px] border border-[#dce6f2] bg-[#f8fafc] px-[22px] py-[23px] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#b9d5ff] hover:bg-white hover:shadow-[0_10px_25px_rgba(25,81,145,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1971d4] focus-visible:ring-offset-2"
          >
            {/* ICON */}
            <div
              className={`flex h-[63px] w-[63px] items-center justify-center rounded-[13px] ${specialty.iconBg} transition-transform duration-300 group-hover:scale-105`}
            >
              <Icon
                size={27}
                strokeWidth={2.2}
                className={specialty.iconColor}
              />
            </div>

            {/* TITLE */}
            <h3 className="mt-[24px] text-[17px] font-semibold leading-[24px] tracking-[-0.25px] text-[#183b60] transition-colors duration-200 group-hover:text-[#1769cf] sm:text-[18px]">
              {specialty.title}
            </h3>

            {/* SUBTITLE */}
            <p className="mt-[7px] text-[15px] leading-[22px] text-[#53677f] sm:text-[16px]">
              {specialty.subtitle}
            </p>

          </Link>
        );
      })}

    </div>

  </div>
</section>

{/* FEATURED DOCTORS SECTION */}
<section className="w-full border-b border-[#dce5ef] bg-[#f7f9fc] px-5 py-12 sm:px-8 lg:px-[45px] lg:py-[64px]">
  <div className="mx-auto max-w-7xl">

    {/* SECTION HEADER */}
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

      <div>
        {/* EYEBROW */}
        <div className="mb-[13px] flex items-center gap-[11px]">
          <span className="h-[4px] w-[30px] rounded-full bg-[#1971d4]" />

          <span className="text-[13px] font-semibold uppercase tracking-[2.5px] text-[#1971d4]">
            Meet Our Specialists
          </span>
        </div>

        {/* HEADING */}
        <h2 className="text-[36px] font-extrabold leading-[1.15] tracking-[-1.3px] text-[#183b60] sm:text-[42px]">
          Featured Doctors
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-[10px] text-[16px] leading-7 text-[#53677f] sm:text-[18px]">
          Connect with experienced and trusted healthcare professionals.
        </p>
      </div>

      {/* VIEW ALL DOCTORS */}
      <Link
        href="/doctors"
        className="group inline-flex w-fit shrink-0 items-center gap-[10px] pb-[5px] text-[16px] font-semibold text-[#1769cf] transition-colors duration-200 hover:text-[#104e9c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1971d4] focus-visible:ring-offset-4"
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
          className="group flex min-h-[222px] items-center gap-[18px] rounded-[18px] border border-[#dce6f2] bg-white p-[16px] transition-all duration-300 hover:-translate-y-1 hover:border-[#b9d5ff] hover:shadow-[0_12px_30px_rgba(24,59,96,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1971d4] focus-visible:ring-offset-2 sm:gap-[19px] sm:p-[22px]"
        >

          {/* DOCTOR IMAGE */}
          <div className="relative h-[174px] w-[112px] shrink-0 overflow-hidden rounded-[13px] bg-[#e5eaf0] sm:w-[129px]">

            <Image
              src={doctor.image}
              alt={doctor.name}
              fill
              sizes="(max-width: 640px) 112px, 129px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            />

            {/* VERIFIED BADGE */}
            <div className="absolute bottom-[8px] left-[8px] flex h-[27px] w-[27px] items-center justify-center rounded-full border-2 border-white bg-[#10b981] text-white shadow-sm">
              <BadgeCheck size={17} strokeWidth={2.5} />
            </div>

          </div>

          {/* DOCTOR DETAILS */}
          <div className="min-w-0 flex-1">

            {/* NAME */}
            <h3 className="text-[17px] font-semibold leading-[25px] tracking-[-0.3px] text-[#183b60] transition-colors duration-200 group-hover:text-[#1769cf] sm:text-[20px]">
              {doctor.name}
            </h3>

            {/* SPECIALTY */}
            <p className="mt-[3px] text-[14px] font-medium text-[#1769cf] sm:text-[16px]">
              {doctor.specialty}
            </p>

            {/* EXPERIENCE */}
            <div className="mt-[15px] flex items-center gap-[9px]">
              <BriefcaseMedical
                size={17}
                className="shrink-0 text-[#8ba0b8]"
                fill="#8ba0b8"
                stroke="white"
              />

              <span className="text-[13px] leading-5 text-[#53677f] sm:text-[15px]">
                {doctor.experience}
              </span>
            </div>

            {/* CONSULTATION FEE */}
            <div className="mt-[9px] flex items-center gap-[9px]">
              <Wallet
                size={17}
                className="shrink-0 text-[#8ba0b8]"
                fill="#8ba0b8"
                stroke="white"
              />

              <span className="text-[13px] leading-5 text-[#53677f] sm:text-[15px]">
                {doctor.fee}
              </span>
            </div>

            {/* RATING */}
            <div className="mt-[17px] flex flex-wrap items-center gap-x-[7px] gap-y-1">
              <Star
                size={18}
                fill="#fbbf24"
                stroke="#fbbf24"
              />

              <span className="text-[15px] font-bold text-[#183b60] sm:text-[16px]">
                {doctor.rating}
              </span>

              <span className="text-[12px] text-[#71839c] sm:text-[13px]">
                ({doctor.reviews})
              </span>
            </div>

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