import type { MetadataRoute } from "next";
import mongoose from "mongoose";

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.guitarcentershop.com"
).replace(/\/+$/, "");

const MONGODB_URI = process.env.MONGODB_URI;


declare global {

  var _mongooseConn: Promise<typeof mongoose> | undefined;
}

async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI environment variable");
  }
  if (!global._mongooseConn) {
    global._mongooseConn = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }
  return global._mongooseConn;
}

type CategoryDoc = {
  slug: string;
  updatedAt?: Date | string;
  subcategories?: Array<{
    slug: string;
    updatedAt?: Date | string;
  }>;
};

type ProductDoc = {
  slug: string;
  categorySlug?: string;
  subcategorySlug?: string;
  images?: string[];
  imageUrl?: string;
  isActive?: boolean;
  updatedAt?: Date | string;
};

async function getCatalogData(): Promise<{
  categories: CategoryDoc[];
  products: ProductDoc[];
}> {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) {
      return { categories: [], products: [] };
    }


    const [categories, products] = await Promise.all([
      db
        .collection<CategoryDoc>("categories")
        .find({}, { projection: { slug: 1, updatedAt: 1, subcategories: 1 } })
        .toArray(),
      db
        .collection<ProductDoc>("products")
        .find(
          { isActive: { $ne: false }, slug: { $exists: true, $ne: "" } },
          {
            projection: {
              slug: 1,
              categorySlug: 1,
              subcategorySlug: 1,
              images: 1,
              imageUrl: 1,
              isActive: 1,
              updatedAt: 1,
            },
          }
        )
        .toArray(),
    ]);

    return { categories, products };
  } catch (error) {
    console.error("Sitemap MongoDB query failed:", error);
    return { categories: [], products: [] };
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { categories, products } = await getCatalogData();

  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/products`,
      changeFrequency: "daily",
      priority: 0.95,
    },
  ];

  // Categories & Subcategories
  for (const category of categories) {
    if (!category.slug) continue;

    entries.push({
      url: `${BASE_URL}/products/${category.slug}`,
      lastModified: category.updatedAt ? new Date(category.updatedAt) : undefined,
      changeFrequency: "weekly",
      priority: 0.85,
    });

    if (Array.isArray(category.subcategories)) {
      for (const sub of category.subcategories) {
        if (!sub.slug) continue;
     
        entries.push({
          url: `${BASE_URL}/products/${category.slug}/${sub.slug}`,
          lastModified: sub.updatedAt ? new Date(sub.updatedAt) : undefined,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }
  }


  for (const product of products) {
    if (!product.slug) continue;

    const image =
      product.imageUrl ||
      (Array.isArray(product.images) && product.images.length > 0
        ? product.images[0]
        : undefined);

    entries.push({
      url: `${BASE_URL}/products/${product.slug}`,
      lastModified: product.updatedAt ? new Date(product.updatedAt) : undefined,
      changeFrequency: "weekly",
      priority: 0.8,
      ...(image ? { images: [image] } : {}),
    });
  }

  return entries;
}