
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";

const baseUrl =
process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000/";

export default async function page() {
  const res = await fetch(`${baseUrl}/api/products`, {
    cache: "no-store",
  });

 
  if (!res.ok) {
    const errorText = await res.text(); 
    console.error("Fetch failed with status:", res.status, errorText);
    return <div>Failed to load products. Check server logs.</div>;
  }

  const data = await res.json();
  
  return (
    <div className='h-max lg:p-10 p-5 w-full'>
            
      <h1 className="font-semibold text-4xl">Products</h1>
      <Link href="/dashboard/add" className="bg-gray-100 m-2 flex items-center justify-center text-4xl font-bold w-[10rem] h-[10rem]">
      +
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 gap-y-20 py-10">
        {data.map((item: any) => (
          <ProductCard key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
}
