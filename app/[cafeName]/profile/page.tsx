/** @format */

import AddProfile from "@/components/Layout/Form/AddProfile/AddProfile";
import Welcome from "@/components/pages/Home/Welcome";
import React from "react";

function page({ params }: { params: { slug: string } }) {
  return (
    <div className=" w-full  px-10 ">
      <h1 className=" text-[#153448] text-2xl my-24 font-semibold ">
        نمای کافه
      </h1>

      <AddProfile />
    </div>
  );
}

export default page;
