"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProductActions from "./ProductActions";
import { Badge } from "../ui/badge";

type ProductData = {
  slug: string;
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string[];
   price: number;
  cuttedPrice: number; 
};

export default function ProductCard({ data }: { data: ProductData }) {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <div className="group relative flex flex-col bg-[#f5f5f5]  overflow-hidden p-4 sm:p-6 transition-all duration-300 h-[22rem] md:h-[24rem] ">
      

    
        {!isDashboard &&  data.cuttedPrice > data.price &&  (
          <Badge className="absolute text-xs top-3 right-3 rounded-full bg-green-100  text-green-700 uppercase">
         
  Save {Math.round(((data.cuttedPrice - data.price) / data.cuttedPrice) * 100)}%
          </Badge>
        )}

      {isDashboard && (
        <div className="absolute top-4 right-4 z-10">
          <ProductActions id={data._id} />
        </div>
      )}

      <Link
        href={`${isDashboard ? "#" : `/products/item/${data.slug}`}`}
        className="flex-1 relative flex items-center justify-center p-4"
      >
        <div className="relative w-full h-full min-h-[220px]">
            <Image
            src={data.image[0]}
            alt={`${data.title} in Lahore`}
            fill
            className={`md:object-contain object-contain transition-opacity duration-300   ${
              !isDashboard && data.image.length > 1
                ? "group-hover:opacity-0"
                : ""
            }`}
          />

      
          {!isDashboard && data.image.length > 1 && (
            <Image
              src={data.image[1]}
              alt={`${data.title} in Lahore`}
              fill
              className="object-cover opacity-0  rounded-sm transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </div>
      </Link>

   
      <div className="flex flex items-center justify-between">
        <p

          className="font-semibold capitalize text-gray-900 text-xs md:text-sm  max-w-xs line-clamp-2 hover:underline"
        >
          {data.title}
        </p>

<div>
  {
    data.cuttedPrice && (

      
      <p className="font-semibold text-neutral-500 text-xs line-through">
          PKR.{data.cuttedPrice.toLocaleString()}
        </p>
    )
}
        <p className="font-semibold text-black text-xs">
          PKR.{data.price.toLocaleString()}
        </p>
</div>
      </div>
    </div>
  );
}