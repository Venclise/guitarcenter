"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import AnimatedText from '@/lib/Herotitle';
import { categories } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';

export default function Categories() {
  return (
    <div className='lg:p-10 p-5 flex flex-col  lg:flex-row lg:items-center gap-5 bg-[#fff] py-12 '>
      <AnimatedText animate='bottomToTop'>
        <h2 className='font-semibold text-2xl uppercase lg:text-4xl lg:text-left'>
          Popular Categories
        </h2>
      </AnimatedText>

      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 2.5, spaceBetween: 24 },
          768: { slidesPerView: 4, spaceBetween: 14 },
          1024: { slidesPerView: 5, spaceBetween: 10 },
        }}
        className='w-full py-4'
      >
        {categories.map(({ id, title, img,Catslug }) => (
          <SwiperSlide key={id}>
            <Link 
              href={`/products/${Catslug}`} 
              className='flex flex-col items-center justify-center text-center group cursor-pointer'
            >
            
              <div className='w-28 h-28 sm:w-32    sm:h-32 lg:w-36 lg:h-36 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center p-4 group-hover:scale-105'>
                <Image 
                  src={img} 
                  height={80} 
                  width={80} 
                  alt={title} 
                  className='object-contain w-3/4 h-3/4'
                />
              </div>

         
              <span className='mt-3 text-sm font-medium text-gray-800 group-hover:text-black transition-colors line-clamp-1'>
                {title}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}