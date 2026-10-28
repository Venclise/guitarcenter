"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { categories } from "@/lib/constants";
import SearchInput from "@/components/SearchInput";
import SideBar from "@/components/SideBar";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;
  if (pathname?.startsWith("/dashboard")) return null;

  const isSolid = !isHome || scrolled;

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-colors duration-300">
      <nav
        className={`w-full p-5 flex items-center justify-between transition-all duration-300 ${
          isSolid
            ? "bg-white text-black  border-b border-gray-100"
            : "bg-gradient-to-b from-black/70 via-black/30 to-transparent text-white"
        }`}
      >
        <div className="flex items-center gap-4">

        <Link href="/" className="text-xl  font-bold ">
          Guitar center
        </Link>

        <div className="hidden lg:flex items-center gap-4">
                {
            categories.map(({title,Catslug,subcategories}) => (
                <Link href={`/products/${Catslug}`} className='group text-sm  font-normal relative lg:flex hidden' key={title} >

{title}

<div className='hidden shadow-md flex-col gap-4 absolute top-5 w-[10rem] p-5 left-0 bg-white z-100 group-hover:flex'>
     {subcategories.map(({title,slug}) => (
        <Link href={`/products/${Catslug}/${slug}`} className='font-normal text-black  hover:underline' key={title}>
        {title}
         </Link>
     ))}
</div>

                  </Link>
            ))
          }
        </div>
          </div>

       
        <div className="flex items-center lg:gap-5 gap-3 ">
          <div className="">
            <SearchInput  isSolid={isSolid}/>
          </div>
          <div className="lg:hidden flex items-center">
            <SideBar />
          </div>
        </div>
      </nav>
    </header>
  );
}