/** @format */

import EditProduct from "@/components/Layout/Form/EditProduct/EditProduct";
import React from "react";

function Page({
  params,
}: {
  params: {
    id: string;
    slug: string;
    cafeName: string;
  };
}) {
  return (
    <div className=" w-full flex  flex-col justify-start px-56 min-h-screen ">
      <h1 className=" text-[#153448] text-2xl my-24 font-semibold ">
        ویرایش محصول
      </h1>
      <div className=" w-full ">
        <EditProduct param={params} />
      </div>
    </div>
  );
}

export default Page;
