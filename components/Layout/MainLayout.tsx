/** @format */

import React, { ReactNode } from "react";
import Navbar from "./Navbar/Navbar";
import useGetCategoryList from "@/util/hooks/Category/GetCategory";
import { useRouter } from "next/router";
function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" w-full sm:max-w-[1330px] relative mx-auto">
      <Navbar />
      {children}
    </div>
  );
}

export default MainLayout;
