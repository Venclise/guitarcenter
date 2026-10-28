import Acessories from '@/sections/Accessories'
import Categories from '@/sections/Categories'
import Features from '@/sections/Features'
import Hero from '@/sections/Hero'
import LocationMap from '@/sections/LocationMap'
import Newin from '@/sections/Newin'
import OnSale from '@/sections/OnSale'
import React from 'react'

export default function page() {
  return (
    <div className='oveflow-x-hidden'>
      <Hero />
      
      
      <Features />
      <Categories />
      <OnSale />
      <Newin />
      <Acessories />
      <LocationMap /> 

    </div>
  )
}
