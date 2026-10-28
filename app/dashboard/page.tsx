
import Link from "next/link";
import {
  Building2, CheckCircle2, Clock3, Plus, ArrowUpRight,
  UserRound, FileText
} from "lucide-react";

const stats = [
  { label: "Total Listings", value: "0", icon: Building2, color: "text-[#6554e8]", bg: "bg-[#f0edff]" },
  { label: "Published", value: "0", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Pending Review", value: "0", icon: Clock3, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Rejected", value: "0", icon: FileText, color: "text-rose-600", bg: "bg-rose-50" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#29216f] via-[#5143d5] to-[#9122b4] p-6 text-white sm:p-9">
        <p className="text-sm font-medium text-purple-100">YOUR DOCLISTER WORKSPACE</p>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Welcome to your dashboard!</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-purple-100 sm:text-base">
          Manage your profile, add healthcare businesses and keep your listings up to date.
        </p>
        <Link href="/dashboard/listings/add" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#5143d5] transition hover:bg-purple-50">
          <Plus size={19} /> Add New Listing
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-[#29235c]">Listing Overview</h2>
        <p className="mt-1 text-sm text-slate-500">A quick look at your business listings.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="rounded-2xl border border-[#ece8ff] bg-white p-5 shadow-sm">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg} ${color}`}>
                <Icon size={22} />
              </div>
              <p className="mt-5 text-3xl font-extrabold text-[#29235c]">{value}</p>
              <p className="mt-1 text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#ece8ff] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-extrabold text-[#29235c]">Complete your profile</h2>
              <p className="mt-1 text-sm text-slate-500">Add your details to get started.</p>
            </div>
            <UserRound className="text-[#6554e8]" size={26} />
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-[#4e44e1] to-[#9122b4]" />
          </div>
          <p className="mt-2 text-xs text-slate-500">Profile completion will update when connected to your account.</p>
          <Link href="/dashboard/profile" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#6554e8]">
            Update profile <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="rounded-2xl border border-[#ece8ff] bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-[#29235c]">Your Listings</h2>
            <Building2 className="text-[#6554e8]" size={25} />
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            You have no listings displayed yet. Add your practice or healthcare facility to begin.
          </p>
          <Link href="/dashboard/listings" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#6554e8]">
            View all listings <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
