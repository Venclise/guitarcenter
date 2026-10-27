import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/products";
import { Suspense } from "react";


async function ProductList() {
  await connectDB();
  const data = await Product.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 gap-y-20 py-10">
      {data.map((item: any) => (
        <ProductCard key={item._id.toString()} data={JSON.parse(JSON.stringify(item))} />
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <div className='h-max lg:p-10 p-5 w-full'>
      <h1 className="font-semibold text-4xl">Products</h1>
      <Link href="/dashboard/add" className="bg-gray-100 m-2 flex items-center justify-center text-4xl font-bold w-[10rem] h-[10rem]">
      +
      </Link>

      {/* Suspense satisfies Next.js 15 caching requirements by streaming the dynamic DB data */}
      <Suspense fallback={<div className="py-10 text-neutral-500">Loading products...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
}