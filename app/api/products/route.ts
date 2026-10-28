import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/products";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const subcategory = formData.get("subcategory") as string;
    const price = Number(formData.get("price"));
    const cuttedPriceStr = formData.get("cuttedPrice") as string;
    const cuttedPrice = cuttedPriceStr ? Number(cuttedPriceStr) : undefined;

    const files = formData
      .getAll("images")
      .filter((f): f is File => f instanceof File);

    if (!title || !description || !category || !files || !price) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const imageUrls: string[] = [];
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products" }, (err, res) => {
            if (err) return reject(err);
            resolve(res);
          })
          .end(buffer);
      });
      imageUrls.push(result.secure_url);
    }

    // Creating document explicitly and calling .save() ensures pre-save hook fires
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      subcategory,
      image: imageUrls,
      cuttedPrice,
    });

    const savedProduct = await newProduct.save();

    return NextResponse.json(savedProduct, { status: 201 });
  } catch (e) {
    console.error("POST /api/products error:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const limit = searchParams.get("limit");
    const sale = searchParams.get("sale");

    const query: any = {};
    if (category && category !== "all") {
      query.category = { $regex: `^${category}$`, $options: "i" };
    }

    if (sale === "true") {
      query.$expr = { $gt: ["$cuttedPrice", "$price"] };
    }

    if (subcategory) {
      query.subcategory = { $regex: `^${subcategory}$`, $options: "i" };
    }

    if (search) query.title = { $regex: search, $options: "i" };

    let mongooseQuery = Product.find(query);

    if (sort === "newest") {
      mongooseQuery = mongooseQuery.sort({ createdAt: -1 });
    }

    if (sort === "ascending") {
      mongooseQuery = mongooseQuery.sort({ title: 1 });
    }

    if (sort === "descending") {
      mongooseQuery = mongooseQuery.sort({ title: -1 });
    }

    if (limit) {
      mongooseQuery = mongooseQuery.limit(Number(limit));
    }

    const products = await mongooseQuery.lean();

    return NextResponse.json(products, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}