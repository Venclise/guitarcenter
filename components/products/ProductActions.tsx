"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { EllipsisVertical, Trash, SquarePen, ExternalLink } from "lucide-react";

export default function ProductActions({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  
  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      console.log(id)

      if (!res.ok) throw new Error("Failed to delete product");

      toast.add({
        type:"success",
       description: "Product deleted"});
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.add({type:"error",description: "Failed to delete the product"})
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="absolute right-2 top-2 cursor-pointer">
        <EllipsisVertical />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/products/item/${id}`);
          }}
        >
          <ExternalLink className="mr-2 h-4 w-4" /> View
        </DropdownMenuItem>

    

        <AlertDialog>
          <AlertDialogTrigger 
            className="w-full p-2 hover:bg-red-100 text-red-400 flex items-center text-sm rounded-sm mt-1">
          
            
              <Trash className="mr-2 h-4 w-4" /> Delete
          
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the product.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className="flex gap-2">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                 className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded"
                onClick={handleDelete}
                disabled={loading}
                
              >
              
                  {loading ? "Deleting..." : "Delete"}
          
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
