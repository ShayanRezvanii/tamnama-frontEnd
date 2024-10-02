/** @format */

import AddProfile from "@/components/Layout/Form/AddProfile/AddProfile";
import Welcome from "@/components/pages/Home/Welcome";
import React from "react";

function page({ params }: { params: { slug: string } }) {
  return (
    <div className=" w-full py-10  px-40  mx-auto ">
      {/* <h1 className=" text-[#153448] text-2xl my-24 font-semibold ">
        نمای کافه
      </h1> */}

      <div className="border-r  px-4 my-14">
        <h1 className=" text-[#FF6600] text-2xl font-semibold ">پروفایل</h1>
        <span className=" text-[#525151] text-sm">
          شما می‌توانید در این بخش اطلاعات خود را ویرایش نمایید.
        </span>
      </div>

      <AddProfile param={params.slug} />
    </div>
  );
}

export default page;
