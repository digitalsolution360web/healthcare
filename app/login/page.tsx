
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Static demo login; no API or database required.
    sessionStorage.setItem("doclister_demo_logged_in", "true");
    sessionStorage.setItem("doclister_demo_email", email);

    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fbfaff] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-[#ece8ff] bg-white p-6 shadow-xl shadow-purple-100/60 sm:p-10">
        <Link href="/" className="mb-8 flex items-center gap-2 text-2xl font-extrabold text-black">
          <Heart size={30} className="text-[#4e44e1]" />
          Doc<span className="text-[#7b35ca]">lister</span>
        </Link>

        <p className="text-sm font-bold uppercase tracking-widest text-[#6554e8]">
          Welcome back
        </p>

        <h1 className="mt-2 text-3xl font-extrabold text-[#29235c]">
          Sign in to your account
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Login to manage your profile and healthcare listings.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-[#6554e8] focus:ring-4 focus:ring-purple-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter any password"
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3.5 pr-12 outline-none focus:border-[#6554e8] focus:ring-4 focus:ring-purple-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label="Toggle password visibility"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] py-4 font-bold text-white shadow-lg shadow-purple-200 transition hover:opacity-90"
          >
            Sign In <ArrowRight size={18} />
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-bold text-[#6554e8] hover:underline">
            Create account
          </Link>
        </p>

        <Link href="/" className="mt-6 block text-center text-sm text-slate-400 hover:text-[#6554e8]">
          ← Back to homepage
        </Link>
      </div>
    </main>
  );
}
