
"use client";

import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Headphones,
  Send,
  HeartPulse,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

const phoneNumber = "+919990556217";
const whatsappNumber = "919990556217";

const contactDetails = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak to us directly for general enquiries.",
    value: "+91 99905 56217",
    href: `tel:${phoneNumber}`,
    action: "Call Now",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Send us a message on WhatsApp.",
    value: "+91 99905 56217",
    href: `https://wa.me/${whatsappNumber}`,
    action: "Chat on WhatsApp",
  },
  {
    icon: MapPin,
    title: "Our Address",
    description: "Visit or write to us at our location.",
    value:
      "New Colony Basdevpur, Karkend, Kusunda, Dhanbad, Jharkhand 828116",
    href: "https://www.google.com/maps/search/?api=1&query=New+Colony+Basdevpur%2C+Karkend%2C+Kusunda%2C+Dhanbad%2C+Jharkhand+828116",
    action: "View on Map",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = [
      "Hello Doclister,",
      "",
      "I would like to make an enquiry.",
      "",
      `Full Name: ${formData.name}`,
      `Email Address: ${formData.email}`,
      `Subject: ${formData.subject}`,
      "",
      "Message:",
      formData.message,
    ].join("\n");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#171526]">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-[#ece9fb] bg-gradient-to-br from-[#f3f1ff] via-white to-[#fbf4ff]">
        <div className="pointer-events-none absolute -left-24 -top-20 -z-10 h-72 w-72 rounded-full bg-[#4e44e1]/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-72 w-72 rounded-full bg-[#9122b4]/10 blur-[100px]" />

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-2 text-base font-medium text-[#77758c]">
              <Link href="/" className="transition hover:text-[#4e44e1]">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-[#4e44e1]">
                Contact Us
              </span>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-[#ded9ff] bg-white/90 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-[#4e44e1] shadow-sm">
              <HeartPulse size={18} />
              Contact Doclister
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              We’re Here to{" "}
              <span className="bg-gradient-to-r from-[#4e44e1] to-[#9122b4] bg-clip-text text-transparent">
                Help You
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#68677e] sm:text-xl">
              Have a question, need assistance, or want to get in touch with
              Doclister? Contact us by phone or WhatsApp, or send us a message
              using the form below.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-7 text-base font-bold text-white shadow-lg shadow-[#4e44e1]/15 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <FaWhatsapp size={23} />
                Chat on WhatsApp
              </a>

              <a
                href={`tel:${phoneNumber}`}
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-xl border border-[#ded9f3] bg-white px-7 text-base font-bold text-[#4e44e1] transition hover:border-[#4e44e1] hover:bg-[#f8f6ff]"
              >
                <Phone size={20} />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT INFORMATION */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#4e44e1]">
              Get in Touch
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Contact Information
            </h2>

            <p className="mt-4 text-base leading-8 text-[#77758c] sm:text-lg">
              Choose the most convenient way to connect with our team.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {contactDetails.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group flex h-full flex-col rounded-2xl border border-[#e9e5f5] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#cec7fa] hover:shadow-lg sm:p-8"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#f0edff] to-[#f9edff] text-[#4e44e1] transition group-hover:from-[#4e44e1] group-hover:to-[#9122b4] group-hover:text-white">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-5 text-2xl font-extrabold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-base leading-7 text-[#77758c]">
                    {item.description}
                  </p>

                  <p className="mt-4 break-words text-base font-semibold leading-7 text-[#302b48]">
                    {item.value}
                  </p>

                  <div className="mt-auto pt-7">
                    <a
                      href={item.href}
                      target={
                        item.title === "Our Address" ||
                        item.title === "WhatsApp"
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        item.title === "Our Address" ||
                        item.title === "WhatsApp"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex items-center gap-2 text-base font-bold text-[#4e44e1] transition hover:text-[#9122b4]"
                    >
                      {item.title === "WhatsApp" && (
                        <FaWhatsapp size={21} />
                      )}
                      {item.action}
                      <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                      />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* MESSAGE FORM + ADDRESS */}
      <section className="border-y border-[#ece9fb] bg-[#faf9ff] px-5 py-16 sm:px-8 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* FORM */}
          <div className="rounded-3xl border border-[#e9e5f5] bg-white p-6 shadow-sm sm:p-9">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#4e44e1]">
              Send an Enquiry
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Send Us a Message
            </h2>

            <p className="mt-3 text-base leading-8 text-[#77758c]">
              Fill in your details and tell us how we can assist you.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-base font-semibold text-[#302b48]"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="h-13 w-full rounded-xl border border-[#e4e0f0] bg-white px-4 py-3 text-base text-[#171526] outline-none transition placeholder:text-[#aaa6bc] focus:border-[#8074ed] focus:ring-4 focus:ring-[#4e44e1]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-base font-semibold text-[#302b48]"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="h-13 w-full rounded-xl border border-[#e4e0f0] bg-white px-4 py-3 text-base text-[#171526] outline-none transition placeholder:text-[#aaa6bc] focus:border-[#8074ed] focus:ring-4 focus:ring-[#4e44e1]/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-base font-semibold text-[#302b48]"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What is your enquiry about?"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                  className="h-13 w-full rounded-xl border border-[#e4e0f0] bg-white px-4 py-3 text-base text-[#171526] outline-none transition placeholder:text-[#aaa6bc] focus:border-[#8074ed] focus:ring-4 focus:ring-[#4e44e1]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-base font-semibold text-[#302b48]"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  className="w-full resize-y rounded-xl border border-[#e4e0f0] bg-white px-4 py-3 text-base leading-7 text-[#171526] outline-none transition placeholder:text-[#aaa6bc] focus:border-[#8074ed] focus:ring-4 focus:ring-[#4e44e1]/10"
                />
              </div>

              <button
                type="submit"
                className="inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-6 py-3 text-base font-bold text-white shadow-lg shadow-[#4e44e1]/15 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <FaWhatsapp size={23} />
                Send via WhatsApp
                <Send size={18} />
              </button>

              <p className="text-sm leading-6 text-[#8a879d]">
                Submitting this form opens WhatsApp with your enquiry details.
                Please review the message and send it in WhatsApp. Your message
                is not stored on this website.
              </p>
            </form>
          </div>

          {/* ADDRESS & SUPPORT */}
          <div className="space-y-5">
            <div className="rounded-3xl border border-[#e9e5f5] bg-white p-7 shadow-sm sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f0edff] text-[#4e44e1]">
                <MapPin size={27} />
              </div>

              <h3 className="mt-5 text-2xl font-extrabold">
                Visit Our Location
              </h3>

              <p className="mt-3 text-base leading-8 text-[#68677e]">
                New Colony Basdevpur, Karkend, Kusunda, Dhanbad, Jharkhand
                828116
              </p>

              <a
                href="https://www.google.com/maps/search/?api=1&query=New+Colony+Basdevpur%2C+Karkend%2C+Kusunda%2C+Dhanbad%2C+Jharkhand+828116"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-base font-bold text-[#4e44e1] transition hover:text-[#9122b4]"
              >
                Get Directions
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="rounded-3xl border border-[#e9e5f5] bg-white p-7 shadow-sm sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f9edff] text-[#9122b4]">
                <Headphones size={27} />
              </div>

              <h3 className="mt-5 text-2xl font-extrabold">
                Need Assistance?
              </h3>

              <p className="mt-3 text-base leading-8 text-[#68677e]">
                For general enquiries, contact us directly. We’ll be glad to
                help you find the right way forward.
              </p>

              <div className="mt-6 space-y-5">
                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center gap-3 text-base font-semibold text-[#302b48] transition hover:text-[#4e44e1]"
                >
                  <Phone size={21} className="shrink-0 text-[#4e44e1]" />
                  +91 99905 56217
                </a>

                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-base font-semibold text-[#302b48] transition hover:text-[#4e44e1]"
                >
                  <FaWhatsapp size={23} className="shrink-0 text-[#25D366]" />
                  Message us on WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e5e0ff] bg-gradient-to-r from-[#f4f1ff] to-[#fcf5ff] p-6">
              <div className="flex items-start gap-3">
                <Clock size={23} className="mt-0.5 shrink-0 text-[#4e44e1]" />
                <div>
                  <h3 className="text-base font-bold text-[#302b48]">
                    We’re Happy to Hear From You
                  </h3>
                  <p className="mt-2 text-base leading-7 text-[#77758c]">
                    Reach out with your questions, feedback, or general
                    enquiries using the contact options above.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-8">
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-gradient-to-r from-[#4e44e1] to-[#9122b4] px-6 py-14 text-center text-white shadow-xl shadow-[#4e44e1]/10 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -left-16 -top-24 -z-10 h-64 w-64 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-32 -right-10 -z-10 h-80 w-80 rounded-full border border-white/10" />

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            <HeartPulse size={30} />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Let’s Start a Conversation
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
            Have a question or feedback for Doclister? We’re just a call or
            message away.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-xl bg-white px-7 text-base font-bold text-[#4e44e1] transition hover:-translate-y-0.5 hover:bg-[#f5f2ff]"
            >
              <FaWhatsapp size={23} />
              WhatsApp Us
            </a>

            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-xl border border-white/40 bg-white/10 px-7 text-base font-bold text-white transition hover:bg-white/20"
            >
              <Phone size={20} />
              Call Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
