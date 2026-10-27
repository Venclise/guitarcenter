"use client";

import Image from "next/image";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Guitar, Phone, Sofa } from "lucide-react";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Badge } from "../ui/badge";

type Product = {
  _id: any;
  title: string;
  description: string;
  price: number;
  cuttedPrice: number;
  image: string[];
  category: string;
  subcategory: string;
};
export default function SingleProduct({ product }: { product: Product }) {
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [length, setLength] = useState(200);

  return (
    <div className="w-full   h-max  flex    flex-col lg:flex-row lg:p-5  overflow-hidden">
      {product.image && (
        <div className="w-full  lg:w-[50%] flex   flex-col lg:flex-row-reverse gap-1 ">
          <div className="w-full h-screen lg:w-[100%]  relative overflow-hidden ">
            <Swiper
              className="w-full h-full"
              modules={[Navigation, Pagination]}
              speed={250}
              spaceBetween={10}
              breakpoints={{
                0: {
                  slidesPerView: product.image.length === 1 ? 1 : 1.1,
                },
                640: {
                  slidesPerView: product.image.length === 1 ? 1 : 1.3,
                },
                1024: {
                  slidesPerView: 1,
                },
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
            >
              {product.image.map((img, i) => (
                <SwiperSlide
                  key={i}
                  className="w-full h-full flex  items-center justify-center lg:rounded-3xl relative bg-[#F7F7F7]"
                >
                  <Image
                    src={img}
                    alt={`${product.title} in Lahore`}
                    fill
                    sizes="100%"
                    loading="lazy"
                    className="w-full h-full object-contain  max-w-full max-h-full lg:rounded-2xl"
                  />

                  <div className="absolute top-0 right-0 bg-black text-neutral-200 z-10 m-2 rounded-full p-1 text-xs ">
                    {i + 1}/{product.image.length}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div
            className={`w-[95%] left-2   lg:hidden   flex justify-between  items-center absolute top-[50%]    z-10 ${product.image.length === 1 ? "hidden" : "flex"}`}
          >
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="
            h-10 w-10 rounded-full
             bg-transparent
             backdrop-filter backdrop-blur-sm   
            flex items-center justify-center
            
           
           text-blue-500   
          "
            >
              <ChevronLeft size={35} />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="
    h-10 w-10 rounded-full
             bg-transparent
             backdrop-filter backdrop-blur-sm   
            flex items-center justify-center
            shadow-xl
            transition-all
           text-blue-500  
         
                    "
            >
              <ChevronRight size={35} />
            </button>
          </div>

          {product.image.length > 1 && (
            <div className="lg:flex items-start hidden justify-start w-full py-5 px-3 lg:p-0 lg:w-max h-full  flex-row lg:flex-col  gap-4 ">
              {product.image.map((img, i) => (
                <div
                  key={i}
                  className="w-[5rem] h-[5rem] lg:h-[7rem]   relative cursor-pointer overflow-hidden transition-all"
                >
                  <Image
                    src={img}
                    onClick={() => {
                      swiperRef.current?.slideTo(i);
                    }}
                    alt={`${product.title}-${i}`}
                    fill
                    sizes="100%"
                    loading="lazy"
                    className={`object-cover    ${activeIndex === i ? "border-2 border-blue-300 opacity-100  scale-110" : "opacity-50 hover:opacity-100  "}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {product.image.length > 1 && (
        <div className="  w-full lg:hidden mt-8     flex items-center justify-center z-50     gap-1">
          {product.image.map((img, i) => (
            <div
              onClick={() => {
                swiperRef.current?.slideTo(i);
              }}
              key={i}
              className={`w-[.5rem] h-[.5rem]  

                 
bg-black
opacity-50

            rounded-full  relative cursor-pointer overflow-hidden transition-all ${activeIndex === i && "bg-black w-[.7rem] h-[.7rem] opacity-100"}`}
            />
          ))}
        </div>
      )}

      <div className="flex  gap-8 flex-col p-5    ">
        <h1 className="text-2xl   font-semibold ">{product.title}</h1>

           <div className='flex items-center gap-4 mt-8'>
        <p className="font-mono text-2xl font-semibold">
          Rs.{product.price.toLocaleString()}
        </p>

     
       
        {
 product.cuttedPrice > product.price && (
  <sup className="font-mono text-lg line-through text-neutral-500">
          Rs.{product.cuttedPrice.toLocaleString()}
        </sup>
          )
        }

          
        { product.cuttedPrice > product.price &&  (
          <Badge className=" text-sm font-mono rounded-full text-green-700  bg-transparent font-semibold ">
   {Math.round(((product.cuttedPrice - product.price) / product.cuttedPrice) * 100)}% off
          </Badge>
        )}
    </div>

 <div
          className="flex  gap-4 bg-gray-50 cursor-pointer p-2 lg:p-5 rounded-4xl"
          onClick={() => {
            setLength(0);
            length === -1 ? setLength(200) : setLength(-1);
          }}
        >
          <h2 className="font-semibold text-sm max-w-md">
            Details:
          </h2>
          <p className="text-sm text-black font-normal leading-6 max-w-xl">
            {product.description.length > 200
              ? product.description.slice(0, length)
              : product.description}
            {product.description.length > 55 && (
              <Button variant="ghost" className="hover:bg-gray-200">
                {length === -1 ? "...show less" : "...show more"}
              </Button>
            )}
          </p>
        </div>

        <div className="w-full flex flex-col gap-2 ">
          <Button className="bg-green-500  py-4 hover:bg-green-600 flex-1 flex items-center justify-center rounded-full">
            <Link
              href={`https://wa.me/923019356202?text=Hi%20what%20is%20the%20price%20of%20${encodeURIComponent(product.title)}`}
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
              <span className="text-xs md:text-sm">Whatsapp for order</span>
            </Link>
          </Button>

          <Button className=" py-4 flex flex-1 items-center justify-center rounded-full">
            <a
              href="tel:+923019356202"
              className="w-full flex items-center gap-2 justify-center "
            >
              <Phone />
              <span className="text-xs md:text-sm">Call for order</span>
            </a>
          </Button>
        </div>
       
        <Accordion>
          <AccordionItem
            value="item-1"
            className="bg-gray-50 hover:bg-gray-100 lg:p-5 p-2 rounded-4xl "
          >
            <AccordionTrigger className="flex gap-4 items-center font-semibold">
             <Guitar />
              Product care
            </AccordionTrigger>
            <AccordionContent>
        Keep your instrument sounding and looking its best by protecting it from direct sunlight, extreme humidity shifts, and heat sources. Clean the body, neck, and fingerboard gently after playing using a soft microfibre cloth, and avoid harsh household chemicals or solvents. Store your instrument in a padded case or on a secure stand when not in use, and keep sharp objects away to prevent finish scratches. Your instrument is covered by a 5-year warranty for defects arising from normal, natural use. Not following these care guidelines may void the warranty coverage.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
