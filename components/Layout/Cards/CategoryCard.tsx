/** @format */
"use client";
import { deleteCategory } from "@/util/api/addCategory/deleteCategory";
import { Add, ArrowLeft2, ArrowRight2, Coffee, Trash } from "iconsax-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import type { FC } from "react";
import { useRef } from "react";
import { MoveCategories } from "@/util/api/addCategory/moveCategory";

interface CategoryCardProps {
  data: any;
  param: string;
  currentIndex: number;
  totalCategories: number;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

function CategoryCard({
  data,
  param,
  currentIndex,
  totalCategories,
}: CategoryCardProps) {
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
  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data, variables, context) => {
      setResult(true);
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
      setReset(initialValues);
      setCats([]);
    },
    onError: (error, variables, context) => {
      setResult(true);
      console.log(error);
    },
  });
  console.log(data);

  const moveCategoryMutation = useMutation({
    mutationFn: MoveCategories,
    onSuccess: (data, variables, context) => {
      setResult(true);
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
      setReset(initialValues);
      setCats([]);
    },
    onError: (error, variables, context) => {
      setResult(true);
      console.log(error);
    },
  });

  console.log(totalCategories);
  console.log(currentIndex);

  const handleMove = (direction: string) => {
    let newIndex;
    if (direction === "left") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    } else if (direction === "right") {
      newIndex =
        currentIndex < totalCategories - 1
          ? currentIndex + 1
          : totalCategories - 1;
    }
    moveCategoryMutation.mutate({
      shopName: param,
      categoryId: data.id,
      newIndex: newIndex,
    });
  };
  return (
    <div className=" flex relative flex-col justify-center items-center group  ">
      <div className="  bg-white shadow-lg w-[160px]   cursor-pointer duration-200 group-hover:bg-[#DFD0B8]/70  py-4 px-6 border rounded-xl">
        <div
          onClick={() => {
            deleteCategoryMutation.mutate({
              shopName: param,
              id: data.id,
            });
          }}
          className=" bg-white rounded-full group-hover:block hidden  duration-200 absolute shadow-lg cursor-pointer left-[-10px] top-[-10px]"
        >
          <Add className=" rotate-45" />
        </div>

        <div className=" flex flex-col justify-center items-center gap-1">
          {/* <Coffee /> */}
          <div className=" w-10 h-10 relative">
            <Image src={`/${data[0].icon}`} fill alt="icon" />
          </div>
          <h1 className=" text-lg text-[#153448]">{data[0].name}</h1>
        </div>
      </div>
      <div className=" w-full opacity-0 group-hover:opacity-100 duration-200  h-8 my-4 rounded-xl">
        <div className=" w-full items-center h-full px-2 justify-between flex">
          <ArrowRight2
            onClick={() => handleMove("left")}
            className=" cursor-pointer hover:bg-gray-200 duration-200 rounded-full p-1"
            size={24}
          />
          <p>جابجایی</p>
          <ArrowLeft2
            onClick={() => handleMove("right")}
            className=" cursor-pointer hover:bg-gray-200 duration-200 rounded-full p-1"
            size={24}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
