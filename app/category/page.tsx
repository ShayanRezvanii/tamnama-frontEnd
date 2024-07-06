/** @format */
"use client";
import PrimaryBtn from "@/components/Layout/Buttons/PrimaryBtn";
import CategoryCard from "@/components/Layout/Cards/CategoryCard";
import useGetCategoryList from "@/util/hooks/Category/GetCategory";
import { useRouter } from "next/navigation";
import React from "react";

function Page() {
  const getCategoryList = useGetCategoryList("t-cafe");
  console.log(getCategoryList);
  const router = useRouter();

  return (
    <div className=" w-full  px-10 ">
      <div className=" flex justify-between mt-24 items-center">
        <h1 className=" text-[#153448] text-2xl font-semibold ">
          دسته بندی ها
        </h1>
        <div>
          <PrimaryBtn onClick={() => router.push("/category/add")}>
            اضافه کردن دسته بندی
          </PrimaryBtn>
        </div>
      </div>

      <div className=" w-full flex gap-6 mt-10">
        {getCategoryList?.data?.allCategory?.categories.length > 0 ? (
          <>
            {getCategoryList?.data?.allCategory?.categories.map(
              (item: any, index: number) => {
                return <CategoryCard data={item} key={index} />;
              }
            )}
          </>
        ) : (
          <>
            <div className="flex gap-x-2 p-2 w-full  justify-center items-center ">
              <div className="h-3 w-3 bg-[#153448] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-3 w-3 bg-[#153448] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-3 w-3 bg-[#153448] rounded-full animate-bounce"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
