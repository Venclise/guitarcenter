import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-5  gap-y-20 py-20">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          
          className="rounded-xl mt-24  p-3 space-y-3 h-[25rem]  flex flex-col items-center justify-center"
        >
       
          <Skeleton className="h-[80%] w-full rounded-lg" />

        
           <Skeleton className="h-4 w-full" /> 
           <Skeleton className="h-4 w-1/3" />

        </div>
      ))}
    </div>
  );
}
