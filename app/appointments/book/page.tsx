"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Search,
  CalendarDays,
  Clock3,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  UserRound,
  CreditCard,
  MapPin,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Building2,
  Stethoscope,
} from "lucide-react";

type AppointmentEntity = {
  name: string;
  specialty: string;
  qualification: string;
  image: string;
  location: string;
  fee: number;
  type: "doctor" | "clinic";
};

const doctors: Record<string, AppointmentEntity> = {
  "dr-priya-sharma": {
    name: "Dr. Priya Sharma",
    specialty: "Gynecology",
    qualification: "MBBS, MD (Gynecology)",
    image: "/images/doctors/dr-priya-sharma.jpg",
    location: "Noida, Sector 18",
    fee: 700,
    type: "doctor",
  },

  "dr-rahul-mehta": {
    name: "Dr. Rahul Mehta",
    specialty: "Dermatology",
    qualification: "MBBS, MD (Dermatology)",
    image: "/images/doctors/dr-rahul-mehta.jpg",
    location: "Noida, Sector 62",
    fee: 600,
    type: "doctor",
  },

  "dr-neha-gupta": {
    name: "Dr. Neha Gupta",
    specialty: "Cardiology",
    qualification: "MBBS, DM (Cardiology)",
    image: "/images/doctors/dr-neha-gupta.jpg",
    location: "Delhi",
    fee: 900,
    type: "doctor",
  },

  "dr-amit-verma": {
    name: "Dr. Amit Verma",
    specialty: "Orthopedics",
    qualification: "MBBS, MS (Orthopedics)",
    image: "/images/doctors/dr-amit-verma.jpg",
    location: "Noida, Sector 18",
    fee: 800,
    type: "doctor",
  },

  "dr-anjali-singh": {
    name: "Dr. Anjali Singh",
    specialty: "Pediatrics",
    qualification: "MBBS, MD (Pediatrics)",
    image: "/images/doctors/dr-anjali-singh.jpg",
    location: "Gurugram",
    fee: 500,
    type: "doctor",
  },

  "dr-karan-malhotra": {
    name: "Dr. Karan Malhotra",
    specialty: "Dentistry",
    qualification: "BDS, MDS",
    image: "/images/doctors/dr-karan-malhotra.jpg",
    location: "Mumbai",
    fee: 400,
    type: "doctor",
  },
};

/* Add your actual clinic data here */
/* =====================================
   CLINIC DATA
   Slugs must match the Clinics listing page
===================================== */

const clinics: Record<string, AppointmentEntity> = {
  "smile-dental-clinic": {
    name: "Smile Dental Clinic",
    specialty: "Dental",
    qualification: "Complete Dental Care",
    image: "/images/clinics/smile-dental-clinic.jpg",
    location: "Noida, Sector 18",
    fee: 500,
    type: "clinic",
  },

  "skin-care-clinic": {
    name: "Skin Care Clinic",
    specialty: "Skin & Hair",
    qualification: "Dermatology & Aesthetics",
    image: "/images/clinics/skin-care-clinic.jpg",
    location: "Noida, Sector 62",
    fee: 600,
    type: "clinic",
  },

  "life-care-physiotherapy": {
    name: "Life Care Physiotherapy",
    specialty: "Physiotherapy",
    qualification: "Physiotherapy & Rehabilitation",
    image: "/images/clinics/life-care-physiotherapy.jpg",
    location: "Delhi",
    fee: 500,
    type: "clinic",
  },

  "apollo-clinic": {
    name: "Apollo Clinic",
    specialty: "General Physician",
    qualification: "General Medical Services",
    image: "/images/clinics/apollo-clinic.jpg",
    location: "Gurugram",
    fee: 700,
    type: "clinic",
  },

  "city-ent-clinic": {
    name: "City ENT Clinic",
    specialty: "ENT",
    qualification: "Ear, Nose & Throat Care",
    image: "/images/clinics/city-ent-clinic.jpg",
    location: "Noida, Sector 18",
    fee: 500,
    type: "clinic",
  },

  "family-health-clinic": {
    name: "Family Health Clinic",
    specialty: "Pediatrics",
    qualification: "Family & Child Healthcare",
    image: "/images/clinics/family-health-clinic.jpg",
    location: "Mumbai",
    fee: 500,
    type: "clinic",
  },

  "heart-care-clinic": {
    name: "Heart Care Clinic",
    specialty: "Cardiology",
    qualification: "Cardiac Consultation & Care",
    image: "/images/clinics/heart-care-clinic.jpg",
    location: "Delhi",
    fee: 900,
    type: "clinic",
  },

  "ortho-plus-clinic": {
    name: "Ortho Plus Clinic",
    specialty: "Orthopedics",
    qualification: "Bone, Joint & Spine Care",
    image: "/images/clinics/ortho-plus-clinic.jpg",
    location: "Noida, Sector 62",
    fee: 800,
    type: "clinic",
  },

  "acharjee-health-clinic": {
    name: "Acharjee Health Clinic & Pharmacy",
    specialty: "Multispecialty Clinic",
    qualification: "Healthcare & Consultation",
    image: "/images/clinics/acharjee-clinic.jpg",
    location: "Guwahati",
    fee: 500,
    type: "clinic",
  },
};

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
];

type DateOption = {
  date: Date;
  label: string;
  day: string;
};

export default function AppointmentBookingPage() {
  const [entity, setEntity] = useState<AppointmentEntity | null>(null);
  const [entitySlug, setEntitySlug] = useState("");
  const [dates, setDates] = useState<DateOption[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [step, setStep] = useState(1);

  const [patient, setPatient] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    reason: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("online");
  const [bookingComplete, setBookingComplete] = useState(false);

  /* =====================================
     LOAD DOCTOR OR CLINIC FROM URL
  ===================================== */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const doctorSlug = params.get("doctor");
    const clinicSlug = params.get("clinic");

    if (doctorSlug && doctors[doctorSlug]) {
      setEntity(doctors[doctorSlug]);
      setEntitySlug(doctorSlug);
    } else if (clinicSlug && clinics[clinicSlug]) {
      setEntity(clinics[clinicSlug]);
      setEntitySlug(clinicSlug);
    }

    const today = new Date();

    const upcomingDates = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index);

      return {
        date,
        label: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        day:
          index === 0
            ? "Today"
            : index === 1
            ? "Tomorrow"
            : date.toLocaleDateString("en-US", {
                weekday: "short",
              }),
      };
    });

    setDates(upcomingDates);
    setSelectedDate(upcomingDates[0].date.toDateString());
  }, []);

  const formattedDate = dates.find(
    (item) => item.date.toDateString() === selectedDate
  );

  const updatePatient = (
    field: keyof typeof patient,
    value: string
  ) => {
    setPatient((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!selectedDate || !selectedTime) {
        alert("Please select an appointment date and time.");
        return;
      }

      setStep(2);
      return;
    }

    if (step === 2) {
      if (
        !patient.name.trim() ||
        !patient.phone.trim() ||
        !patient.email.trim()
      ) {
        alert("Please fill in your name, phone number and email.");
        return;
      }

      if (!/^[0-9]{10}$/.test(patient.phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }

      setStep(3);
    }
  };

  const handleBooking = () => {
    /*
      Connect your booking API and payment gateway here.
      This demo displays a confirmation only.
    */

    setBookingComplete(true);
  };

  /* =====================================
     INVALID URL
  ===================================== */

  if (!entity) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-white px-5 text-black">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf4ff] text-[#0878d1]">
            <CalendarDays size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-black">
            Appointment Booking
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#53677f]">
            Please select a doctor or clinic to book your appointment.
          </p>

          <Link
            href="/doctors"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[#0878d1] px-6 text-sm font-semibold text-white hover:bg-[#0667b5]"
          >
            Find Doctors
          </Link>

          <Link
            href="/clinics"
            className="ml-3 inline-flex h-11 items-center justify-center rounded-lg border border-[#cbd8e8] px-6 text-sm font-semibold text-black hover:bg-[#f8fafc]"
          >
            Find Clinics
          </Link>
        </div>
      </main>
    );
  }

  /* =====================================
     BOOKING CONFIRMATION
  ===================================== */

  if (bookingComplete) {
    return (
      <main className="min-h-screen bg-[#f5f9fd] px-5 py-16 text-black">
        <div className="mx-auto max-w-xl rounded-2xl border border-[#dce6f2] bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f9f0] text-[#15945b]">
            <CheckCircle2 size={42} />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-black sm:text-3xl">
            Appointment Request Submitted!
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#53677f]">
            Your appointment request for {entity.name} has been
            submitted. Please wait for confirmation.
          </p>

          <div className="mt-7 rounded-xl border border-[#dce6f2] bg-[#f8fafc] p-5 text-left">
            <p className="text-xs font-medium text-[#71839c]">
              Appointment with
            </p>

            <h2 className="mt-1 font-bold text-black">
              {entity.name}
            </h2>

            <div className="mt-4 space-y-3 text-sm text-[#344f6a]">
              <p className="flex items-center gap-2">
                <CalendarDays size={17} />
                {formattedDate?.label || selectedDate}
              </p>

              <p className="flex items-center gap-2">
                <Clock3 size={17} />
                {selectedTime}
              </p>

              <p className="flex items-center gap-2">
                <CreditCard size={17} />
                Consultation fee: ₹{entity.fee}
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#0878d1] text-sm font-semibold text-white hover:bg-[#0667b5]"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <section className="border-b border-[#dce6f2] bg-gradient-to-r from-[#eaf5ff] via-[#f7fbff] to-[#eaf5ff] px-5 py-8 sm:px-8 lg:px-[5.25%]">
        <div className="mx-auto max-w-7xl">

          <div className="mb-5 flex items-center gap-2 text-sm">
            <Link href="/" className="text-black hover:text-[#0878d1]">
              Home
            </Link>

            <span className="text-[#94a3b8]">/</span>

            <Link
              href={entity.type === "doctor" ? "/doctors" : "/clinics"}
              className="text-black hover:text-[#0878d1]"
            >
              {entity.type === "doctor" ? "Doctors" : "Clinics"}
            </Link>

            <span className="text-[#94a3b8]">/</span>

            <span className="font-medium text-black">
              Book Appointment
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
            Book Appointment
          </h1>

          <p className="mt-2 text-sm text-[#53677f] sm:text-base">
            Select your preferred date, time and complete your booking.
          </p>
        </div>
      </section>

      {/* =====================================
          BOOKING CONTENT
      ===================================== */}

      <section className="px-5 py-8 sm:px-8 lg:px-[5.25%] lg:py-10">
        <div className="mx-auto max-w-7xl">

          {/* DOCTOR / CLINIC INFORMATION */}

          <div className="mb-7 flex flex-col gap-4 rounded-xl border border-[#dce6f2] bg-white p-4 shadow-[0_2px_10px_rgba(24,59,96,0.03)] sm:flex-row sm:items-center sm:p-5">

            <div className="relative h-[90px] w-[90px] shrink-0 overflow-hidden rounded-xl border border-[#e2e8f0] bg-[#f1f5f9]">
              <Image
                src={entity.image}
                alt={entity.name}
                fill
                sizes="90px"
                className="object-cover object-top"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-black sm:text-xl">
                  {entity.name}
                </h2>

                <CheckCircle2
                  size={17}
                  className="text-[#0878d1]"
                  fill="#eaf4ff"
                />
              </div>

              <p className="mt-1 text-sm font-medium text-[#0878d1]">
                {entity.specialty}
              </p>

              <p className="mt-1 text-sm text-[#53677f]">
                {entity.qualification}
              </p>

              <p className="mt-2 flex items-center gap-1.5 text-sm text-[#53677f]">
                <MapPin size={15} />
                {entity.location}
              </p>
            </div>

            <div className="border-t border-[#e8eef5] pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
              <p className="text-xs text-[#71839c]">
                Consultation Fee
              </p>

              <p className="mt-1 text-2xl font-bold text-black">
                ₹{entity.fee}
              </p>
            </div>
          </div>

          {/* =====================================
              STEP INDICATOR
          ===================================== */}

          <div className="mb-7 grid grid-cols-3 overflow-hidden rounded-xl border border-[#dce6f2] bg-white">

            {[
              { id: 1, title: "Date & Time", icon: CalendarDays },
              { id: 2, title: "Patient Details", icon: UserRound },
              { id: 3, title: "Payment", icon: CreditCard },
            ].map((item) => {
              const Icon = item.icon;
              const active = step === item.id;
              const completed = step > item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={step < item.id}
                  onClick={() => {
                    if (item.id < step) setStep(item.id);
                  }}
                  className={`flex min-h-[66px] items-center justify-center gap-2 border-r border-[#dce6f2] px-2 text-xs font-semibold transition last:border-r-0 sm:text-sm ${
                    active
                      ? "bg-[#eaf4ff] text-black"
                      : completed
                      ? "bg-white text-[#0878d1]"
                      : "bg-white text-[#71839c]"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      active
                        ? "bg-[#0878d1] text-white"
                        : completed
                        ? "bg-[#e1f5eb] text-[#168653]"
                        : "bg-[#f1f5f9] text-[#53677f]"
                    }`}
                  >
                    {completed ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <Icon size={15} />
                    )}
                  </span>

                  <span className="hidden sm:inline">
                    {item.id}. {item.title}
                  </span>

                  <span className="sm:hidden">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* =====================================
              STEP 1: DATE & TIME
          ===================================== */}

          {step === 1 && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

              {/* DATE SELECTION */}

              <div className="rounded-xl border border-[#dce6f2] bg-white p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-black">
                      Select Date
                    </h2>

                    <p className="mt-1 text-sm text-[#71839c]">
                      Choose your preferred day
                    </p>
                  </div>

                  <CalendarDays
                    size={21}
                    className="text-[#0878d1]"
                  />
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {dates.map((item) => {
                    const active =
                      selectedDate === item.date.toDateString();

                    return (
                      <button
                        key={item.date.toISOString()}
                        type="button"
                        onClick={() => setSelectedDate(item.date.toDateString())}
                        className={`flex min-h-[92px] flex-col items-center justify-center rounded-lg border px-2 transition ${
                          active
                            ? "border-[#0878d1] bg-[#eaf4ff] ring-1 ring-[#0878d1]"
                            : "border-[#dce6f2] bg-white hover:border-[#87b9ed]"
                        }`}
                      >
                        <span className="text-xs font-medium text-[#53677f]">
                          {item.day}
                        </span>

                        <span className="mt-2 text-base font-bold text-black">
                          {item.date.getDate()}
                        </span>

                        <span className="mt-0.5 text-xs text-[#53677f]">
                          {item.date.toLocaleDateString("en-US", {
                            month: "short",
                          })}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-start gap-2 rounded-lg bg-[#f8fafc] p-3 text-xs leading-5 text-[#53677f]">
                  <ShieldCheck
                    size={17}
                    className="mt-0.5 shrink-0 text-[#0878d1]"
                  />

                  Select a date to see the available appointment times.
                </div>
              </div>

              {/* TIME SELECTION */}

              <div className="rounded-xl border border-[#dce6f2] bg-white p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-black">
                      Available Slots
                    </h2>

                    <p className="mt-1 text-sm text-[#71839c]">
                      {formattedDate
                        ? `${formattedDate.day}, ${formattedDate.label}`
                        : "Select a date"}
                    </p>
                  </div>

                  <Clock3
                    size={21}
                    className="text-[#0878d1]"
                  />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {timeSlots.map((time) => {
                    const active = selectedTime === time;

                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`flex h-12 items-center justify-center rounded-lg border text-sm font-medium transition ${
                          active
                            ? "border-[#0878d1] bg-[#eaf4ff] text-black ring-1 ring-[#0878d1]"
                            : "border-[#dce6f2] bg-white text-black hover:border-[#87b9ed]"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-lg border border-[#dce6f2] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-[#53677f]">
                      Consultation Fee
                    </span>

                    <span className="text-lg font-bold text-black">
                      ₹{entity.fee}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-sm text-[#53677f]">
                      Selected Time
                    </span>

                    <span className="text-sm font-semibold text-black">
                      {selectedTime || "Not selected"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================
              STEP 2: PATIENT DETAILS
          ===================================== */}

          {step === 2 && (
            <div className="rounded-xl border border-[#dce6f2] bg-white p-5 sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-black">
                  Patient Details
                </h2>

                <p className="mt-2 text-sm text-[#53677f]">
                  Enter the details of the person attending the appointment.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2"
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold text-black">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    required
                    value={patient.name}
                    onChange={(e) =>
                      updatePatient("name", e.target.value)
                    }
                    placeholder="Enter full name"
                    className="h-12 w-full rounded-lg border border-[#cbd8e8] bg-white px-4 text-sm text-black outline-none placeholder:text-[#94a3b8] focus:border-[#0878d1] focus:ring-2 focus:ring-[#0878d1]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-black">
                    Phone Number *
                  </label>

                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={patient.phone}
                    onChange={(e) =>
                      updatePatient(
                        "phone",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    placeholder="10-digit mobile number"
                    className="h-12 w-full rounded-lg border border-[#cbd8e8] bg-white px-4 text-sm text-black outline-none placeholder:text-[#94a3b8] focus:border-[#0878d1] focus:ring-2 focus:ring-[#0878d1]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-black">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    required
                    value={patient.email}
                    onChange={(e) =>
                      updatePatient("email", e.target.value)
                    }
                    placeholder="Enter email address"
                    className="h-12 w-full rounded-lg border border-[#cbd8e8] bg-white px-4 text-sm text-black outline-none placeholder:text-[#94a3b8] focus:border-[#0878d1] focus:ring-2 focus:ring-[#0878d1]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-black">
                    Age
                  </label>

                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={patient.age}
                    onChange={(e) =>
                      updatePatient("age", e.target.value)
                    }
                    placeholder="Enter age"
                    className="h-12 w-full rounded-lg border border-[#cbd8e8] bg-white px-4 text-sm text-black outline-none placeholder:text-[#94a3b8] focus:border-[#0878d1] focus:ring-2 focus:ring-[#0878d1]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-black">
                    Gender
                  </label>

                  <select
                    value={patient.gender}
                    onChange={(e) =>
                      updatePatient("gender", e.target.value)
                    }
                    className="h-12 w-full rounded-lg border border-[#cbd8e8] bg-white px-4 text-sm text-black outline-none focus:border-[#0878d1]"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">
                      Prefer not to say
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-black">
                    Reason for Visit
                  </label>

                  <input
                    type="text"
                    value={patient.reason}
                    onChange={(e) =>
                      updatePatient("reason", e.target.value)
                    }
                    placeholder="Brief reason for appointment"
                    className="h-12 w-full rounded-lg border border-[#cbd8e8] bg-white px-4 text-sm text-black outline-none placeholder:text-[#94a3b8] focus:border-[#0878d1]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <div className="rounded-lg bg-[#f8fafc] p-4 text-sm text-[#53677f]">
                    <p className="font-semibold text-black">
                      Appointment Summary
                    </p>

                    <p className="mt-2">
                      {entity.name} · {formattedDate?.label} ·{" "}
                      {selectedTime}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#cbd8e8] px-6 text-sm font-semibold text-black hover:bg-[#f8fafc]"
                  >
                    <ChevronLeft size={17} />
                    Back
                  </button>

                  <button
                    type="submit"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0878d1] px-8 text-sm font-semibold text-white hover:bg-[#0667b5]"
                  >
                    Continue to Payment
                    <ArrowRight size={17} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* =====================================
              STEP 3: PAYMENT
          ===================================== */}

          {step === 3 && (
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_350px]">

              <div className="rounded-xl border border-[#dce6f2] bg-white p-5 sm:p-7">
                <h2 className="text-xl font-bold text-black">
                  Payment Method
                </h2>

                <p className="mt-2 text-sm text-[#53677f]">
                  Choose how you would like to pay.
                </p>

                <div className="mt-6 space-y-3">

                  <label
                    className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 ${
                      paymentMethod === "online"
                        ? "border-[#0878d1] bg-[#f2f8ff]"
                        : "border-[#dce6f2]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value)
                      }
                      className="mt-1 accent-[#0878d1]"
                    />

                    <CreditCard
                      size={21}
                      className="text-[#0878d1]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-black">
                        Pay Online
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#53677f]">
                        UPI, debit card, credit card or net banking.
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 ${
                      paymentMethod === "clinic"
                        ? "border-[#0878d1] bg-[#f2f8ff]"
                        : "border-[#dce6f2]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="clinic"
                      checked={paymentMethod === "clinic"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value)
                      }
                      className="mt-1 accent-[#0878d1]"
                    />

                    <Building2
                      size={21}
                      className="text-[#0878d1]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-black">
                        Pay at {entity.type === "clinic" ? "Clinic" : "Hospital"}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#53677f]">
                        Pay the consultation fee when you arrive.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#cbd8e8] px-6 text-sm font-semibold text-black hover:bg-[#f8fafc]"
                  >
                    <ChevronLeft size={17} />
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleBooking}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0878d1] px-7 text-sm font-semibold text-white hover:bg-[#0667b5]"
                  >
                    Confirm Appointment
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>

              {/* ORDER SUMMARY */}

              <aside className="rounded-xl border border-[#dce6f2] bg-white p-5">
                <h3 className="text-lg font-bold text-black">
                  Booking Summary
                </h3>

                <div className="mt-5 border-b border-[#e8eef5] pb-5">
                  <p className="text-sm font-semibold text-black">
                    {entity.name}
                  </p>

                  <p className="mt-1 text-sm text-[#53677f]">
                    {entity.specialty}
                  </p>

                  <p className="mt-3 flex items-center gap-2 text-sm text-[#53677f]">
                    <CalendarDays size={16} />
                    {formattedDate?.label}
                  </p>

                  <p className="mt-2 flex items-center gap-2 text-sm text-[#53677f]">
                    <Clock3 size={16} />
                    {selectedTime}
                  </p>
                </div>

                <div className="space-y-3 py-5 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-[#53677f]">
                      Consultation Fee
                    </span>

                    <span className="font-medium text-black">
                      ₹{entity.fee}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-[#53677f]">
                      Booking Fee
                    </span>

                    <span className="font-medium text-black">
                      ₹0
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#e8eef5] pt-4">
                  <span className="font-bold text-black">
                    Total
                  </span>

                  <span className="text-xl font-bold text-black">
                    ₹{entity.fee}
                  </span>
                </div>

                <div className="mt-5 flex items-start gap-2 rounded-lg bg-[#f0fdf4] p-3 text-xs leading-5 text-[#166534]">
                  <ShieldCheck size={16} className="mt-0.5 shrink-0" />
                  Your appointment details will be shown after confirmation.
                </div>
              </aside>
            </div>
          )}

          {/* BOTTOM NAVIGATION — STEP 1 */}

          {step === 1 && (
            <div className="mt-7 flex items-center justify-between gap-4">
              <Link
                href={
                  entity.type === "doctor"
                    ? `/doctors/${entitySlug}`
                    : `/clinics/${entitySlug}`
                }
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-[#cbd8e8] px-5 text-sm font-semibold text-black hover:bg-[#f8fafc]"
              >
                <ArrowLeft size={17} />
                Back
              </Link>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex h-12 min-w-[150px] items-center justify-center gap-2 rounded-lg bg-[#0878d1] px-7 text-sm font-semibold text-white transition hover:bg-[#0667b5] sm:min-w-[220px]"
              >
                Next
                <ArrowRight size={17} />
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}