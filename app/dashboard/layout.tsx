
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Heart,
  LayoutDashboard,
  UserRound,
  Building2,
  PlusCircle,
  LogOut,
  ArrowLeft,
  Menu,
  X,
  ChevronDown,
  Globe,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "My Profile", icon: UserRound },
  { href: "/dashboard/listings", label: "My Listings", icon: Building2 },
  { href: "/dashboard/listings/add", label: "Add Listing", icon: PlusCircle },
];

type UserProfile = {
  name?: string;
  email?: string;
  accountType?: string;
  phone?: string;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<UserProfile>({
    name: "",
    email: "",
  });

  useEffect(() => {
    const loggedIn =
      sessionStorage.getItem("doclister_demo_logged_in") === "true";

    if (!loggedIn) {
      router.replace("/login");
      return;
    }

    function loadUser() {
      const loginEmail =
        sessionStorage.getItem("doclister_demo_email") || "";

      let profile: UserProfile = {
        name: "",
        email: loginEmail,
      };

      try {
        const savedProfile = localStorage.getItem(
          "doclister_demo_profile"
        );

        if (savedProfile) {
          profile = {
            ...profile,
            ...JSON.parse(savedProfile),
          };
        }
      } catch {
        // Fall back to the login email if saved profile data is invalid.
      }

      if (!profile.email) {
        profile.email = loginEmail;
      }

      setUser(profile);
    }

    loadUser();
    setAuthorized(true);
    setChecking(false);

    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, [pathname, router]);

  useEffect(() => {
    setUserMenuOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  function logout() {
    sessionStorage.removeItem("doclister_demo_logged_in");
    sessionStorage.removeItem("doclister_demo_email");
    setUserMenuOpen(false);
    router.replace("/");
  }

  if (checking || !authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfaff]">
        <div className="text-center">
          <Heart
            className="mx-auto animate-pulse text-[#6554e8]"
            size={36}
          />
          <p className="mt-3 text-sm font-medium text-slate-500">
            Checking your session...
          </p>
        </div>
      </div>
    );
  }

  const displayName = user.name?.trim() || "User";
  const displayEmail = user.email || "No email available";

  const initials =
    displayName === "User"
      ? (user.email?.charAt(0) || "U").toUpperCase()
      : displayName
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part[0])
          .join("")
          .toUpperCase();

  return (
    <div className="min-h-screen bg-[#fbfaff] lg:flex">
      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[#ece8ff] bg-white p-5 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="mb-9 flex items-center gap-2 text-2xl font-extrabold text-black"
        >
          <Heart size={28} className="text-[#4e44e1]" />
          Doc<span className="text-[#7b35ca]">lister</span>
        </Link>

        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">
          Workspace
        </p>

        <nav className="space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/dashboard"
                ? pathname === href
                : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-gradient-to-r from-[#4e44e1] to-[#9122b4] text-white shadow-md shadow-purple-200"
                    : "text-slate-600 hover:bg-[#f5f2ff] hover:text-[#4e44e1]"
                }`}
              >
                <Icon size={19} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-2 border-t border-slate-100 pt-5">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#4e44e1]"
          >
            <ArrowLeft size={18} />
            Visit website
          </Link>

          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Dashboard content */}
      <div className="min-w-0 flex-1 lg:ml-72">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-[#ece8ff] bg-white/95 px-4 backdrop-blur-xl sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <div className="min-w-0">
              <p className="truncate font-bold text-[#29235c]">
                My Workspace
              </p>
              <p className="hidden text-xs text-slate-500 sm:block">
                Manage your Doclister account
              </p>
            </div>
          </div>

          {/* User dropdown */}
          <div className="relative ml-3">
            <button
              type="button"
              onClick={() => setUserMenuOpen((open) => !open)}
              aria-expanded={userMenuOpen}
              aria-haspopup="menu"
              className={`flex items-center gap-2 rounded-2xl border px-2 py-1.5 transition sm:gap-3 sm:px-3 ${
                userMenuOpen
                  ? "border-[#d9d0ff] bg-[#f8f6ff]"
                  : "border-transparent bg-white hover:border-[#ece8ff] hover:bg-[#faf9ff]"
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4e44e1] to-[#9122b4] text-sm font-extrabold text-white shadow-md shadow-purple-100">
                {initials}
              </span>

              <span className="hidden min-w-0 text-left sm:block">
                <span className="block max-w-36 truncate text-sm font-bold text-[#29235c]">
                  {displayName}
                </span>
                <span className="block max-w-36 truncate text-xs text-slate-500">
                  {user.email || "My account"}
                </span>
              </span>

              <ChevronDown
                size={16}
                className={`hidden text-slate-400 transition-transform sm:block ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {userMenuOpen && (
              <>
                {/* Close menu when clicking outside */}
                <button
                  type="button"
                  aria-label="Close user menu"
                  onClick={() => setUserMenuOpen(false)}
                  className="fixed inset-0 z-40 cursor-default"
                />

                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-3 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-[#ece8ff] bg-white shadow-xl shadow-purple-100/70"
                >
                  <div className="bg-gradient-to-r from-[#302675] via-[#5141dc] to-[#9122b4] p-4 text-white">
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 font-extrabold">
                        {initials}
                      </span>

                      <div className="min-w-0">
                        <p className="truncate font-bold">
                          {displayName}
                        </p>
                        <p className="mt-1 truncate text-xs text-white/75">
                          {displayEmail}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/dashboard/profile"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#f5f2ff] hover:text-[#4e44e1]"
                    >
                      <UserRound size={18} />
                      My Profile
                    </Link>

                    <Link
                      href="/"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#f5f2ff] hover:text-[#4e44e1]"
                    >
                      <Globe size={18} />
                      Visit Website
                    </Link>

                    <Link
                      href="/dashboard/profile"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#f5f2ff] hover:text-[#4e44e1]"
                    >
                      <Settings size={18} />
                      Account Settings
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 p-2">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={logout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </header>

        <main className="mx-auto max-w-7xl p-4 sm:p-7 lg:p-9">
          {children}
        </main>
      </div>
    </div>
  );
}
