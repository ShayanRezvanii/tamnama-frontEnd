/** @format */

import React, { ReactNode } from "react";
import Navbar from "./Navbar/Navbar";
import useGetCategoryList from "@/util/hooks/Category/GetCategory";
import { useRouter } from "next/router";
function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" w-full flex bg-[#F5F5F5]   relative mx-auto">
      <div className=" w-full max-w-[280px] h-screen sticky top-0  ">
        <Navbar />
      </div>
      <div className=" w-full overscroll-y-scroll ">{children}</div>
    </div>
  );
}

export default MainLayout;
