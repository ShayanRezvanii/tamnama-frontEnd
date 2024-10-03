/** @format */
"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import welcome from "@/public/icons/mat_10509470.png";

function Welcome() {
  return (
    <div className=" w-full h-screen flex justify-center flex-col items-center ">
      <div className=" flex   items-center gap-6">
        <Image src={welcome} alt="welcome" className="w-40 h-40 select-none" />
        <div className=" flex flex-col gap-4">
          <h1 className=" text-5xl select-none text-[#525151] font-semibold">
            به پنل مدیریت خوش آمدید
          </h1>
          <p className=" text-sm text-[#525151] text-center">
            {` برای مدیریت منوی خود از "منوی سمت راست" بخش مورد نظر را انتخاب نمایید`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
