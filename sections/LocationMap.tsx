import AnimatedText from "@/lib/Herotitle";
import {   ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function LocationMap() {

  const mapSrc = "https://maps.google.com/maps?q=31.5862808,74.3089981&z=17&output=embed";
  const mapSrcLiberty =
    "https://maps.google.com/maps?q=31.509414,74.3420282&z=17&output=embed";

  return (
    <div className="flex items-center gap-5 lg:flex-row flex-col py-10 px-2">

        <div className="flex  flex-col w-full gap-5  h-[50vh] lg:h-screen ">
      <AnimatedText animate='bottomToTop'>
      <Link href="https://www.google.com/maps/place/The+Guitar+Center/@31.509414,74.3420282,17z/data=!4m14!1m7!3m6!1s0x3919045b720ba93f:0x6d42ff8ce0f080de!2sThe+Guitar+Center!8m2!3d31.509414!4d74.3420282!16s%2Fg%2F11f53g2fs_!3m5!1s0x3919045b720ba93f:0x6d42ff8ce0f080de!8m2!3d31.509414!4d74.3420282!16s%2Fg%2F11f53g2fs_?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D" 
      className='font-semibold text-md  lg:text-xl  text-black uppercase flex items-center gap-2 hover:underline'>
Visit our liberty branch <ArrowUpRight />
 </Link>
 
 </AnimatedText>


    <div className="w-full h-full rounded-xl overflow-hidden shadow-md">
      <iframe
        title="Google Maps Location"
        src={mapSrcLiberty}
        width="100%"
        height="100%"
        className="border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        />
    </div>
        </div>

    <div className="flex  flex-col w-full gap-5  h-[50vh] lg:h-screen ">
      <AnimatedText animate='bottomToTop'>
      <Link href="https://www.google.com/maps/place//@31.5840453,74.3013287,15.78z/data=!4m6!1m5!3m4!2zMzHCsDM1JzEwLjYiTiA3NMKwMTgnMzIuNCJF!8m2!3d31.5862808!4d74.3089981?hl=en&entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D"
           className='font-semibold text-md  lg:text-xl  text-black uppercase flex items-center gap-2 hover:underline'>
Visit our taxali branch <ArrowUpRight />
 </Link>
 
 </AnimatedText>


    <div className="w-full h-screen rounded-xl overflow-hidden shadow-md">
      <iframe
        title="Google Maps Location"
        src={mapSrc}
        width="100%"
        height="100%"
        className="border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        />
    </div>
        </div>
        </div>
  );
}