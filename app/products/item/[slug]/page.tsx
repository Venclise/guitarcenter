import RecommendProducts from "@/components/products/RecommendedProducts";
import SingleProduct from "@/components/products/SingleProduct";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

type Props = {
  params: Promise<{ slug: string }>;
};

// 1. Dynamic SEO Metadata Generator
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // FIXED: Changed productid to slug to match the [slug] folder parameter
  const { slug } = await params;

  const res = await fetch(`${baseUrl}/api/products/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      title: "Product Not Found | Guitar Center Lahore",
    };
  }

  const product = await res.json();

  const storeLocation = "Lahore, Pakistan";
  const brandName = "Guitar Center";
  const productTitle = `${product.title} Price in Pakistan | ${brandName} Lahore`;
  const cleanDescription = (product.description || "").replace(/<[^>]*>?/gm, "");
  const productDescription = `${cleanDescription.slice(0, 150)}... Buy ${product.title} at the best price in ${storeLocation}. Authentic musical instruments with nationwide delivery.`;

  const primaryImage =
    Array.isArray(product.image) && product.image.length > 0
      ? product.image[0]
      : `${baseUrl}/hero3.jpg`;

  return {
    title: productTitle,
    description: productDescription,
    alternates: {
      canonical: `${baseUrl}/product/${slug}`,
    },
    openGraph: {
      title: productTitle,
      description: productDescription,
      url: `${baseUrl}/product/${slug}`,
      siteName: brandName,
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 630,
          alt: `Buy ${product.title} at ${brandName} Lahore`,
        },
      ],
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: productTitle,
      description: productDescription,
      images: [primaryImage],
    },
    keywords: [
      `${product.title} price in Pakistan`,
      `${product.title} Lahore`,
      "buy instruments online Pakistan",
      "music shop Lahore",
      "best musical instruments DHA Gulberg Lahore",
      "authentic guitars Pakistan",
    ],
  };
}


export default async function Page({ params }: Props) {
  const { slug } = await params;

  const res = await fetch(`${baseUrl}/api/products/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch the product");
  }

  const product = await res.json();

  const recommendres = await fetch(
    `${baseUrl}/api/products/related?category=${encodeURIComponent(
      product.category
    )}&productId=${product._id}&sort=newest&limit=6`,
    { cache: "no-store" }
  );

  let data = [];
  if (recommendres.ok) {
    data = await recommendres.json();
  }

  const cleanDescription = (product.description || "").replace(/<[^>]*>?/gm, "");
  const primaryImage =
    Array.isArray(product.image) && product.image.length > 0
      ? product.image[0]
      : `${baseUrl}/hero3.jpg`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.image || [primaryImage],
    description: cleanDescription,
    brand: {
      "@type": "Brand",
      name: product.brand || "Guitar Center Lahore",
    },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/product/${slug}`,
      priceCurrency: "PKR",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "MusicStore",
        name: "Guitar Center",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lahore",
          addressCountry: "PK",
        },
      },
    },
  };

  return (
    <div className=" py-20 ">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <SingleProduct product={product} />

      {data.length > 0 && <RecommendProducts data={data} />}
    </div>
  );
}