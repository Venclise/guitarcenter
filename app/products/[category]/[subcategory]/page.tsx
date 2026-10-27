import ProductCard from "@/components/products/ProductCard";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const slugToCategory = (slug?: string) => {
  if (!slug) return "";
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};


export async function generateStaticParams() {
  return [
    { category: "guitars", subcategory: "acoustic-guitars" },
    { category: "guitars", subcategory: "electric-guitars" },
    { category: "guitars", subcategory: "bass-guitars" },
    { category: "guitars", subcategory: "classical-guitars" },
    { category: "guitars", subcategory: "electro-acoustic" },
    { category: "violins", subcategory: "acoustic-violins" },
    { category: "violins", subcategory: "electric-violins" },
    { category: "violins", subcategory: "violas-cellos" },
    { category: "keyboards", subcategory: "digital-pianos" },
    { category: "keyboards", subcategory: "synthesizers" },
    { category: "keyboards", subcategory: "midi-controllers" },
    { category: "drums", subcategory: "acoustic-drum-kits" },
    { category: "drums", subcategory: "electronic-drums" },
    { category: "drums", subcategory: "cymbals" },
    { category: "darbuka", subcategory: "egyptian-darbukas" },
    { category: "darbuka", subcategory: "turkish-darbukas" },
    { category: "accessories", subcategory: "guitar-accessories" },
    { category: "accessories", subcategory: "drum-accessories" },
    { category: "accessories", subcategory: "violin-accessories" },
    { category: "accessories", subcategory: "cables-stands-cases" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category?: string; subcategory?: string }>;
}) {
  const { category, subcategory } = await params;

  const formattedCategory = slugToCategory(category);
  const formattedSubCategory = slugToCategory(subcategory);

  const location = "Lahore, Pakistan";
  const brandName = "Guitar Center";

  const pageTitle = subcategory
    ? `Buy ${formattedSubCategory} in Lahore | ${brandName}`
    : `Buy ${formattedCategory} Online in Lahore | ${brandName}`;

  const description = `Shop authentic ${
    formattedSubCategory || formattedCategory
  } in ${location}. Best prices, top brands, and nationwide delivery. Visit our music store in Lahore or order online at ${brandName}.`;

  const path = subcategory ? `${category}/${subcategory}` : `${category}`;

  return {
    title: pageTitle,
    description: description,
    alternates: {
      canonical: `${baseUrl}/products/${path}`,  
    },
    openGraph: {
      title: pageTitle,
      description: description,
      url: `${baseUrl}/products/${path}`,
      siteName: brandName,
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    keywords: [
      `${formattedSubCategory} price in Lahore`,
      `${formattedCategory} shop in Lahore`,
      "buy guitars online Pakistan",
      "musical instruments Gulberg Lahore",
      "best music store DHA Lahore",
      "guitar accessories Pakistan",
    ],
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ category?: string; subcategory?: string }>;
}) {
  const { category, subcategory } = await params;

  const formattedCategory = slugToCategory(category);
  const formattedSubCategory = slugToCategory(subcategory);

  const query = new URLSearchParams({
    category: formattedCategory,
    subcategory: formattedSubCategory,
  });

  const res = await fetch(`${baseUrl}/api/products?${query.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return <p className="text-center py-20">Failed to fetch products</p>;
  }

  const data = await res.json();

  return (
    <div className="mt-24 p-5">
      <h1 className="text-2xl lg:text-4xl font-bold uppercase tracking-wide">
        Shop {formattedSubCategory || formattedCategory}
      </h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-500 py-20">
          No instruments found in this category.
        </p>
      ) : (
         <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-1 gap-y-2 py-10">
          {data.map((product: any) => (
            <ProductCard data={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
}