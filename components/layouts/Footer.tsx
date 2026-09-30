
import Link from "next/link";
import {
  HeartPulse,
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
    iconStyle: "bg-blue-100 text-healthcare-blue",
  },
  {
    title: "Verified Doctors",
    description: "Trusted & certified",
    icon: ShieldCheck,
    iconStyle: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "24/7 Support",
    description: "We're here to help",
    icon: Headset,
    iconStyle: "bg-purple-100 text-purple-600",
  },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Our Doctors", href: "/doctors" },
  { name: "Departments", href: "/departments" },
  { name: "Contact Us", href: "/contact" },
];

const services = [
  {
    name: "General Consultation",
    href: "/departments",
    icon: Stethoscope,
  },
  {
    name: "Specialist Doctors",
    href: "/doctors",
    icon: UserRound,
  },
  {
    name: "Diagnostic Services",
    href: "/diagnostics",
    icon: Microscope,
  },
  {
    name: "Pharmacy",
    href: "/pharmacy",
    icon: Pill,
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
    <h3 className="mb-6 text-base font-bold text-white">
      {children}
      <span className="mt-2 block h-1 w-10 rounded-full bg-cyan-300" />
    </h3>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">

      {/* FOOTER FEATURES */}
      <div className="mx-auto max-w-7xl px-5 pt-9 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-7 pb-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="flex items-center gap-4"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${feature.iconStyle}`}
                >
                  <Icon size={23} />
                </div>

                <div>
                  <h4 className="mb-1 text-base font-bold text-healthcare-dark">
                    {feature.title}
                  </h4>

                  <p className="text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="relative overflow-hidden bg-[#062b55] text-white">

        {/* DECORATIVE BACKGROUND */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">

          {/* FOOTER GRID */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">

            {/* BRAND */}
            <div className="lg:col-span-4">

              <Link
                href="/"
                className="mb-5 inline-flex items-center gap-3"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl text-[#0876c9] shadow-lg">
                  <HeartPulse
                    size={30}
                    strokeWidth={2.2}
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight">
                    HealthCare
                    <span className="text-cyan-300">
                      360
                    </span>
                  </h2>

                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-blue-200">
                    Your Health, Our Priority
                  </p>
                </div>
              </Link>

              <p className="max-w-sm text-sm leading-7 text-blue-100/75">
                Your trusted healthcare partner, providing
                access to quality medical care, experienced
                doctors, and personalised support for your
                well-being.
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
                        className="flex h-10 w-10 items-center justify-center rounded-full"
                        >
                        <Icon size={18} />
                        </a>
                    );
                    })}
                </div>
            </div>

            {/* QUICK LINKS */}
            <div className="lg:col-span-2">
              <FooterHeading>
                Quick Links
              </FooterHeading>

              <ul className="space-y-4 text-sm text-blue-100/75">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 transition hover:translate-x-1 hover:text-cyan-300"
                    >
                      <ChevronRight
                        size={14}
                        className="shrink-0 text-cyan-300"
                      />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* OUR SERVICES */}
            <div className="lg:col-span-3">
              <FooterHeading>
                Our Services
              </FooterHeading>

              <ul className="space-y-4 text-sm text-blue-100/75">
                {services.map((service) => {
                  const Icon = service.icon;

                  return (
                    <li key={service.name}>
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-3 transition hover:text-cyan-300"
                      >
                        <Icon
                          size={17}
                          className="w-4 shrink-0 text-cyan-300"
                        />
                        {service.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* CONTACT */}
            <div className="lg:col-span-3">
              <FooterHeading>
                Get In Touch
              </FooterHeading>

              <div className="space-y-5">

                {/* ADDRESS */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-300">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <h4 className="mb-1 text-sm font-semibold">
                      Visit Our Clinic
                    </h4>

                    <p className="text-sm leading-6 text-blue-100/70">
                      Add your clinic address here
                    </p>
                  </div>
                </div>

                {/* PHONE */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-300">
                    <Phone size={18} />
                  </div>

                  <div>
                    <h4 className="mb-1 text-sm font-semibold">
                      Call Us
                    </h4>

                    <a
                      href="tel:+910000000000"
                      className="text-sm text-blue-100/70 transition hover:text-cyan-300"
                    >
                      +91 XXXXX XXXXX
                    </a>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-300">
                    <Mail size={19} />
                  </div>

                  <div className="min-w-0">
                    <h4 className="mb-1 text-sm font-semibold">
                      Email Us
                    </h4>

                    <a
                      href="mailto:info@example.com"
                      className="break-all text-sm text-blue-100/70 transition hover:text-cyan-300"
                    >
                      info@example.com
                    </a>
                  </div>
                </div>

              </div>

              {/* APPOINTMENT BUTTON */}
              <Link
                href="/appointments"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3.5 text-sm font-bold text-[#062b55] shadow-lg shadow-cyan-950/20 transition duration-300 hover:-translate-y-1 hover:bg-cyan-300 sm:w-auto"
              >
                <CalendarCheck size={17} />

                Book an Appointment

                <ArrowUpRight
                  size={14}
                  className="ml-1"
                />
              </Link>
            </div>

          </div>

          {/* FOOTER BOTTOM */}
          <div className="mt-12 border-t border-white/15 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

              <p className="text-xs leading-6 text-blue-100/60">
                &copy; {currentYear} HealthCare360.
                All rights reserved.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-blue-100/60">
                <Link
                  href="/privacy-policy"
                  className="transition hover:text-cyan-300"
                >
                  Privacy Policy
                </Link>

                <span className="hidden h-1 w-1 rounded-full bg-blue-200/40 sm:block" />

                <Link
                  href="/terms"
                  className="transition hover:text-cyan-300"
                >
                  Terms &amp; Conditions
                </Link>
              </div>

              {/* BACK TO TOP - NO CLIENT EVENT HANDLER */}
              <a
                href="#top"
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-100/70 transition hover:text-cyan-300"
              >
                Back to top
                <ArrowUp size={15} />
              </a>

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}