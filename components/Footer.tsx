"use client"
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import React, { useEffect, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { categories } from '@/lib/constants'

export default function Footer() {
  const [year, setYear] = useState<number>(2026); 
  useEffect(()=> {
  setYear(new Date().getFullYear());
  
  },[])
  return (
    <>
    <div className='bg-gray-50 border-t lg:p-20 p-5 h-max w-full flex justify-between gap-4 flex-wrap '>
      <div className='flex flex-col gap-2 '>
             <Link href="/" className="text-xl  font-bold ">
          Guitar center 
        </Link>
        <p className='text-sm'>{year} © All rights reserved</p>
        <p className='text-sm max-w-sm capitalize'>We deal in all kinds of musical products guitars,drums,keyboard,darbuka,amplifiers,Accessories and more</p>

      </div>
                 <div className='flex flex-col gap-4 w-max'>
<h4 className='font-semibold uppercase'>Quick Links</h4>
          {categories.map(({  title, Catslug }) => (
            <Link href={`/products/${Catslug}`} key={title} className="text-sm hover:underline">
              {title}
            </Link>
          ))}
          </div>

                <div className='flex flex-col gap-3 w-max'>
               <h4 className='font-semibold uppercase'>Contact us</h4>
                     <Link
  href="https://wa.me/+923019356202?text=Hi%20I%20want%20to%20discuss%20a%20something"
  target="_blank"
  rel="noopener noreferrer"
  className="text-sm hover:underline flex items-center gap-2"
>
  <MessageCircle  strokeWidth={1} size={15}/>
   Contact us on Whatsapp
    </Link> 
   <a href="mailto:"
    className="text-sm hover:underline flex items-center gap-2"
    
    >
    <Mail strokeWidth={1} size={15}/>
  Mail</a>
    <Link href="https://www.instagram.com/" 
  target="_blank"
       className="text-sm hover:underline flex items-center gap-2"
       >
        <Image src="/insta.svg" alt="whatsapp" height={15} width={15} />
             Instagram
            </Link> 
                <Link href="https://www.facebook.com/" 
       className="text-sm hover:underline flex items-center gap-2"
       >
        <Image src="/facebook.svg" alt="whatsapp" height={15} width={15} />
             Facebook
            </Link> 
          </div>

             <Accordion className='w-max' >
          <AccordionItem
            value="item-2"
            className="  lg:p-5 p-2 rounded-2xl "
            >
            <AccordionTrigger className="flex uppercase font-semibold gap-4 items-center w-max">
              <MapPin />
             Store Location
            </AccordionTrigger>
            <AccordionContent className='text-center flex flex-col max-w-xs'>
           <h4 className='font-semibold'>LAHORE</h4>
           <li className='underline'>

           Taxali Gate Road Lahore
           </li>
           <li className='underline'>
            42-43 Sunflower Building, Commercial Area Gulberg III, Lahore, 54000
           </li>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
    </div>
       <p className='text-center text-sm p-2'>Website made by <Link className='text-blue-500 underline' href="https://weblify-nu.vercel.app/">Weblify</Link></p>
            </>
  )
}
