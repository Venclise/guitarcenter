"use client";

import { ArrowLeft, Trash } from "lucide-react";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast"

import { Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Button } from "../button";
import { Input } from "../input";
import { Textarea } from "../textarea";
import { ToggleGroup, ToggleGroupItem } from "../toggle-group";
import { Spinner } from "../spinner";
import Image from "next/image";
import { categories } from "@/lib/constants";

type ProductInfo = {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  price: string,
  cuttedPrice: string
};

const emptyProduct: ProductInfo = {
  title: "",
  description: "",
  category: "",
  subcategory: "",
  price: "",
  cuttedPrice: "",
};

export default function AddProduct() {
  const [selectedParent, setSelectedParent] = useState<string>("");
  const [selectedSub, setSelectedSub] = useState<string>("");
  const [productInfo, setProductInfo] = useState<ProductInfo>(emptyProduct);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [loading, setIsLoading] = useState(false);

  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const router = useRouter();


  const subcategories =
    categories.find((cat) => cat.title === selectedParent)?.subcategories ?? [];

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);

   
    e.target.value = "";
  };

  const resetForm = () => {
    previews.forEach((url) => URL.revokeObjectURL(url));
    setProductInfo(emptyProduct);
    setSelectedParent("");
    setSelectedSub("");
    setImages([]);
    setPreviews([]);
    setActiveIndex(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();



    if (Number(productInfo.price) > Number(productInfo.cuttedPrice) && productInfo.cuttedPrice !== "") {
      toast.add({
        type: "error",
        description: "Cutted price can't be greater than the price",
      });
      return;
    }

    if (
      !productInfo.title ||
      !productInfo.description ||
      !productInfo.category ||
      !productInfo.price  
    ) {
      toast.add({
            type:"error",
           description: "Please fill in all requied feilds"});
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", productInfo.title);
    formData.append("description", productInfo.description);
    formData.append("category", productInfo.category);
    formData.append("subcategory", productInfo.subcategory);
    formData.append("price",productInfo.price)
    formData.append("cuttedPrice",productInfo.cuttedPrice)

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const res = await fetch(`${baseUrl}/api/products`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.add({
            type:"error",
           description: "Something went wrong"});
        return;
      }

    
          toast.add({
            type:"success",
           description: "Product has been added successfully"});
      resetForm();
      router.refresh();
    } catch (error) {
   toast.add({
            type:"error",
           description: "Failed to submit the product"});
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);

    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));

    setActiveIndex((prev) => {
      if (prev > index) return prev - 1;
      if (prev === index) return Math.max(0, prev - 1);
      return prev;
    });

    setTimeout(() => {
      swiperRef.current?.slideTo(Math.max(0, index - 1));
    }, 0);
  };

  return (
    <div className="w-full h-max overflow-y-scroll flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          className="rounded-full"
          variant="secondary"
          size="icon-lg"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </Button>
        <h1 className="font-semibold text-2xl lg:text-4xl">Add Product</h1>
      </div>

      <form
        className="flex flex-col lg:flex-row items-center justify-between p-5 lg:p-10"
        onSubmit={handleSubmit}
      >
        {/* Images */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <div className="w-full">
            <h1 className="font-semibold text-2xl p-5 text-neutral-800">
              Add image
            </h1>

            <input
              type="file"
              className="hidden"
              id="img"
              multiple
              accept="image/*"
              onChange={handleFiles}
            />
          </div>

          <div
            className={`${images.length ? "w-full h-full relative p-5 bg-gray-50 rounded-2xl" : "hidden"}`}
          >
            <Swiper
              className="w-full h-full min-w-0"
              modules={[Navigation, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
            >
              {previews.map((src, i) => (
                <SwiperSlide
                  className="!w-full h-full flex items-center justify-center"
                  key={src}
                >
                  <Image
                    src={src}
                    alt={`Image${i}`}
                    height={500}
                    width={500}
                    unoptimized
                    className="w-full h-full object-contain max-w-full max-h-full rounded-xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex items-center gap-4 px-5">
            {previews.map((src, i) => (
              <div
                className="h-[5rem] w-[5rem] relative"
                onClick={() => swiperRef.current?.slideTo(i)}
                key={src}
              >
                <Button
                  type="button"
                  variant="ghost"
                  className="cursor-pointer transition-all hover:bg-red-200 absolute top-0 right-0 z-10 text-red-500 hover:text-red-500 bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(i);
                  }}
                >
                  <Trash className="text-red-500 w-5 h-5" />
                </Button>
                <Image
                  src={src}
                  alt={`Image${i}`}
                  height={80}
                  width={80}
                  unoptimized
                  className={`${activeIndex === i ? "border-2 border-blue-400 opacity-100" : "border-0 opacity-70"} h-full w-full object-cover rounded-md`}
                />
              </div>
            ))}
            <label
              htmlFor="img"
              className={`${images.length ? "h-[5rem] w-[5rem]" : "w-full h-[50vh]"} cursor-pointer bg-gray-50 border-neutral-200 rounded-xl flex items-center justify-center gap-2`}
            >
              <span className="font-bold text-4xl">+</span>
            </label>
          </div>
        </div>

   
        <div className="w-full lg:w-[40%] p-0 lg:p-5 flex flex-col gap-8 mt-28 lg:mt-0">
          <label htmlFor="ProductName" className="text-sm flex flex-col gap-2">
            Name
            <Input
              id="ProductName"
              placeholder="Enter the Product name"
              value={productInfo.title}
              onChange={(e) =>
                setProductInfo((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </label>
          <div className="flex items-center lg:flex-row flex-col">

                 <label htmlFor="price" className="text-sm flex flex-col gap-2">
            Price
            <Input
              id="price"
              type="number"
              placeholder="Enter the price"
              value={productInfo.price}
              onChange={(e) =>
                setProductInfo((prev) => ({ ...prev, price: e.target.value }))
              }
              required
              />
          </label>
                       <label htmlFor="cuttedPrice" className="text-sm flex flex-col gap-2">
          Cutted Price
            <Input
              id="cuttedPrice"
              type="number"
              placeholder="Enter the cuttted price"
              value={productInfo.cuttedPrice}
              onChange={(e) =>
                setProductInfo((prev) => ({ ...prev, cuttedPrice: e.target.value }))
              }
              
            />
          </label>
              </div>

          <label htmlFor="desc" className="text-sm flex flex-col gap-2">
            Description
            <Textarea
              id="desc"
              placeholder="Enter description"
              value={productInfo.description}
              onChange={(e) =>
                setProductInfo((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              required
            />
          </label>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-left">Category</span>

            {/* This ToggleGroup uses string[] for value/onValueChange */}
            <ToggleGroup
              value={selectedParent ? [selectedParent] : []}
              onValueChange={(vals: string[]) => {
                const val = vals[0] ?? "";
                setSelectedParent(val);
                setSelectedSub("");
                setProductInfo((prev) => ({
                  ...prev,
                  category: val,
                  subcategory: "",
                }));
              }}
              className="flex flex-wrap"
            >
              {categories.map((cat) => (
                <ToggleGroupItem
                  key={cat.title}
                  value={cat.title}
                  className="border rounded-full"
                >
                  {cat.title}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {selectedParent && (
            <div className="mt-4">
              <h3 className="text-sm mb-2">Subcategories</h3>

              {subcategories.length === 0 ? (
                <p className="text-sm text-neutral-500">
                  No subcategories for this category
                </p>
              ) : (
                <ToggleGroup
                  value={selectedSub ? [selectedSub] : []}
                  onValueChange={(vals: string[]) => {
                    const val = vals[0] ?? "";
                    setSelectedSub(val);
                    setProductInfo((prev) => ({ ...prev, subcategory: val }));
                  }}
                  className="flex flex-wrap"
                >
                  {subcategories.map((sub) => (
                    <ToggleGroupItem
                      key={sub.title}
                      value={sub.title}
                      className="border"
                    >
                      {sub.title}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              )}
            </div>
          )}

          <Button
            type="submit"
            className="mt-4 w-full mx-auto flex items-center gap-2 rounded-full py-5"
            disabled={loading}
          >
            {loading && <Spinner className="mr-2" />}
            {loading ? "Please wait" : "Add"}
          </Button>
        </div>
      </form>
    </div>
  );
}