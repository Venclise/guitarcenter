// components/FeaturesBanner.tsx
import React from "react";
import { ShieldCheck, Music2, Tag, Truck } from "lucide-react";
import AnimatedText from "@/lib/Herotitle";

export default function Features() {
  const features = [
    {
      icon: ShieldCheck,
      text: "GOOD QUALITY",
    },
    {
      icon: Music2,
      text: "BEST SOUND",
    },
    {
      icon: Tag,
      text: "AFFORDABLE PRICES",
    },
    {
      icon: Truck,
      text: "ALL PAKISTAN DELIVERY",
    },
  ];

  return (
    <div className="w-full flex justify-center py-6 px-4">
      <div className="flex flex-wrap items-center justify-between w-full rounded-full py-2 px-4 sm:px-6 gap-y-3 gap-x-2 sm:gap-x-0">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            
            <React.Fragment key={item.text}>
              <AnimatedText animate="bottomToTop" >

              <div className="flex items-center gap-2 px-3 sm:px-5 py-1">
                <Icon className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black whitespace-nowrap">
                  {item.text}
                </span>
              </div>
              </AnimatedText>

              {index < features.length - 1 && (
                <div className="hidden sm:block h-5 w-[1px] bg-gray-300 mx-1" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}