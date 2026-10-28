
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, UserRound, Building2, Stethoscope, FlaskConical } from "lucide-react";

const types = [
  { value: "doctor", label: "Doctor", icon: Stethoscope },
  { value: "clinic", label: "Clinic", icon: Building2 },
  { value: "hospital", label: "Hospital", icon: Building2 },
  { value: "diagnostic", label: "Lab / Diagnostic", icon: FlaskConical },
];

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#6554e8] focus:ring-4 focus:ring-purple-100";

export default function RegisterPage() {
  const router = useRouter();
  const [type, setType] = useState("doctor");
  const [error, setError] = useState("");

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");
    const confirmPassword = String(data.get("confirmPassword") || "");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Static demo registration; no API or database required.
    sessionStorage.setItem("doclister_demo_logged_in", "true");
    sessionStorage.setItem("doclister_demo_email", email);

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#fbfaff] px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-3xl border border-[#ece8ff] bg-white p-6 shadow-xl shadow-purple-100/50 sm:p-10">
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-black">
          <Heart size={30} className="text-[#4e44e1]" />
          Doc<span className="text-[#7b35ca]">lister</span>
        </Link>

        <div className="mt-8">
          <p className="text-sm font-bold uppercase tracking-widest text-[#6554e8]">
            Join Doclister
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-[#29235c]">
            Create your account
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Register to manage your healthcare profile and listings.
          </p>
        </div>

        <form onSubmit={handleRegister} className="mt-8 space-y-6">
          <div>
            <label className="mb-3 block text-sm font-semibold">Account type</label>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {types.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setType(value)}
                  className={`rounded-xl border p-3 text-center transition ${
                    type === value
                      ? "border-[#6554e8] bg-[#f5f2ff] text-[#4e44e1] ring-2 ring-purple-100"
                      : "border-slate-200 text-slate-600 hover:border-purple-300"
                  }`}
                >
                  <Icon className="mx-auto mb-2" size={23} />
                  <span className="text-xs font-semibold">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <input type="hidden" name="accountType" value={type} />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                Full name
              </label>
              <input id="name" name="name" required placeholder="Your full name" className={field} />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold">
                Mobile number
              </label>
              <input id="phone" name="phone" type="tel" required placeholder="+91 98765 43210" className={field} />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                Email address
              </label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" className={field} />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold">
                Password
              </label>
              <input id="password" name="password" type="password" minLength={8} required placeholder="Minimum 8 characters" className={field} />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold">
                Confirm password
              </label>
              <input id="confirmPassword" name="confirmPassword" type="password" minLength={8} required placeholder="Repeat password" className={field} />
            </div>
          </div>

          <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
            <input name="terms" type="checkbox" required className="mt-1 accent-[#6554e8]" />
            <span>
              I agree to the Terms & Conditions and Privacy Policy.
            </span>
          </label>

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] py-4 font-bold text-white shadow-lg shadow-purple-200 hover:opacity-90"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#6554e8] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
