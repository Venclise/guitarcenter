import ProductsGrid from '@/components/products/ProductsGrid'
import React from 'react'
import { Metadata } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000/";

export const metadata: Metadata = {
  title: "Premium Acoustic & Electric Guitars | Musical Instruments Lahore",
  
  description: "Browse our complete collection of premium guitars and musical instruments in Lahore. From classical nylon-string guitars to electric and acoustic models, explore top quality gear with delivery across Pakistan.",
  
  alternates: {
    canonical: `${baseUrl}/products`,
  },
  
  openGraph: {
    title: "Premium Guitars & Musical Instruments Collection in Lahore",
    description: "Explore classical, acoustic, and electric guitars. High-quality craftsmanship and authentic instruments delivered across Lahore and Pakistan.",
    url: `${baseUrl}/products`,
    siteName: "Guitar Center",
    images: [
      {
        url: "/hero3.jpg", 
        width: 1200,
        height: 630,
        alt: "Guitar collection in our Lahore showroom",
      },
    ],
    locale: "en_PK",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shop Guitars Online | Lahore's Best Musical Instrument Store",
    description: "Upgrade your tone with our exclusive guitar range. Superior craftsmanship and authentic musical instruments.",
  },

  keywords: [
    "buy guitars online Pakistan",
    "guitar shop in Lahore",
    "classical guitars Lahore",
    "acoustic guitars Pakistan",
    "electric guitar shop Lahore",
    "musical instruments store Lahore",
    "best guitar shop liberty Lahore"
  ],
};

export default function page() {
  return (
    <div className=''>
      <ProductsGrid />
    </div>
  )
}