"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X, ChevronDown } from "lucide-react";

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

  const navClass = (href: string) =>
    `whitespace-nowrap text-[15px] font-semibold transition-colors duration-200
    ${
      isActive(href)
        ? "text-[#1769D2]"
        : "text-[#4B5568] hover:text-[#1769D2]"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#F0F2F5] bg-white">
      <div className="relative mx-auto flex min-h-[80px] max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-8">

        {/* LOGO */}
        <Link
          href="/"
          aria-label="HealthCare360 Home"
          className="flex shrink-0 items-center gap-[7px]"
        >
          <Heart
            size={29}
            strokeWidth={2}
            className="shrink-0 text-[#1769D2]"
          />

          <span className="whitespace-nowrap text-[26px] font-extrabold leading-none tracking-[-1.1px]  sm:text-[28px]">
            HealthCare<span className="text-[#1769D2]">360</span>
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
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] text-black transition hover:bg-[#F0F6FF] md:hidden"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* NAVIGATION */}
        <nav
          className={`
            absolute left-0 top-full w-full flex-col gap-1
            border-b border-[#EEF1F5] bg-white px-5 pb-5 pt-4
            md:static md:flex md:w-auto md:flex-1 md:flex-row
            md:items-center md:justify-center md:gap-6
            md:border-0 md:bg-transparent md:p-0
            ${
              mobileMenuOpen
                ? "flex shadow-lg"
                : "hidden md:flex"
            }
          `}
        >
          {/* MAIN LINKS */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`
                rounded-md py-2 text-[15px] font-semibold
                transition-colors duration-200
                md:py-0
                ${
                  isActive(link.href)
                    ? "text-[#1769D2]"
                    : "text-black hover:text-[#1769D2]"
                }
              `}
            >
              {link.name}
            </Link>
          ))}

          {/* MORE DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setMoreOpen((prev) => !prev)}
              aria-expanded={moreOpen}
              aria-haspopup="true"
              className={`
                flex w-full items-center gap-2 rounded-md py-2
                text-[15px] font-semibold transition-colors
                duration-200 md:w-auto md:py-0
                ${
                  moreLinks.some((link) => isActive(link.href))
                    ? "text-[#1769D2]"
                    : "text-[#4B5568] hover:text-[#1769D2]"
                }
              `}
            >
              More

              <ChevronDown
                size={14}
                strokeWidth={1.8}
                className={`transition-transform duration-200 ${
                  moreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* DROPDOWN MENU */}
            {moreOpen && (
              <div
                className="
                  relative mt-2 w-full rounded-lg border
                  border-[#E8EDF3] bg-white p-2 shadow-lg
                  md:absolute md:left-0 md:top-full md:mt-4 md:w-48
                "
              >
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMoreOpen(false)}
                    className={`
                      block rounded-md px-4 py-3 text-sm
                      font-medium transition-colors
                      ${
                        isActive(link.href)
                          ? "bg-[#F0F6FF] text-[#1769D2]"
                          : "text-[#4B5568] hover:bg-[#F0F6FF] hover:text-[#1769D2]"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* MOBILE AUTH BUTTONS */}
          <div className="mt-3 flex gap-3 border-t border-[#EEF1F5] pt-4 md:hidden">
            <Link
              href="/login"
              className="
                flex min-h-[44px] flex-1 items-center justify-center
                rounded-[9px] border border-[#D7E5FA] px-5
                text-sm font-bold text-[#1769D2]
                transition hover:bg-[#F0F6FF]
              "
            >
              Login
            </Link>

            <Link
              href="/register"
              className="
                flex min-h-[44px] flex-1 items-center justify-center
                rounded-[9px] bg-[#1769D2] px-5
                text-sm font-bold text-white
                transition hover:bg-[#1259B5]
              "
            >
              Sign Up
            </Link>
          </div>
        </nav>

        {/* DESKTOP AUTH BUTTONS */}
        <div className="hidden shrink-0 items-center gap-[14px] md:flex">
          <Link
            href="/login"
            className="
              inline-flex h-[44px] min-w-[89px] items-center
              justify-center rounded-[9px] border border-[#D7E5FA]
              px-5 text-[15px] font-bold text-[#1769D2]
              transition-colors hover:bg-[#F0F6FF]
            "
          >
            Login
          </Link>

          <Link
            href="/register"
            className="
              inline-flex h-[44px] min-w-[105px] items-center
              justify-center rounded-[9px] bg-[#1769D2]
              px-5 text-[15px] font-bold text-white
              shadow-sm transition-colors hover:bg-[#1259B5]
            "
          >
            Sign Up
          </Link>
        </div>

      </div>
    </header>
  );
}