import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {  Menu, Phone } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"
import Link from "next/link"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { categories } from "@/lib/constants"


export default function SideBar() {
  return (
   <Sheet >
  <SheetTrigger >
    <Button size="icon-lg"  className="rounded-full" variant="ghost">
    <Menu />
    </Button>
  </SheetTrigger>
  <SheetContent side="right" className="overflow-y-scroll p-5">
    <SheetHeader>
      <SheetTitle>    
         <Link href="/" className="text-xl  font-bold ">
          Guitar center
        </Link>

        </SheetTitle>
      <SheetDescription className="flex flex-col  items-start justify-between py-10 px-2 gap-8  ">
        <Accordion  className='w-full bg-white flex flex-col gap-8 text-center rounded-md'>
  {
      categories.map(({Catslug,title,subcategories}) => (
  <AccordionItem value={`item-${title}`} className='w-full border-white'>
    <div className="flex items-center w-full justify-between ">
<Link href={`/products/${Catslug}`} className="font-semibold text-black text-2xl">
<SheetClose className="cursor-pointer hover:underline">
{title}
</SheetClose>
</Link>
    <AccordionTrigger className='w-max cursor-pointer  '></AccordionTrigger>
    </div>
    <AccordionContent className='flex flex-col items-start justify-start gap-4 p-5'>
       {subcategories.map(({title,slug}) => (
         <Link
           href={`/products/${Catslug}/${slug}`}
         key={title}>
         <SheetClose  className="hover:underline cursor-pointer text-neutral-800">
          {title}

        </SheetClose>
          </Link>
       ))}
     
    </AccordionContent>
  </AccordionItem>

))
}
</Accordion>


  <div className="w-full flex flex-col gap-2 ">
          <Button className="bg-green-500 flex-1 py-4 flex items-center justify-center rounded-full">
            <Link
              href={`https://wa.me/923019356202?text=Hi%20I%20want%20details`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2 justify-center "
            >
            <Image
                src="/whatsapp.svg"
                alt="Whatsapp"
                height={20}
                width={20}
                priority
              />
              <span>Whatsapp us</span>
            </Link>
          </Button>

          <Button className=" py-4 flex flex-1 items-center justify-center rounded-full">
            <a
              href="tel:+923019356202"
              className="w-full flex items-center gap-2 justify-center "
            >
              <Phone /> Call us
            </a>
          </Button>
        </div>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
  )
}
