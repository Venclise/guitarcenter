"use client";

import React, { useRef, useState } from "react";
import ProductCard from "./ProductCard";

import { A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";



type itinerary = {
  _id: string;
  title: string;
  day: number;
  activities: string;
};



export type Product = {
  _id: any;
  title: string;
  description: string;
  price: number;
  cuttedPrice: number;
  image: string[];
  category: string;
  subcategory: string;
  itinerary: itinerary[];
  days: number;
  nights: number;
  location: string;
  sold: number
  
};

export default function RecommendProducts({ data }: { data: [] }) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="h-screen mt-12">
      {data.length && data.length > 0 && (
        <h2 className="text-xl  uppercase  font-semibold w-full text-center  ">
          You may also like
        </h2>
      )}
      <div className="flex items-center justify-around  w-full p-2  md:p-5  gap-4 mt-12 lg:mt-0 relative">
        <Swiper
          modules={[A11y]}
          spaceBetween={5}
          navigation
          breakpoints={{
            0: { slidesPerView: 2.1 },
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 4.2 },
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-full h-screen"
        >
          {data.map((product: Product) => (
            <SwiperSlide className="w-[30rem]" key={product._id}>
              <ProductCard data={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
  
    </div>
  );
}
