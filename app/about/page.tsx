
"use client";

import Link from "next/link";
import {
  ArrowRight,
  HeartPulse,
  Search,
  UsersRound,
  Stethoscope,
  Target,
  Eye,
  CheckCircle2,
  Compass,
  Building2,
  ShieldCheck,
} from "lucide-react";

const benefits = [
  {
    icon: Search,
    number: "01",
    title: "Discover Healthcare",
    description:
      "Explore healthcare providers, medical specialties, and relevant service information in one convenient place.",
  },
  {
    icon: UsersRound,
    number: "02",
    title: "A Patient-Focused Experience",
    description:
      "Navigate healthcare information through a simple, accessible experience designed around your discovery needs.",
  },
  {
    icon: Stethoscope,
    number: "03",
    title: "Professional Visibility",
    description:
      "Help people discover healthcare professionals and learn more about the services they offer.",
  },
];

const steps = [
  {
    number: "01",
    title: "Explore",
    description:
      "Browse healthcare providers and discover specialties relevant to your search.",
  },
  {
    number: "02",
    title: "Learn More",
    description:
      "Review available profile details and healthcare service information.",
  },
  {
    number: "03",
    title: "Connect",
    description:
      "Use the available provider contact or appointment options to take your next step.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#171526]">
      {/* HERO BANNER */}
      <section className="relative isolate overflow-hidden border-b border-[#ece9fb] bg-gradient-to-br from-[#f3f1ff] via-white to-[#fbf4ff]">
        <div className="pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#4e44e1]/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-80 w-80 rounded-full bg-[#9122b4]/10 blur-[100px]" />

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl md:text-center">
            <div className="mb-6 flex items-center md:justify-center gap-2 text-sm font-medium text-[#77758c]">
              <Link href="/" className="transition hover:text-[#4e44e1]">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-[#4e44e1]">
                About Us
              </span>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-[#ded9ff] bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#4e44e1] shadow-sm">
              <HeartPulse size={15} />
              About Doclister
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-[-1.5px] text-[#171526] sm:text-5xl lg:text-6xl">
              Making Healthcare{" "}
              <span className="bg-gradient-to-r from-[#4e44e1] to-[#9122b4] bg-clip-text text-transparent">
                Easier to Discover
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#68677e] sm:text-lg">
              Doclister makes it easier to explore healthcare professionals,
              discover medical specialties, and access useful provider
              information through a simple online experience.
            </p>

            <div className="mt-8 flex flex-wrap md:justify-center gap-3">
              <Link
                href="/doctors"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-6 text-sm font-bold text-white shadow-lg shadow-[#4e44e1]/15 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Explore Providers
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[#ded9f3] bg-white px-6 text-sm font-bold text-[#4e44e1] transition hover:border-[#4e44e1] hover:bg-[#f8f6ff]"
              >
                Contact Us
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap md:justify-center gap-x-6 gap-y-3 text-sm text-[#68677e]">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} className="text-[#4e44e1]" />
                Convenient provider discovery
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} className="text-[#4e44e1]" />
                Simple online experience
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#4e44e1]">
              Who We Are
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              A Simpler Way to Explore Healthcare
            </h2>

            <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-[#4e44e1] to-[#9122b4]" />
          </div>

          <div className="space-y-4 text-sm leading-7 text-[#68677e] sm:text-base sm:leading-8">
            <p>
              Finding relevant healthcare information can sometimes feel
              overwhelming. Doclister aims to make the process more
              straightforward by bringing healthcare provider discovery
              into one convenient online destination.
            </p>

            <p>
              Visitors can explore available provider information, learn
              about medical specialties, and identify relevant next steps
              when searching for healthcare services.
            </p>

            <p>
              Our approach is centred on clarity, accessibility, and ease
              of navigation, helping people move through their healthcare
              search with greater confidence.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="border-y border-[#ece9fb] bg-[#faf9ff] px-5 py-14 sm:px-8 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-2xl md:text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#4e44e1]">
              Our Purpose
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              What Guides Doclister
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#77758c] sm:text-base">
              Making healthcare information easier to discover through
              clarity, accessibility, and a user-focused approach.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <article className="group rounded-3xl border border-[#e7e3f5] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#cec7fa] hover:shadow-lg sm:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0edff] text-[#4e44e1] transition group-hover:bg-[#4e44e1] group-hover:text-white">
                <Target size={27} />
              </div>

              <h3 className="mt-6 text-2xl font-extrabold">
                Our Mission
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#68677e] sm:text-base sm:leading-8">
                To make healthcare provider information easier to find,
                explore, and understand through an accessible, organised,
                and user-friendly digital directory.
              </p>
            </article>

            <article className="group rounded-3xl border border-[#eee0f4] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#e3c4f1] hover:shadow-lg sm:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f9edff] text-[#9122b4] transition group-hover:bg-[#9122b4] group-hover:text-white">
                <Eye size={27} />
              </div>

              <h3 className="mt-6 text-2xl font-extrabold">
                Our Vision
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#68677e] sm:text-base sm:leading-8">
                To create a more connected healthcare discovery experience
                where people can navigate provider information with greater
                clarity, convenience, and confidence.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* PLATFORM BENEFITS */}
      <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#4e44e1]">
              Why Doclister
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Designed Around Healthcare Discovery
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#77758c] sm:text-base">
              A straightforward way to explore provider information and
              learn about available healthcare services.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="group relative overflow-hidden rounded-2xl border border-[#e9e5f5] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#cec7fa] hover:shadow-[0_16px_40px_rgba(78,68,225,0.08)] sm:p-7"
                >
                  <span className="absolute right-5 top-5 text-xs font-bold tracking-widest text-[#c5c0e6]">
                    {benefit.number}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#f0edff] to-[#f9edff] text-[#4e44e1] transition group-hover:from-[#4e44e1] group-hover:to-[#9122b4] group-hover:text-white">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-lg font-extrabold">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#77758c]">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-[#ece9fb] bg-gradient-to-br from-[#faf9ff] via-white to-[#fbf6ff] px-5 py-14 sm:px-8 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-2xl md:text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#4e44e1]">
              Simple by Design
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Your Search, Made Simpler
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#77758c] sm:text-base">
              A simple journey from discovering healthcare information to
              exploring the next available step.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-[#e9e5f5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-7"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0edff] text-sm font-extrabold text-[#4e44e1]">
                  {step.number}
                </span>

                <h3 className="mt-5 text-xl font-extrabold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#77758c]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* FINAL CTA — KEEP PURPLE GRADIENT */}
      <section className="px-5 pb-14 pt-20 sm:px-8 sm:pb-20 lg:px-8">
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-6 py-12 md:text-center text-white shadow-xl shadow-[#4e44e1]/10 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -left-16 -top-24 -z-10 h-64 w-64 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-32 -right-10 -z-10 h-80 w-80 rounded-full border border-white/10" />

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            <Compass size={28} />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Your Healthcare Search Starts Here
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
            Explore healthcare provider information and discover available
            services with Doclister.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/doctors"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-[#4e44e1] transition hover:-translate-y-0.5 hover:bg-[#f5f2ff]"
            >
              Explore Providers
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 text-sm font-bold text-white transition hover:bg-white/20"
            >
              <Building2 size={17} />
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
