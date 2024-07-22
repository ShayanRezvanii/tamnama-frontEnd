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
    <div className=" w-full flex justify-center  min-h-screen ">
      <div className=" w-full max-w-[440px] mt-20 ">
        <EditProduct param={params} />
      </div>
    </div>
  );
}

export default Page;
