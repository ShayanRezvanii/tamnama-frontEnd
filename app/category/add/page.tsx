/** @format */
"use client";
import AddCategory from "@/components/Layout/Form/AddCategory/AddCategory";
import React from "react";

function Page() {
  return (
    <div className=" w-full flex justify-center  min-h-screen ">
      <div className=" w-full max-w-[440px] mt-20 ">
        <AddCategory />
      </div>
    </div>
  );
}

export default Page;
