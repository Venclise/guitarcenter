import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/products";


export default async function Page() {
  let data = [];
  
  try {
    await connectDB();
    // Fetch products directly from MongoDB using lean for performance
    data = await Product.find({}).sort({ createdAt: -1 }).lean();
  } catch (error) {
    console.error("Database fetch failed:", error);
    return <div>Failed to load products. Please try again later.</div>;
  }
  
  return (
    <div className='h-max lg:p-10 p-5 w-full'>
      <h1 className="font-semibold text-4xl">Products</h1>
      <Link href="/dashboard/add" className="bg-gray-100 m-2 flex items-center justify-center text-4xl font-bold w-[10rem] h-[10rem]">
      +
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 gap-y-20 py-10">
        {data.map((item: any) => (
          <ProductCard key={item._id.toString()} data={JSON.parse(JSON.stringify(item))} />
        ))}
      </div>
    </div>
  );
}