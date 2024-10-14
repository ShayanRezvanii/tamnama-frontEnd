/** @format */
"use client";
import { deleteCategory } from "@/util/api/addCategory/deleteCategory";
import { Add, Trash } from "iconsax-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { deleteProduct } from "@/util/api/addProduct/deleteProduct";
interface CategoryCardProps {
  data: any;
}

function ProductCard({ data }: CategoryCardProps) {
  const [reset, setReset] = useState({});
  const router = useRouter();
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState<string>("");
  const [cats, setCats] = useState<string[]>([]);
  const initialValues = {
    shopName: "",
    categories: "",
  };

  const [result, setResult] = useState(false);
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data, variables, context) => {
      setResult(true);
      queryClient.invalidateQueries({ queryKey: ["productList"] });
      setReset(initialValues);
      setCats([]);
    },
    onError: (error, variables, context) => {
      setResult(true);
      console.log(error);
    },
  });

  console.log(data);

  return (
    <div className=" flex relative flex-col  justify-center items-center group ">
      <div className="  bg-white border shadow-lg duration-200 cursor-pointer hover:bg-[#FF6600]/10 w-full z-40 rounded-xl">
        {/* delete product to future */}
        <div
          onClick={() => {
            deleteProductMutation.mutate({
              id: data._id,
            });
          }}
          className=" bg-white rounded-full z-30 group-hover:block hidden  duration-200 absolute shadow-lg cursor-pointer left-[-10px] top-[-10px]"
        >
          <Add className=" rotate-45" />
        </div>

        <Link href={`products/${data._id}`} className=" w-full flex flex-col">
          <div className=" w-full  h-40 relative ">
            <Image
              alt="product-image"
              className=" object-cover rounded-tr-xl rounded-tl-xl"
              fill
              unoptimized
              src={`http://tamnama.nsjsoft.ir:8080/api/${data.imageURL}`}
            />
          </div>

          <div className=" w-full flex gap-y-2 flex-col pr-4 pl-6 py-4">
            <div className=" w-full flex justify-between items-center">
              <p className=" text-base text-left text-[#153448]/70">
                {data.category}
              </p>
              <h1 className=" text-3xl text-left text-[#153448]">
                {data.title}
              </h1>
            </div>
            <p className=" text-lg text-left text-[#153448]">{data.price}T</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
