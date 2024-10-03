/** @format */
"use client";
import AddCategory from "@/components/Layout/Form/AddCategory/AddCategory";
import { Coffee } from "iconsax-react";
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
    <div className=" w-full flex justify-center  min-h-screen ">
      <div className=" w-full max-w-[440px] mt-20 ">
        <AddCategory param={params.cafeName} />
      </div>
    </div>
  );
}

export default Page;
