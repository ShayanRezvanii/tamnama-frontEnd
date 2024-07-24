/** @format */

import React from "react";

function Welcome() {
  return (
    <div className=" w-full h-screen flex justify-center flex-col items-center ">
      <div className=" flex flex-col gap-3">
        <h1 className=" text-4xl select-none text-[#153448] font-semibold">
          به پنل مدیریت خود خوش آمدید
        </h1>
        <p className=" text-sm text-center">
          {` برای مدیریت منوی خود از "نوار بالا" بخش مورد نظر را انتخاب نمایید`}
        </p>
      </div>
    </div>
  );
}

export default Welcome;
