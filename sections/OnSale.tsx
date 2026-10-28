"use client"
import ProductCard from '@/components/products/ProductCard'
import AnimatedText from '@/lib/Herotitle'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import React, { useEffect, useState } from 'react'


type item = {
  _id: string
  title: string
  description: string
  category: string
    slug: string,
  image: string[]
   price: number,
  cuttedPrice: number,
}


export default function OnSale() {


const [data,setData] = useState([])
  useEffect(() => {
    async function getProducts() {
        const res = await fetch("/api/products?limit=8&sale=true",{cache:"no-store"})
        if(!res.ok) {
          throw new Error("failed to fetch products")
        }
const data =  await res.json()
        setData(data)
      }
      getProducts()
  },[])



  return (
    <div className=''>
       
          <AnimatedText animate='bottomToTop'>
<div className='flex lg:p-10 p-5 items-center justify-between'>

        <h2 className='font-bold text-xl uppercase text-center'>
       shop  on sale
        </h2>

        <Link href="/products?sale=true" className='text-blue-500 text-sm underline flex items-center'>
        Shop all <ChevronRight  size={15}/>
        </Link>
        
</div>
      </AnimatedText>
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-1 gap-y-2 py-10">

        {data.map((item:item) => (
      
             <ProductCard data={item} key={item._id} />
             
            ))}
            </div>

    </div>
  
  )
}
