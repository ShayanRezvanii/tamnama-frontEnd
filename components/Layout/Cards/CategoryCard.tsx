/** @format */
"use client";
import { deleteCategory } from "@/util/api/addCategory/deleteCategory";
import { Add, Trash } from "iconsax-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
interface CategoryCardProps {
  data: any;
}

function CategoryCard({ data }: CategoryCardProps) {
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
  return (
    <div className=" flex relative flex-col justify-center items-center group ">
      <div className="  bg-[#DFD0B8] shadow-lg duration-200 hover:bg-[#DFD0B8]/70  c p-10 rounded-xl">
        <div
          onClick={() => {
            deleteCategoryMutation.mutate({
              shopName: "t-cafe",
              category: data,
            });
          }}
          className=" bg-white rounded-full group-hover:block hidden  duration-200 absolute shadow-lg cursor-pointer left-[-10px] top-[-10px]"
        >
          <Add className=" rotate-45" />
        </div>
        <h1 className=" text-lg text-[#153448]">{data}</h1>
      </div>
    </div>
  );
}

export default CategoryCard;
