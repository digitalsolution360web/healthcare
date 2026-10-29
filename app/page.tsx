"use client";

import Link from "next/link";
import {
  Search,
  MapPin,
  Stethoscope,
  HousePlus,
  Hospital,
  FlaskConical,
  Pill,
  ArrowRight,
  ArrowUpRight,
  Check,
  ShieldCheck,
  ClipboardList,
  Phone,
  MapPinned,
  Clock3,
  UserRound,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

const categories = [
  {
    title: "Doctors",
    description:
      "Explore doctor profiles by speciality, qualifications, experience and location, where these details are available.",
    cta: "Find Doctors",
    href: "/doctors",
    icon: Stethoscope,
  },
  {
    title: "Clinics",
    description:
      "Discover clinics near you and review their listed services, address, timings and contact information.",
    cta: "Find Clinics",
    href: "/clinics",
    icon: HousePlus,
  },
  {
    title: "Hospitals",
    description:
      "Browse hospitals and healthcare facilities to learn about their locations and available services.",
    cta: "Find Hospitals",
    href: "/hospitals",
    icon: Hospital,
  },
  {
    title: "Diagnostic Centres",
    description:
      "Search for diagnostic centres and laboratories in your area and check the information provided in each listing.",
    cta: "Find Diagnostic Centres",
    href: "/lab-tests",
    icon: FlaskConical,
  },
  {
    title: "Pharmacies",
    description:
      "Explore pharmacy listings near your location and check their contact details and opening hours where available.",
    cta: "Find Pharmacies",
    href: "/pharmacies",
    icon: Pill,
  },
];

const specialties = [
  {
    title: "General Physician",
    description: "For routine check-ups and common health concerns.",
    slug: "general-physician",
  },
  {
    title: "Dentist",
    description: "For dental check-ups and oral health services.",
    slug: "dentistry",
  },
  {
    title: "Dermatologist",
    description: "For skin, hair and nail concerns.",
    slug: "dermatology",
  },
  {
    title: "Gynaecologist",
    description: "For women’s reproductive and gynaecological healthcare.",
    slug: "gynecology",
  },
  {
    title: "Paediatrician",
    description: "For babies, children and adolescent healthcare.",
    slug: "pediatrics",
  },
  {
    title: "Cardiologist",
    description: "For heart and cardiovascular healthcare.",
    slug: "cardiology",
  },
  {
    title: "Orthopaedic Doctor",
    description: "For bone, joint and musculoskeletal concerns.",
    slug: "orthopedics",
  },
  {
    title: "Ophthalmologist",
    description: "For eye health and vision care.",
    slug: "ophthalmology",
  },
  {
    title: "Neurologist",
    description:
      "For conditions affecting the brain, spinal cord and nervous system.",
    slug: "neurology",
  },
  {
    title: "Psychologist",
    description: "For psychological support and mental wellbeing.",
    slug: "psychology",
  },
];

const cities = ["Delhi", "Noida", "Gurgaon", "Mumbai", "Bangalore"];

const benefits = [
  {
    title: "Search by Location and Speciality",
    description:
      "Narrow your search using a city, area, speciality or provider name.",
    icon: MapPin,
  },
  {
    title: "Review Provider Details",
    description:
      "Check available information such as qualifications, experience, services, address, timings and contact details.",
    icon: ClipboardList,
  },
  {
    title: "Explore Multiple Provider Types",
    description:
      "Search for doctors, clinics, hospitals, diagnostic centres and pharmacies from one directory.",
    icon: Hospital,
  },
  {
    title: "Contact Providers Directly",
    description:
      "Use the contact details or appointment links displayed in a listing, where available.",
    icon: Phone,
  },
];

const steps = [
  {
    number: "01",
    title: "Search",
    description:
      "Enter a provider name, speciality or healthcare category and your preferred location.",
    icon: Search,
  },
  {
    number: "02",
    title: "Review Listings",
    description:
      "Read the available profile details, services, location and contact information.",
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "Contact the Provider",
    description:
      "Call the provider or use an available appointment or directions link to take the next step.",
    icon: Phone,
  },
];

const faqs = [
  {
    question: "What is DocLister?",
    answer:
      "DocLister is a healthcare directory intended to help people discover doctors, clinics, hospitals, diagnostic centres and pharmacies by category and location.",
  },
  {
    question: "How do I find a doctor near me?",
    answer:
      "Enter your city, area or PIN code and search by doctor name or speciality. Review the available listings and contact the provider for further details.",
  },
  {
    question: "Can I search for a clinic or hospital?",
    answer:
      "Yes. You can use the relevant category or search field to explore clinic and hospital listings, depending on the listings available in your area.",
  },
  {
    question: "Can doctors and clinics list their services on DocLister?",
    answer:
      "Healthcare providers can use the listing submission option if it is enabled on the website. Add accurate information about your practice, location and services.",
  },
  {
    question: "What should I check before choosing a doctor?",
    answer:
      "Review the provider’s listed qualifications, speciality, experience and location. Confirm important details directly with the provider and seek urgent medical help when needed.",
  },
  {
    question: "Can I book an appointment through DocLister?",
    answer:
      "Appointment booking is available only if a booking feature or appointment link is provided on the relevant listing. Otherwise, use the contact details shown to reach the provider.",
  },
  {
    question: "Does DocLister provide online consultations?",
    answer:
      "Online consultations should only be advertised when this feature is available on DocLister. Check the relevant provider listing for supported contact or consultation options.",
  },
  {
    question: "Are all providers verified by DocLister?",
    answer:
      "Check the verification label and its explanation on the provider profile, if available. A directory listing by itself does not guarantee that credentials have been independently verified.",
  },
];

export default function Home() {
  const [provider, setProvider] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [pincodeSuggestions, setPincodeSuggestions] = useState<string[]>([]);
  const [showPincodeSuggestions, setShowPincodeSuggestions] = useState(false);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (provider.trim()) params.set("doctor", provider.trim());
    if (specialty) params.set("specialty", specialty);
    if (location.trim()) params.set("location", location.trim());
    window.location.href = `/doctors?${params.toString()}`;
  };

useEffect(() => {
  const q = location.trim();

  if (q.length < 2 || !/^\d+$/.test(q)) {
    setPincodeSuggestions([]);
    return;
  }

  const timer = setTimeout(async () => {
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(q)}`
      );

      if (!res.ok) return;

      const data = await res.json();

      setPincodeSuggestions(
        data.map((item: { pincode: string | number }) =>
          String(item.pincode)
        )
      );
    } catch (error) {
      console.error("Pincode lookup failed:", error);
    }
  }, 300);

  return () => clearTimeout(timer);
}, [location]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef7ff] font-sans text-black">
      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#4e44e1]/15 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#9122b4]/15 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-[300px] w-[500px] rounded-full bg-[#4e44e1]/5 blur-[120px]" />

        <div className="relative z-10 mx-auto flex max-w-[1330px] flex-col px-5 pb-12 pt-16 sm:px-8 lg:px-6 lg:pt-24">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative z-10 max-w-[620px]">
              <div className="inline-flex min-h-[44px] items-center gap-3 rounded-full border border-[#4e44e1]/20 bg-white/90 px-5 py-2 shadow-[0_8px_30px_rgba(78,68,225,0.08)] backdrop-blur-sm">
                <span className="h-3 w-3 rounded-full bg-gradient-to-r from-[#4e44e1] to-[#9122b4]" />
                <span className="text-sm font-semibold text-black sm:text-base">
                  Healthcare Information, Easier to Explore
                </span>
              </div>

              <h1 className="mt-7 text-[40px] font-extrabold leading-[1.12] tracking-[-1.5px] text-black sm:text-[52px] lg:text-[60px] lg:leading-[1.06]">
                Find Doctors, Clinics and{" "}
                <span className="bg-gradient-to-r from-[#4e44e1] via-[#6f35d2] to-[#9122b4] bg-clip-text text-transparent">
                  Hospitals Near You
                </span>
              </h1>

              <p className="mt-6 max-w-[580px] text-base leading-7 text-[#536078] sm:text-lg sm:leading-8">
                Looking for a doctor or healthcare facility? DocLister helps
                you explore doctors, clinics, hospitals and diagnostic centres
                by speciality and location. Compare the available profile
                information and contact a provider to learn more about their
                services.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                {["Search by Speciality", "Explore by Location"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#4e44e1] to-[#9122b4] text-white shadow-md">
                      <Check size={19} strokeWidth={3} />
                    </span>
                    <span className="text-sm font-semibold text-black sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/doctors"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-6 py-3 text-base font-semibold text-white shadow-[0_10px_25px_rgba(78,68,225,0.20)] transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#4e44e1]/20"
                >
                  Find a Doctor <ArrowUpRight size={19} />
                </Link>
                <Link
                  href="/list-your-practice"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-[#4e44e1]/20 bg-white px-6 py-3 text-base font-semibold text-[#4e44e1] transition hover:border-[#9122b4] hover:bg-[#f8f6ff] focus:outline-none focus:ring-4 focus:ring-[#4e44e1]/10"
                >
                  List Your Practice <ArrowUpRight size={19} />
                </Link>
              </div>
            </div>

            <div className="relative mx-auto mt-2 h-[300px] w-full max-w-[560px] sm:h-[410px] lg:mt-0 lg:h-[455px]">
              <div className="absolute -inset-[1px] overflow-hidden rounded-[24px] bg-gradient-to-br from-[#4e44e1] to-[#9122b4] p-[2px] shadow-[0_25px_70px_rgba(78,68,225,0.18)]">
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[22px] bg-[#f4f2ff]">
                  <img
                    src="/home.webp"
                    alt="Doctor consulting a patient in a healthcare clinic"
                    className="h-full w-full object-contain object-center"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#4e44e1]/10 via-transparent to-[#9122b4]/20" />
                </div>
              </div>
              <div className="absolute bottom-5 left-3 z-10 flex items-center gap-3 rounded-2xl border border-[#e7e4f8] bg-white/95 px-4 py-3 shadow-[0_12px_35px_rgba(78,68,225,0.14)] backdrop-blur-md sm:bottom-7 sm:left-5 sm:gap-4 sm:px-5 sm:py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4e44e1] to-[#9122b4] sm:h-12 sm:w-12">
                  <ShieldCheck size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-base font-semibold leading-6 text-black sm:text-lg">
                    Your Healthcare Directory
                  </h2>
                  <p className="text-xs leading-5 text-[#536078] sm:text-sm">
                    Doctors, Clinics & Healthcare Facilities
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div id="healthcare-search" className="relative z-20 mt-10 w-full lg:mt-12">
            <form
              onSubmit={handleSearch}
              role="search"
              aria-label="Search healthcare providers"
              className="grid grid-cols-1 gap-2 rounded-2xl border border-[#e3def3] bg-white p-3 shadow-[0_18px_50px_rgba(78,68,225,0.12)] sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_190px] lg:items-center lg:gap-0 lg:p-2.5"
            >
              <div className="flex h-[62px] min-w-0 items-center gap-3 border-b border-[#ece8f5] px-3 sm:border-r sm:border-b-0 lg:px-4">
                <MapPin size={21} className="shrink-0 text-[#4e44e1]" aria-hidden="true" />
                <div className="relative min-w-0 flex-1">
  <label
    htmlFor="location-search"
    className="mb-0.5 block text-xs font-semibold text-[#536078]"
  >
    Location
  </label>

  <input
    id="location-search"
    type="text"
    value={location}
    onChange={(e) => {
      setLocation(e.target.value);
      setShowPincodeSuggestions(true);
    }}
    onFocus={() => setShowPincodeSuggestions(true)}
    onBlur={() =>
      setTimeout(() => setShowPincodeSuggestions(false), 150)
    }
    placeholder="Enter city, area or PIN code"
    autoComplete="off"
    className="h-7 w-full min-w-0 bg-transparent text-sm text-black outline-none placeholder:text-[#9298a8] sm:text-base"
  />

  {showPincodeSuggestions && pincodeSuggestions.length > 0 && (
    <div className="absolute left-0 top-full z-50 mt-2 max-h-60 w-full min-w-48 overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
      {pincodeSuggestions.map((pincode) => (
        <button
          key={pincode}
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            setLocation(pincode);
            setShowPincodeSuggestions(false);
            setPincodeSuggestions([]);
          }}
          className="block w-full px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
        >
         
          {pincode}
        </button>
      ))}
    </div>
  )}
</div>
              </div>

              <div className="flex h-[62px] min-w-0 items-center gap-3 border-b border-[#ece8f5] px-3 sm:border-b-0 lg:border-r lg:px-4">
                <Search size={21} className="shrink-0 text-[#9122b4]" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <label htmlFor="provider-search" className="mb-0.5 block text-xs font-semibold text-[#536078]">
                    Provider or Service
                  </label>
                  <input
                    id="provider-search"
                    type="text"
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    placeholder="Doctor, clinic or hospital"
                    autoComplete="off"
                    className="h-7 w-full min-w-0 bg-transparent text-sm text-black outline-none placeholder:text-[#9298a8] sm:text-base"
                  />
                </div>
              </div>

              <div className="flex h-[62px] min-w-0 items-center gap-3 px-3 lg:px-4">
                <Stethoscope size={21} className="shrink-0 text-[#4e44e1]" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <label htmlFor="specialty-search" className="mb-0.5 block text-xs font-semibold text-[#536078]">
                    Medical Speciality
                  </label>
                  <select
                    id="specialty-search"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="h-7 w-full min-w-0 cursor-pointer bg-transparent text-sm text-black outline-none sm:text-base"
                  >
                    <option value="">All Specialities</option>
                    {specialties.map((item) => (
                      <option key={item.slug} value={item.slug}>{item.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="flex h-[58px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-5 text-base font-semibold text-white shadow-[0_10px_25px_rgba(78,68,225,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(145,34,180,0.28)] focus:outline-none focus:ring-4 focus:ring-[#4e44e1]/20 lg:h-[62px]"
              >
                <Search size={20} strokeWidth={2.5} />
                Search 
              </button>
            </form>
            <p className="mt-3 text-center text-xs leading-5 text-[#6b7280] sm:text-sm">
              Popular searches: General Physician | Dentist | Dermatologist | Gynaecologist | Paediatrician
            </p>
          </div>
        </div>
      </section>

      {/* HEALTHCARE CATEGORIES */}
      <section className="relative z-20 w-full bg-white px-5 py-14 sm:px-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[2.5px] text-[#6d35d2] sm:text-sm">Explore Healthcare Services</p>
            <h2 className="text-3xl font-extrabold tracking-[-1px] text-black sm:text-4xl">Explore Healthcare Categories</h2>
            <p className="mt-4 text-base leading-7 text-[#536078] sm:text-lg">
              Find the type of healthcare provider you are looking for. Start with a category below, then narrow your search by speciality or location.
            </p>
          </div>
          <div className="grid grid-cols-1  gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="group  relative flex min-h-[250px] flex-col overflow-hidden rounded-2xl border border-[#e9e5f3] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#c7c0ee] hover:shadow-[0_12px_32px_rgba(78,68,225,0.11)]">
                  <span className="absolute left-0 top-0 h-full w-[3px] origin-center scale-y-0 bg-gradient-to-b from-[#4e44e1] to-[#9122b4] transition-transform duration-300 group-hover:scale-y-100" />
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f1efff] text-[#4e44e1]">
                    <Icon size={27} />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-black">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[#71809a]">{item.description}</p>
                  <Link href={item.href} className="mt-5 inline-flex items-center gap-2 font-semibold text-[#4e44e1] hover:text-[#9122b4]">
                    {item.cta} <ArrowRight size={18} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SPECIALITIES */}
      <section id="medical-specialties" className="relative w-full overflow-hidden bg-[#faf9fd] px-5 py-14 sm:px-8 sm:py-16 lg:px-6 lg:py-20">
        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#4e44e1]/5 blur-[100px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#9122b4]/5 blur-[110px]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[2.5px] text-[#6d35d2] sm:text-sm">Find Your Specialist</p>
            <h2 className="text-3xl font-extrabold leading-tight tracking-[-1px] text-black sm:text-4xl lg:text-[46px]">Search by Medical Speciality</h2>
            <p className="mt-4 text-base leading-7 text-[#536078] sm:text-lg sm:leading-8">
              Not sure where to start? Browse common medical specialities to find healthcare providers that match your needs. If you are unsure which specialist to see, consider speaking with a qualified general physician.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {specialties.map((item) => (
              <Link key={item.slug} href={`/specialties/${item.slug}`} className="group flex min-h-[190px] flex-col rounded-2xl border border-[#e4e0f2] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9c3eb] hover:shadow-[0_12px_30px_rgba(78,68,225,0.11)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f1efff] text-[#4e44e1]"><Stethoscope size={22} /></div>
                <h3 className="mt-4 text-lg font-bold text-black group-hover:text-[#6d35d2]">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-[#68748b]">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#4e44e1]">Explore speciality <ArrowRight size={16} /></span>
              </Link>
            ))}
          </div>
          <p className="mt-7 text-center text-sm leading-6 text-[#68748b]">
            Browse available listings and confirm provider details directly before making healthcare decisions.
          </p>
          <div className="mt-8 text-center">
            <Link href="/specialties" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-6 py-3 text-base font-semibold text-white shadow-[0_10px_25px_rgba(78,68,225,0.20)] transition hover:-translate-y-0.5 hover:shadow-lg">
              Browse All Specialities <ArrowRight size={19} />
            </Link>
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section className="bg-white px-5 py-14 sm:px-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[2.5px] text-[#6d35d2] sm:text-sm">Explore by Location</p>
            <h2 className="text-3xl font-extrabold tracking-[-1px] text-black sm:text-4xl">Find Healthcare Providers in Your City</h2>
            <p className="mt-4 text-base leading-7 text-[#536078] sm:text-lg">
              Search for doctors, clinics and hospitals in your city or nearby area. Choose a location to explore relevant listings and available provider information.
            </p>
          </div>
          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {cities.map((city) => (
              <Link key={city} href={`/doctors?location=${encodeURIComponent(city)}`} className="group flex items-center gap-3 rounded-xl border border-[#e4e0f2] bg-[#faf9fd] p-5 transition hover:-translate-y-1 hover:border-[#c9c3eb] hover:bg-white hover:shadow-[0_12px_30px_rgba(78,68,225,0.10)]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f1efff] text-[#4e44e1]"><MapPinned size={22} /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-[#71809a]">Healthcare Providers in</span>
                  <span className="mt-1 block font-bold text-black group-hover:text-[#6d35d2]">{city}</span>
                </span>
                <ArrowUpRight size={17} className="text-[#4e44e1]" />
              </Link>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-[#71809a]">
            City links should lead to useful, accurate listings for that location. Available results may vary by area.
          </p>
        </div>
      </section>

      {/* WHY DOCLISTER */}
      <section className="bg-[#faf9fd] px-5 py-14 sm:px-8 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[2.5px] text-[#6d35d2] sm:text-sm">Why Use DocLister?</p>
            <h2 className="text-3xl font-extrabold tracking-[-1px] text-black sm:text-4xl">Healthcare Information, Easier to Explore</h2>
            <p className="mt-4 text-base leading-7 text-[#536078] sm:text-lg">
              DocLister is designed to make healthcare discovery simpler by helping people explore provider listings in one place. The information shown depends on each listing and the features available on the platform.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-[#e4e0f2] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(78,68,225,0.09)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1efff] text-[#4e44e1]"><Icon size={24} /></div>
                  <h3 className="mt-5 text-lg font-bold text-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#68748b]">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LIST YOUR PRACTICE */}
      <section className="bg-white px-5 py-14 sm:px-8 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#4e44e1] to-[#9122b4] p-[1px] shadow-[0_20px_60px_rgba(78,68,225,0.16)]">
            <div className="rounded-[25px] bg-white px-6 py-9 sm:px-10 sm:py-12 lg:px-14">
              <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[2.5px] text-[#6d35d2] sm:text-sm">For Doctors, Clinics and Healthcare Providers</p>
                  <h2 className="text-3xl font-extrabold tracking-[-1px] text-black sm:text-4xl">List Your Practice on DocLister</h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-[#536078] sm:text-lg">
                    Help people find information about your healthcare practice online. Create a listing for your clinic, hospital, diagnostic centre or pharmacy and provide clear, up-to-date details about your services.
                  </p>
                  <h3 className="mt-6 text-lg font-bold text-black">A useful listing may include:</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      "Provider or facility name",
                      "Medical speciality and professional qualifications",
                      "Experience and services offered",
                      "Full address and map location",
                      "Opening hours and consultation fees, where applicable",
                      "Phone number and WhatsApp contact, if supported",
                      "Facility photos and other relevant details",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm leading-6 text-[#536078]">
                        <Check size={18} className="mt-1 shrink-0 text-[#4e44e1]" />{item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm leading-6 text-[#68748b]">
                    Keep your listing accurate and updated so people can make informed decisions about contacting your practice.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#e4e0f2] bg-[#faf9fd] p-6 sm:p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4e44e1] to-[#9122b4] text-white"><UserRound size={28} /></div>
                  <h3 className="mt-5 text-xl font-bold text-black">Add Your Listing</h3>
                  <p className="mt-2 text-sm leading-6 text-[#68748b]">
                    Share clear and accurate information about your practice, location and services.
                  </p>
                  <Link href="/list-your-practice" className="mt-6 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg">
                    Add Your Listing <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#faf9fd] px-5 py-14 sm:px-8 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[2.5px] text-[#6d35d2] sm:text-sm">How It Works</p>
            <h2 className="text-3xl font-extrabold tracking-[-1px] text-black sm:text-4xl">Find a Healthcare Provider in Three Steps</h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative rounded-2xl border border-[#e4e0f2] bg-white p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-[#ded9fb]">{step.number}</span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1efff] text-[#4e44e1]"><Icon size={24} /></span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-black">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#68748b]">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-5 py-14 sm:px-8 lg:px-6 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[2.5px] text-[#6d35d2] sm:text-sm">Frequently Asked Questions</p>
            <h2 className="text-3xl font-extrabold tracking-[-1px] text-black sm:text-4xl">Questions About Finding Healthcare Providers</h2>
            <p className="mt-4 text-base leading-7 text-[#536078]">
              Learn how to explore listings, review provider information and contact healthcare practices through DocLister.
            </p>
            <Link href="/doctors" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#4e44e1] hover:text-[#9122b4]">
              Find a Doctor <ArrowRight size={18} />
            </Link>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="overflow-hidden rounded-xl border border-[#e4e0f2] bg-[#faf9fd]">
                <button
                  type="button"
                  aria-expanded={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-semibold text-black">{faq.question}</span>
                  <ChevronDown size={19} className={`shrink-0 text-[#4e44e1] transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                {openFaq === index && (
                  <p className="px-5 pb-5 text-sm leading-7 text-[#536078]">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-white px-5 pb-14 sm:px-8 lg:px-6 lg:pb-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[26px] bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-6 py-10 text-center shadow-[0_20px_60px_rgba(78,68,225,0.20)] sm:px-10 sm:py-14">
          <h2 className="text-3xl font-extrabold tracking-[-1px] text-white sm:text-4xl">Start Your Healthcare Search with DocLister</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-white/90 sm:text-lg">
            Explore healthcare providers by speciality and location. Review available details, find a nearby facility and contact the provider to ask questions or arrange a visit.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/doctors" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#4e44e1] transition hover:-translate-y-0.5 hover:shadow-lg">
              Find a Doctor <ArrowRight size={18} />
            </Link>
            <Link href="/list-your-practice" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/50 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20">
              Add Your Listing <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
