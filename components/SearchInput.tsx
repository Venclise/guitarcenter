"use client"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Input } from './ui/input'
import {  Search } from 'lucide-react'


import { Button } from './ui/button'
import { useEffect, useState } from "react"
import { Spinner } from "./ui/spinner"
import { useRouter } from "next/navigation"

import Link from "next/link"
import { categories } from "@/lib/constants"



export default function   SearchInput({isSolid}:{isSolid: boolean}) {
  const router = useRouter()
   const [results,setResults]  = useState<any[]>([])
   const [search,setSearch] = useState("")
   const [loading,setLoading] = useState(false)
   
  useEffect(() => {
     if(search.length < 2 || search === "") {
         setResults([])
         setLoading(false)
         return
     }
   

     const timer = setTimeout(async() => {
      
      setLoading(true)
      const res = await fetch(`api/products?search=${search}`)
      const data = await res.json()
      setResults(data)
      setLoading(false)
    },400)
    
     return () => clearTimeout(timer)
    
  },[search])




  return (
<div>
<Sheet >
  <SheetTrigger >
    <button
     
      type="button"
      className={`group flex items-center gap-2.5 px-5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
        isSolid
          ? "border-gray-800 text-gray-900 hover:bg-gray-100"
          : "border-white/80 text-white hover:bg-white/10"
      }`}
    >
      <Search className="w-4 h-4 stroke-[2.25]" />
      <span className="text-xs uppercase font-medium tracking-wider">
        Search
      </span>
    </button>
  </SheetTrigger>
  <SheetContent side="top"   className="h-[80vh] p-10 lg:px-20 lg:py-10 z-[100]">
  
      <SheetTitle></SheetTitle>
    
  <div className="flex items-center gap-4">
    <Search strokeWidth={1.5} className="w-5 h-5"/>
<input type="text" placeholder="Search here" value={search} className="w-full font-bold placeholder:text-gray-800 text-2xl border-0 outline-0 " onChange={(e) => setSearch(e.target.value)}/>
  </div>

<div className="flex flex-col h-full ">
     {results.length > 0 ? (
        <div className=" bg-white flex flex-col items-start justify-start w-full mt-12  z-50">
          <span className="text-sm font-semibold text-[#000] ">
          Related Searches
          </span>
          {results.map((item) => (
            
            <div
            key={item._id}
            className="p-2 w-full  hover:bg-gray-50 rounded-md hover:text-black"
            onClick={() => {router.push(`/products/item/${item._id}`)}}
            >
              <SheetClose className="w-full text-left flex items-center gap-2 cursor-pointer">
                <Search className="w-4 h-4 "/>
              {item.title}
             
              </SheetClose>
            </div>
          ))}
        </div>
      ): (
         <div className={`${search.length ? "hidden" : "flex"} bg-white  flex-col items-start justify-start w-full mt-12  z-50`}>
          <span className="text-md font-semibold p-2 text-black">
           Quick Search
          </span>
          {categories.map((item) => (
            
            <Link
            // href={item.Catslug}
            href="#"
            key={item.title}
            className="p-2 w-full  hover:bg-gray-50 rounded-md hover:text-black"
            >
              <SheetClose className="w-full text-left flex items-center gap-2 cursor-pointer">
                <Search className="w-4 h-4 "/>
                <span className="text-sm">
              {item.title}
                </span>
             
              </SheetClose>
            </Link>
          ))}
          </div>
      )}

      {loading && <p className="w-full flex items-center "><Spinner /></p>}
    </div>

  </SheetContent>
</Sheet>


        </div>
    
  )
}
