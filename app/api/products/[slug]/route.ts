import { connectDB } from "@/lib/db";
import { Product } from "@/models/products";
import { NextResponse } from "next/server";


type Props = {
  params: Promise<{ slug: string }>;
};

export async function GET(req: Request, { params }: Props) {
  try {
    await connectDB();
    const { slug } = await params;

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug);
    const product = await Product.findOne({
      $or: [{ slug }, ...(isObjectId ? [{ _id: slug }] : [])],
    }).lean();

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (e) {
    console.error("GET /api/products/[slug] error:", e);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: Props) {
  try {
    await connectDB();
    const { slug } = await params;

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug);
    const product = await Product.findOneAndDelete({
      $or: [{ slug }, ...(isObjectId ? [{ _id: slug }] : [])],
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error("DELETE /api/products/[slug] error:", e);
    return NextResponse.json(
      { message: "Failed to delete the product" },
      { status: 500 }
    );
  }
}