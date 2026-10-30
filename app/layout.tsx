
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SiteLayout from "@/components/layouts/SiteLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doclister | Healthcare Directory & Medical Providers",
  description:
    "Discover healthcare providers, medical professionals, and healthcare services with Doclister. Explore healthcare listings and find the information you need.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.doclister.com/#organization",
  name: "Doclister",
  url: "https://www.doclister.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.doclister.com/images/logo.png",
  },
  description:
    "Doclister is an online healthcare directory that helps people find doctors, clinics and hospitals in India.",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
};


export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
  }}
/>

        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
