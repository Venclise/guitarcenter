import { connectDB } from "@/lib/db"
import { Product } from "@/models/products"
import { NextResponse } from "next/server"




export async function GET(req:Request) {
    try {
await connectDB()
const {searchParams} = new URL(req.url)
const category = searchParams.get("category")
const productId = searchParams.get("productId")

if (!productId || !category) {
          return NextResponse.json(
        { error: "Missing params: category or productId" },
        { status: 400 }
      );
}

const products = await Product.find({
    category,
  _id:{ $ne:productId}
}
).limit(6).sort({sold: -1}).lean()

return NextResponse.json(products,{status: 200})
    }catch(error){
        console.log(error)
            return NextResponse.json(
      { error: "Failed to fetch related products" },
      { status: 500 }
    );
    }
}