  


import ProductCard from "@/components/products/ProductCard";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import React from "react";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const slugToCategory = (slug?: string) => {
  if (!slug) return "";
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};


export async function generateStaticParams() {
  return [
    { category: "guitars" },
    { category: "violins" },
    { category: "keyboards" },
    { category: "drums" },
    { category: "darbuka" },
    { category: "accessories" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category?: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const formattedCategory = slugToCategory(category);

  return {
    title: `${formattedCategory} in Lahore | Premium Instruments & Music Gear`,

    description: `Explore top quality ${formattedCategory} in Lahore. From beginner-friendly models to professional-grade instruments, discover authentic musical gear at our Lahore shop with nationwide delivery.`,

    alternates: {
      canonical: `${baseUrl}/products/${category}`,
    },

    openGraph: {
      title: `Best ${formattedCategory} Shop in Lahore | Guitar Center`,
      description: `Discover authentic ${formattedCategory} crafted for musicians. Visit our Lahore store or order online across Pakistan.`,
      url: `${baseUrl}/products/${category}`,
      siteName: "Guitar Center",
      images: [
        {
          url: "/hero3.jpg",
          width: 1200,
          height: 630,
          alt: `Buy ${formattedCategory} at our Lahore Store`,
        },
      ],
      type: "website",
      locale: "en_PK",
    },

    keywords: [
      `${formattedCategory} Lahore`,
      "musical instrument store in Lahore",
      "buy instruments online Pakistan",
      "music shop Gulberg Lahore",
      "guitars keyboards drums Lahore",
      "DHA Lahore music shop",
    ],

    twitter: {
      card: "summary_large_image",
      title: `Premium ${formattedCategory} | Lahore's Best Music Store`,
      description: `Shop the finest collection of ${formattedCategory}. High-quality instruments delivered across Pakistan.`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ category?: string }>;
}) {
  const { category } = await params;

  if (!category) {
    notFound();
  }

  const formattedCategory = slugToCategory(category);

  const query = new URLSearchParams();
  query.set("category", formattedCategory);

  const res = await fetch(
    `${baseUrl}/api/products?${query.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <div className="p-10 text-center text-red-500 font-medium mt-24">
        Failed to fetch products. Please try again later.
      </div>
    );
  }

  const data = await res.json();

  return (
    <div className="mt-24">
      <h1 className="text-2xl lg:text-4xl font-bold uppercase tracking-wide p-5">
        Shop {formattedCategory}
      </h1>

      {data.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          No products found in this category.
        </div>
      ) : (
         <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-1 gap-y-1 py-20">
          {data.map((product: any) => (
            <ProductCard data={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
}