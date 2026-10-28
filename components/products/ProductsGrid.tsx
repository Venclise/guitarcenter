"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductsGrid() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const baseUrl =
process.env.NEXT_PUBLIC_SITE_URL 

  const currentSort = searchParams.get("sort") || "";

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const params = new URLSearchParams();
   
      if (currentSort) params.set("sort", currentSort);

      const url = `${baseUrl}/api/products${params.toString() ? `?${params.toString()}` : ""}`;
      
      try {
        const res = await fetch(url, { cache: "no-store" });
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    }

    fetchProducts();
  }, [currentSort]); 

  return (
    <div className="mt-24">
      <div className="flex items-center justify-between gap-4 p-5">
        <h1 className="text-2xl lg:text-3xl font-semibold uppercase">
          Shop {currentSort === "newest" ? "New Arrivals" : "Musical Instruments"}
        </h1>

<Select
          value={currentSort}
          onValueChange={(newValue) => {
            const params = new URLSearchParams(searchParams.toString());

            if (newValue === "sale") {
              params.set("sale", "true");
              params.delete("sort");
            } else if (newValue) {
              params.set("sort", newValue);
              params.delete("sale"); 
            } else {
              params.delete("sort");
              params.delete("sale");
            }

            router.push(`/products?${params.toString()}`);
          }}
        >
          <SelectTrigger className="w-[15%] capitalize p-5  rounded-2xl  bg-[#f5f5f5] border-0 ">
            <p className="text-sm font-semibold">Sort by:</p>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="sale">On Sale</SelectItem>
            <SelectItem value="ascending">Alphabetically A-Z</SelectItem>
            <SelectItem value="descending">Alphabetically Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 gap-y-1 py-20">
        {products.length > 0 ? (
          products.map((item) => <ProductCard key={item._id} data={item} />)
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}