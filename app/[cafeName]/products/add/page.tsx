/** @format */
"use client";
import AddProduct from "@/components/Layout/Form/AddProduct/AddProduct";
import React from "react";

function Page({
  params,
}: {
  params: {
    cafeName: string;
    slug: string;
  };
}) {
  console.log(params);

  return (
    <div className=" w-full flex  mx-auto px-56  min-h-screen ">
      <div className=" w-full   ">
        <h1 className=" text-[#153448] text-2xl my-24 font-semibold ">
          اضافه کردن محصول
        </h1>

        <AddProduct param={params.cafeName} />
      </div>
    </div>
  );
}

export default Page;
