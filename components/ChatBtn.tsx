"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function () {
  const path = usePathname()
  return (

      <Link

 href={`https://wa.me/923019356202?text=Hi%20I%20want%20details`}
              target="_blank"
              rel="noopener noreferrer"
          
  className={`fixed bottom-5 z-100 right-5 bg-neutral-900 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 text-xs ${path === "/dashboard" || path === "/dashboard/add" && "hidden"}`}
>

<Image 
src="/whatsapp.svg"
alt="whatsapp icon"
height={35}
width={35}
className='text-white '
/>

<span className='hidden lg:flex'>
  Chat on WhatsApp
</span>

</Link>

  )
}
