
import Link from "next/link";
import {
  Heart,
  CalendarCheck,
  ShieldCheck,
  Headset,
  ChevronRight,
  Stethoscope,
  UserRound,
  Microscope,
  Pill,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ArrowUp,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const features = [
  {
    title: "Easy Booking",
    description: "Book your visit in a few clicks",
    icon: CalendarCheck,
  },
  {
    title: "Verified Doctors",
    description: "Trusted and certified professionals",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Support",
    description: "We're here whenever you need us",
    icon: Headset,
  },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Our Doctors", href: "/doctors" },
  { name: "Clinics", href: "/clinics" },
  { name: "Hospitals", href: "/hospitals" },
  { name: "Contact Us", href: "/contact" },
];

const services = [
  {
    name: "Find a Doctor",
    href: "/doctors",
    icon: UserRound,
  },
  {
    name: "Find a Clinic",
    href: "/clinics",
    icon: Stethoscope,
  },
  {
    name: "Find a Hospital",
    href: "/hospitals",
    icon: Heart,
  },
  {
    name: "Lab Tests",
    href: "/lab-tests",
    icon: Microscope,
  },
  {
    name: "Book an Appointment",
    href: "/appointments",
    icon: CalendarCheck,
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: FaInstagram,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/",
    icon: FaYoutube,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: FaLinkedinIn,
  },
];

function FooterHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-base font-bold tracking-wide text-white">
        {children}
      </h3>

      <span className="mt-3 block h-[3px] w-10 rounded-full bg-gradient-to-r from-[#4e44e1] to-[#9122b4]" />
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto">

      {/* TOP FEATURES */}
      <section className="border-y border-[#ebe8f4] bg-white">
        <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-6 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:gap-10 lg:px-8">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group flex items-center gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#e7e3ff] bg-[#f5f3ff] text-[#4e44e1] transition-all duration-300 group-hover:border-[#4e44e1] group-hover:bg-gradient-to-r group-hover:from-[#4e44e1] group-hover:to-[#9122b4] group-hover:text-white">
                  <Icon size={22} strokeWidth={1.9} />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#151525] sm:text-base">
                    {feature.title}
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-[#73758a]">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* MAIN FOOTER */}
      <section className="relative isolate overflow-hidden bg-[#111126] text-white">

        {/* BACKGROUND DECORATION */}
        <div className="pointer-events-none absolute -right-28 -top-28 -z-10 h-80 w-80 rounded-full bg-[#4e44e1]/20 blur-[100px]" />

        <div className="pointer-events-none absolute -bottom-36 -left-24 -z-10 h-80 w-80 rounded-full bg-[#9122b4]/15 blur-[100px]" />

        <div className="mx-auto max-w-[1480px] px-5 py-12 sm:px-8 sm:py-14 lg:px-8 lg:py-16">

          {/* FOOTER COLUMNS */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">

            {/* BRAND */}
            <div className="lg:col-span-4">

              <Link
                href="/"
                aria-label="HealthCare360 Home"
                className="group mb-6 inline-flex items-center gap-3"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4e44e1] to-[#9122b4] text-white shadow-lg shadow-purple-950/30 transition-transform duration-300 group-hover:scale-105">
                  <Heart size={30} strokeWidth={2} />
                </div>

                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-white">
                    Doc
                    <span className="bg-gradient-to-r from-[#8f86ff] to-[#e0a0ff] bg-clip-text text-transparent">
                      Lister
                    </span>
                  </h2>

                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b8b4d8]">
                    Your Health, Our Priority
                  </p>
                </div>
              </Link>

              <p className="max-w-sm text-sm leading-7 text-[#b7b7cc]">
                Your trusted healthcare partner. Discover experienced
                doctors, explore clinics and hospitals, and access
                healthcare services with greater convenience.
              </p>

              {/* SOCIAL LINKS */}
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#c8c5e5] transition-all duration-300 hover:-translate-y-1 hover:border-[#4e44e1] hover:bg-gradient-to-r hover:from-[#4e44e1] hover:to-[#9122b4] hover:text-white"
                    >
                      <Icon size={17} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* QUICK LINKS */}
            <div className="lg:col-span-2">
              <FooterHeading>Quick Links</FooterHeading>

              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-[#b7b7cc] transition-colors duration-200 hover:text-white"
                    >
                      <ChevronRight
                        size={15}
                        className="shrink-0 text-[#8f86ff] transition-transform duration-200 group-hover:translate-x-1"
                      />

                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SERVICES */}
            <div className="lg:col-span-3">
              <FooterHeading>Our Services</FooterHeading>

              <ul className="space-y-4">
                {services.map((service) => {
                  const Icon = service.icon;

                  return (
                    <li key={service.name}>
                      <Link
                        href={service.href}
                        className="group inline-flex items-center gap-3 text-sm text-[#b7b7cc] transition-colors duration-200 hover:text-white"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#a49bff] transition-all duration-200 group-hover:bg-[#4e44e1]/20 group-hover:text-white">
                          <Icon size={16} />
                        </span>

                        {service.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* CONTACT INFORMATION */}
            <div className="lg:col-span-3">
              <FooterHeading>Get In Touch</FooterHeading>

              <div className="space-y-5">

                {/* ADDRESS */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#a49bff]">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Our Location
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-[#b7b7cc]">
                      Add your clinic address here
                    </p>
                  </div>
                </div>

                {/* PHONE */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#a49bff]">
                    <Phone size={18} />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Call Us
                    </h4>

                    <a
                      href="tel:+910000000000"
                      className="mt-1 block text-sm text-[#b7b7cc] transition-colors hover:text-white"
                    >
                      +91 XXXXX XXXXX
                    </a>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#a49bff]">
                    <Mail size={18} />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-white">
                      Email Us
                    </h4>

                    <a
                      href="mailto:info@example.com"
                      className="mt-1 block break-all text-sm text-[#b7b7cc] transition-colors hover:text-white"
                    >
                      info@example.com
                    </a>
                  </div>
                </div>
              </div>

              {/* APPOINTMENT CTA */}
              <Link
                href="/appointments"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-950/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/40 sm:w-auto"
              >
                <CalendarCheck size={17} />

                Book an Appointment

                <ArrowUpRight size={16} />
              </Link>
            </div>

          </div>

          {/* BOTTOM FOOTER */}
          <div className="mt-12 border-t border-white/10 pt-6 lg:mt-14">

            <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">

              <p className="text-xs leading-6 text-[#9292ac]">
                © {currentYear} HealthCare360. All rights reserved.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-[#9292ac]">
                <Link
                  href="/privacy-policy"
                  className="transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>

                <span className="hidden h-1 w-1 rounded-full bg-[#666681] sm:block" />

                <Link
                  href="/terms"
                  className="transition-colors hover:text-white"
                >
                  Terms &amp; Conditions
                </Link>
              </div>

              {/* BACK TO TOP */}
              <a
                href="#top"
                className="group inline-flex items-center gap-2 text-xs font-semibold text-[#b7b7cc] transition-colors hover:text-white"
              >
                Back to top

                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-200 group-hover:border-[#4e44e1] group-hover:bg-[#4e44e1]">
                  <ArrowUp size={14} />
                </span>
              </a>

            </div>
          </div>

        </div>
      </section>
    </footer>
  );
}
