
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

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

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Website Header */}
        <Header />

        {/* Main Page Content */}
        <main className="w-full flex-1">
          {children}
        </main>

        {/* Website Footer */}
        <Footer />
      </body>
    </html>
  );
}