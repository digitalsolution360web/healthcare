
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X, ChevronDown, LogIn, UserPlus, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Doctors", href: "/doctors" },
  { name: "Clinics", href: "/clinics" },
  { name: "Hospitals", href: "/hospitals" },
  { name: "Lab Tests", href: "/lab-tests" },
];

const moreLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMoreOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#ebe8f4] bg-white/95 shadow-[0_2px_15px_rgba(78,68,225,0.04)] backdrop-blur-md">

      <div className="relative mx-auto flex min-h-[80px] max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-8">

        {/* LOGO */}
        <Link
          href="/"
          aria-label="HealthCare360 Home"
          className="group flex shrink-0 items-center gap-[7px]"
        >
          <Heart
            size={29}
            strokeWidth={2}
            className="shrink-0 text-[#4e44e1] transition-colors duration-300 group-hover:text-[#9122b4]"
          />

          <span className="whitespace-nowrap text-[26px] font-extrabold leading-none tracking-[-1.1px] text-black sm:text-[28px]">
            Doc
            <span className="bg-gradient-to-r from-[#4e44e1] to-[#9122b4] bg-clip-text text-transparent">
              Lister
            </span>
          </span>
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label={
            mobileMenuOpen ? "Close navigation" : "Open navigation"
          }
          aria-expanded={mobileMenuOpen}
          onClick={() => {
            setMobileMenuOpen((prev) => !prev);
            setMoreOpen(false);
          }}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#ddd9ee] text-[#4e44e1] transition-all duration-200 hover:border-[#c8c2eb] hover:bg-[#f5f3ff] md:hidden"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* NAVIGATION */}
        <nav
          className={`
            absolute left-0 top-full w-full flex-col gap-1
            border-b border-[#ebe8f4] bg-white px-5 pb-5 pt-4
            md:static md:flex md:w-auto md:flex-1 md:flex-row
            md:items-center md:justify-center md:gap-6
            md:border-0 md:bg-transparent md:p-0
            ${
              mobileMenuOpen
                ? "flex shadow-[0_15px_30px_rgba(78,68,225,0.08)]"
                : "hidden md:flex"
            }
          `}
        >

          {/* MAIN LINKS */}
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`
                  relative rounded-md py-2 text-[15px] font-semibold
                  transition-all duration-200 md:py-0
                  ${
                    active
                      ? "bg-gradient-to-r from-[#4e44e1] to-[#9122b4] bg-clip-text text-transparent"
                      : "text-[#4B5568] hover:bg-gradient-to-r hover:from-[#4e44e1] hover:to-[#9122b4] hover:bg-clip-text hover:text-transparent"
                  }
                `}
              >
                {link.name}

                {/* ACTIVE UNDERLINE */}
                {active && (
                  <span className="absolute -bottom-[7px] left-0 hidden h-[2px] w-full rounded-full bg-gradient-to-r from-[#4e44e1] to-[#9122b4] md:block" />
                )}
              </Link>
            );
          })}

          {/* MORE DROPDOWN */}
          <div className="relative" ref={dropdownRef}>

            <button
              type="button"
              onClick={() => setMoreOpen((prev) => !prev)}
              aria-expanded={moreOpen}
              aria-haspopup="true"
              className={`
                flex w-full items-center gap-2 rounded-md py-2
                text-[15px] font-semibold transition-all duration-200
                md:w-auto md:py-0
                ${
                  moreLinks.some((link) => isActive(link.href))
                    ? "bg-gradient-to-r from-[#4e44e1] to-[#9122b4] bg-clip-text text-transparent"
                    : "text-[#4B5568] hover:bg-gradient-to-r hover:from-[#4e44e1] hover:to-[#9122b4] hover:bg-clip-text hover:text-transparent"
                }
              `}
            >
              More

              <ChevronDown
                size={14}
                strokeWidth={1.8}
                className={`transition-transform duration-200 ${
                  moreOpen
                    ? "rotate-180 text-[#9122b4]"
                    : "text-[#697386]"
                }`}
              />
            </button>

            {/* DROPDOWN MENU */}
            {moreOpen && (
              <div
                className="
                  relative mt-2 w-full rounded-xl border
                  border-[#e7e3f2] bg-white p-2
                  shadow-[0_15px_35px_rgba(78,68,225,0.12)]
                  md:absolute md:left-0 md:top-full md:mt-4 md:w-48
                "
              >

                {/* DROPDOWN TOP ACCENT */}
                <div className="absolute left-2 right-2 top-0 h-[2px] rounded-full bg-gradient-to-r from-[#4e44e1] to-[#9122b4]" />

                {moreLinks.map((link) => {
                  const active = isActive(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMoreOpen(false)}
                      className={`
                        block rounded-lg px-4 py-3 text-sm
                        font-medium transition-all duration-200
                        ${
                          active
                            ? "bg-[#f3f1ff] bg-gradient-to-r from-[#4e44e1] to-[#9122b4] bg-clip-text text-transparent"
                            : "text-[#4B5568] hover:bg-[#f5f3ff] hover:text-[#4e44e1]"
                        }
                      `}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* MOBILE AUTH BUTTONS */}
          <div className="mt-3 flex gap-3 border-t border-[#ebe8f4] pt-4 md:hidden">

            <Link
      href="/login"
      className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-[#4e44e1]/20 bg-white px-6 py-3 text-base font-semibold text-[#4e44e1] bg-gradient-to-r from-[#4e44e1] to-[#9122b4] text-white shadow-[0_7px_18px_rgba(78,68,225,0.18)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_25px_rgba(145,34,180,0.25)]"
    >
      List Your Practice <ArrowUpRight size={19} />
    </Link>

          </div>
        </nav>

        {/* DESKTOP AUTH BUTTONS */}

<div className="hidden shrink-0 items-center gap-[14px] md:flex">

   <Link
      href="/login"
      className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-[#4e44e1]/20 bg-white px-6 py-3 text-base font-semibold text-[#4e44e1] bg-gradient-to-r from-[#4e44e1] to-[#9122b4] text-white shadow-[0_7px_18px_rgba(78,68,225,0.18)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_25px_rgba(145,34,180,0.25)]"
    >
      List Your Practice <ArrowUpRight size={19} />
    </Link>
</div>

      </div>
    </header>
  );
}
