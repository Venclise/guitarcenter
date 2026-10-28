
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="h-max w-ffull flex flex-col lg:p-10 lg:flex-row items-center justify-between w-full gap-4 lg:gap-10 ">
      {/* Image */}
           <div className="w-full h-[30rem] lg:w-[50%] lg:h-[35rem]  ">


      <Skeleton className=" h-full w-full rounded-xl" />
      </div>

    
      <div className="flex flex-col lg:w-[50%] gap-4 w-full">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-10 w-1/3 rounded-md" />
      </div>
    </div>
  );
}
