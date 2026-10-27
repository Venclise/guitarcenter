import { Button } from '@/components/ui/button'
import AnimatedText from '@/lib/Herotitle'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Hero() {
  return (
    <div className='w-full h-screen lg:p-10 p-5' id="hero" >
        <Image src="/hero.jpg" alt="Guitar center" fill
 className="w-full h-full object-cover  brightness-65 relative"
         />
        <div className='flex items-center justify-center  gap-4 h-full max-w-3xl z-100'>

        <AnimatedText animate='bottomToTop'>
      <h1 className='font-semibold text-4xl lg:text-7xl text-white uppercase'>
INSTRUMENTS THAT MATCH PASSION     
 </h1>
        <p className='text-sm text-neutral-200 my-2 lg:m-2'>Premium gear built with precision to bring your unique sound to life.</p>
        <Link href="/products/guitars">
        <Button className="bg-[#f5f5f5] my-2 lg:m-2 text-black p-5 rounded-full hover:bg-neutral-200 cursor-pointer">SHOP GUITARS</Button>
        </Link> 

        <Link href="/products">
        <Button variant="link" className=" my-2 lg:m-2 cursor-pointer text-[#f5f5f5] hover:text-neutral-300 underline">SHOP ALL <ChevronRight /></Button>
        </Link>

        </AnimatedText>
        </div>
    </div>  
  )
}
