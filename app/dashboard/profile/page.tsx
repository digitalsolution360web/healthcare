
"use client";

import { useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Building2,
  Pencil,
  Check,
  X,
  Map,
  Hash,
  BriefcaseBusiness,
  CalendarDays,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

type Profile = {
  name: string;
  phone: string;
  email: string;
  accountType: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

const emptyProfile: Profile = {
  name: "",
  phone: "",
  email: "",
  accountType: "doctor",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#6554e8] focus:ring-4 focus:ring-purple-100";

const accountLabels: Record<string, string> = {
  doctor: "Doctor",
  clinic: "Clinic",
  hospital: "Hospital",
  diagnostic: "Diagnostic Centre",
};

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
}) {
  return (
    <div className="group flex min-w-0 items-start gap-3 rounded-2xl border border-[#eeeafd] bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[#d9d0ff] hover:shadow-md hover:shadow-purple-50">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f0edff] to-[#f8eaff] text-[#6554e8] transition group-hover:from-[#6554e8] group-hover:to-[#9122b4] group-hover:text-white">
        <Icon size={20} />
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1.5 break-words text-sm font-bold leading-5 text-[#29235c]">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [draft, setDraft] = useState<Profile>(emptyProfile);
  const [editing, setEditing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("doclister_demo_profile");
      const loginEmail = sessionStorage.getItem("doclister_demo_email");

      let data = { ...emptyProfile };

      if (saved) {
        const parsed = JSON.parse(saved);

        data = {
          ...emptyProfile,
          ...parsed,
        };
      }

      if (!data.email && loginEmail) {
        data.email = loginEmail;
      }

      setProfile(data);
      setDraft(data);
    } catch {
      setProfile({
        ...emptyProfile,
        email: sessionStorage.getItem("doclister_demo_email") || "",
      });
    }

    setLoaded(true);
  }, []);

  function startEditing() {
    setDraft({ ...profile });
    setMessage("");
    setEditing(true);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setDraft((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      localStorage.setItem(
        "doclister_demo_profile",
        JSON.stringify(draft)
      );

      sessionStorage.setItem("doclister_demo_email", draft.email);

      setProfile({ ...draft });
      setEditing(false);
      setMessage("Your profile has been updated successfully.");
    } catch {
      setMessage("Unable to save your profile. Please try again.");
    }
  }

  function cancelEditing() {
    setDraft({ ...profile });
    setEditing(false);
    setMessage("");
  }

  if (!loaded) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-purple-200 border-t-[#6554e8]" />
          Loading your profile...
        </div>
      </div>
    );
  }

  const displayName = profile.name.trim() || "Your Name";

  const initials =
    profile.name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  const accountType =
    accountLabels[profile.accountType] || "Account";

  const location =
    [profile.city, profile.state].filter(Boolean).join(", ") ||
    "Location not provided";

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-8">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#6554e8]" />
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#6554e8]">
              Account Settings
            </p>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#29235c] sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Manage your personal information and account details.
          </p>
        </div>

        {!editing && (
          <button
            type="button"
            onClick={startEditing}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-200/60 transition hover:-translate-y-0.5 hover:shadow-xl sm:self-auto"
          >
            <Pencil size={17} />
            Edit Profile
            <ArrowUpRight size={16} />
          </button>
        )}
      </div>

      {/* Success / error message */}
      {message && (
        <div
          role="status"
          className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${
            message.includes("successfully")
              ? "border-green-100 bg-green-50 text-green-700"
              : "border-red-100 bg-red-50 text-red-700"
          }`}
        >
          {message.includes("successfully") && (
            <Check size={18} className="mt-0.5 shrink-0" />
          )}
          <span>{message}</span>
        </div>
      )}

      {/* Full gradient profile card */}
      <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#28206d] via-[#5141dc] to-[#9122b4] p-5 text-white shadow-xl shadow-purple-200/50 sm:p-8 lg:p-9">
        {/* Decorative background effects */}
        <div className="pointer-events-none absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full bg-fuchsia-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 -z-10 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="pointer-events-none absolute right-1/3 top-1/3 -z-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

        {/* Subtle pattern */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
        </div>

        {/* Profile top section */}
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">
            {/* Avatar */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/30 bg-white/15 text-2xl font-extrabold text-white shadow-xl shadow-black/10 ring-4 ring-white/10 backdrop-blur-xl sm:h-28 sm:w-28 sm:text-4xl">
              {initials}
            </div>

            {/* User information */}
            <div className="min-w-0">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-purple-100 sm:text-xs">
                <ShieldCheck size={13} />
                My Account
              </div>

              <h2 className="break-words text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                {displayName}
              </h2>

              <p className="mt-2 flex min-w-0 items-start gap-2 break-all text-sm text-white/80 sm:text-base">
                <Mail size={17} className="mt-0.5 shrink-0" />
                {profile.email || "Email not provided"}
              </p>
            </div>
          </div>

          {/* Account type badge */}
          <div className="flex w-fit shrink-0 items-center gap-2.5 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-black/5 backdrop-blur-xl">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
              <Building2 size={19} />
            </span>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/65">
                Account Type
              </p>
              <p className="mt-0.5">{accountType}</p>
            </div>
          </div>
        </div>

       
      </section>

      {/* Edit profile form */}
      {editing && (
        <form
          onSubmit={handleSave}
          className="rounded-3xl border border-[#eae5ff] bg-white p-5 shadow-sm sm:p-8"
        >
          <div className="mb-7 flex items-start gap-4 border-b border-slate-100 pb-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4e44e1] to-[#9122b4] text-white shadow-md shadow-purple-100">
              <Pencil size={21} />
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-[#29235c]">
                Edit Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Update your details below and save your changes.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">
              Full name
              <input
                name="name"
                required
                value={draft.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={inputClass}
              />
            </label>

            <label className="text-sm font-semibold text-slate-700">
              Mobile number
              <input
                name="phone"
                type="tel"
                required
                value={draft.phone}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className={inputClass}
              />
            </label>

            <label className="text-sm font-semibold text-slate-700">
              Email address
              <input
                name="email"
                type="email"
                required
                value={draft.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={inputClass}
              />
            </label>

            <label className="text-sm font-semibold text-slate-700">
              Account type
              <select
                name="accountType"
                value={draft.accountType}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="doctor">Doctor</option>
                <option value="clinic">Clinic</option>
                <option value="hospital">Hospital</option>
                <option value="diagnostic">Diagnostic Centre</option>
              </select>
            </label>

            <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
              Full address
              <input
                name="address"
                value={draft.address}
                onChange={handleChange}
                placeholder="Street, area, locality"
                className={inputClass}
              />
            </label>

            <label className="text-sm font-semibold text-slate-700">
              City
              <input
                name="city"
                value={draft.city}
                onChange={handleChange}
                placeholder="Enter city"
                className={inputClass}
              />
            </label>

            <label className="text-sm font-semibold text-slate-700">
              State
              <input
                name="state"
                value={draft.state}
                onChange={handleChange}
                placeholder="Enter state"
                className={inputClass}
              />
            </label>

            <label className="text-sm font-semibold text-slate-700">
              PIN code
              <input
                name="pincode"
                inputMode="numeric"
                value={draft.pincode}
                onChange={handleChange}
                placeholder="Enter PIN code"
                className={inputClass}
              />
            </label>
          </div>

          <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={cancelEditing}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              <X size={17} />
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-5 py-3 text-sm font-bold text-white shadow-md shadow-purple-100 transition hover:opacity-90"
            >
              <Check size={17} />
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Personal information cards */}
      {!editing && (
        <section className="rounded-3xl border border-[#eae5ff] bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-extrabold text-[#29235c]">
                Personal Information
              </h2>
              <p className="mt-1.5 text-sm text-slate-500">
                Your registered contact and account details.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-xs font-bold text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Profile Overview
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <DetailItem
              icon={UserRound}
              label="Full Name"
              value={profile.name}
            />

            <DetailItem
              icon={Mail}
              label="Email Address"
              value={profile.email}
            />

            <DetailItem
              icon={Phone}
              label="Mobile Number"
              value={profile.phone}
            />

            <DetailItem
              icon={BriefcaseBusiness}
              label="Account Type"
              value={accountType}
            />

            <DetailItem
              icon={MapPin}
              label="Full Address"
              value={profile.address}
            />

            <DetailItem
              icon={Map}
              label="City"
              value={profile.city}
            />

            <DetailItem
              icon={Building2}
              label="State"
              value={profile.state}
            />

            <DetailItem
              icon={Hash}
              label="PIN Code"
              value={profile.pincode}
            />
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#ece8ff] bg-gradient-to-r from-[#f7f5ff] to-[#fff8ff] p-4 sm:p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#6554e8] shadow-sm">
              <CalendarDays size={19} />
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold text-[#29235c]">
                Keep your profile up to date
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Make sure your contact information is accurate so your
                Doclister account details stay current.
              </p>
            </div>

            <ShieldCheck
              size={21}
              className="mt-1 hidden shrink-0 text-[#6554e8] sm:block"
            />
          </div>
        </section>
      )}
    </div>
  );
}
