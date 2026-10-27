import RecommendProducts from "@/components/products/RecommendedProducts";
import SingleProduct from "@/components/products/SingleProduct";
import type { Metadata, ResolvingMetadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata(
  { params }: { params: Promise<{ productid: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { productid } = await params;

  const res = await fetch(`${baseUrl}/api/products/${productid}`, {
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
  const productDescription = `${product.description.slice(0, 150)}... Buy ${product.title} at the best price in ${storeLocation}. Authentic musical instruments with nationwide delivery.`;

  const primaryImage =
    Array.isArray(product.image) && product.image.length > 0
      ? product.image[0]
      : "/hero3.jpg";

  return {
    title: productTitle,
    description: productDescription,
    alternates: {
      canonical: `${baseUrl}/product/${productid}`,
    },
    openGraph: {
      title: productTitle,
      description: productDescription,
      url: `${baseUrl}/product/${productid}`,
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
      "music shop DHA Lahore",
      "best musical instruments Gulberg Lahore",
      "authentic guitars Pakistan",
    ],
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ productid: string }>;
}) {
  const { productid } = await params;

  const res = await fetch(`${baseUrl}/api/products/${productid}`, {
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

  return (
    <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SingleProduct product={product} />

      {data.length > 0 && <RecommendProducts data={data} />}
    </div>
  );
}