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
    <div className=" w-full flex justify-center  min-h-screen ">
      <div className=" w-full max-w-[440px] mt-20 ">
        <AddProduct param={params.cafeName} />
      </div>
    </div>
  );
}

export default Page;
