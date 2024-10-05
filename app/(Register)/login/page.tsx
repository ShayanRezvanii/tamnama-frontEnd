/** @format */
"use client";
import React from "react";
import LoginForm from "@/components/Layout/Form/LoginForm/LoginForm";

function Page() {
  return (
    <div className=" w-full flex justify-between items-center min-h-screen">
      <div className=" w-full max-w-[650px] px-32">
        <h1 className=" text-center text-[#FF6600] font-semibold">ورود</h1>
        <LoginForm />
      </div>
      <div className=" w-full bg-[#FF6600] flex flex-col justify-center items-center min-h-screen">
        <div className=" w-fit rounded-2xl p-6 bg-white shadow-lg shadow-black ">
          <h1 className=" text-center text-9xl text-[#FF6600]">TAM</h1>
          <h1 className=" text-center text-5xl text-[#FF6600]">NAMA</h1>
        </div>
      </div>
    </div>
  );
}

export default Page;
