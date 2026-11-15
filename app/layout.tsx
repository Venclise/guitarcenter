import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBtn from "@/components/ChatBtn";
import { Suspense } from "react";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.guitarcentershop.com"
).replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Guitar Center | Buy Acoustic, Classical & Electric Guitars in Lahore, Pakistan",
    template: "%s | Guitar Center",
  },
  description:
    "Shop acoustic, classical, and electric guitars, amplifiers, keyboards, drums, studio gear, and guitar accessories in Lahore with delivery across Pakistan.",
  applicationName: "Guitar Center",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "Guitar Center",
    url: SITE_URL,
    locale: "en_PK",
    title:
      "Guitar Center | Buy Acoustic, Classical & Electric Guitars in Lahore, Pakistan",
    description:
      "Shop acoustic, classical, and electric guitars, amps, studio gear, and accessories in Lahore, Pakistan.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guitar Center | Guitars & Musical Instruments in Lahore, Pakistan",
    description:
      "Browse acoustic, classical, and electric guitars, amplifiers, studio gear, and accessories in Lahore with nationwide delivery in Pakistan.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const musicStoreJsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicStore",
  "@id": `${SITE_URL}/#organization`,
  name: "Guitar Center",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon/favicon.svg`,
  description:
    "Musical instruments storefront in Lahore, Pakistan offering acoustic, classical, and electric guitars, amplifiers, keyboards, drums, studio gear, and accessories.",
  currenciesAccepted: "PKR",
  areaServed: [
    {
      "@type": "City",
      name: "Lahore",
    },
    {
      "@type": "Country",
      name: "Pakistan",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
    streetAddress: "Sunflower building Gulberg Lahore",
  },
  telephone: "+923019356202",
  sameAs: [
    "https://www.instagram.com/d_guitarcentre/",
    "[PLACEHOLDER_FACEBOOK_URL]",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(musicStoreJsonLd),
          }}
        />
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <Suspense fallback={null}>
          <ChatBtn />
        </Suspense>

        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}