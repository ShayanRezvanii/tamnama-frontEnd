/** @format */
"use client";
import {
  Category,
  Home,
  Logout,
  LogoutCurve,
  ProfileCircle,
  Shop,
} from "iconsax-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { Profiler, useEffect, useState } from "react";
import Cookies from "js-cookie";
import useGetCategoryList from "@/util/hooks/Category/GetCategory";

function Navbar({ param }: { param?: string }) {
  const path = usePathname();
  const router = useRouter();
  const [shopName, setShopName] = useState<string | null>();
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("shopName");
    router.replace("/login");
  };

  const pa = path.split("/")[1];
  const getCategoryList = useGetCategoryList(pa);

  useEffect(() => {
    const name = Cookies.get("shopName");
    setShopName(name);
  }, []);

  console.log(getCategoryList);

  return (
    <div className=" w-full bg-white backdrop-blur-sm  sm:max-w-[1330px] mx-auto mt-6 sticky top-0  rounded-lg  h-[48px] p-10 flex items-center">
      <div className=" w-full flex justify-between">
        <ul className=" flex gap-10">
          <Link href={`/${shopName}`}>
            <li className=" cursor-pointer bg-[#3C5B6F] flex gap-x-3 p-2 rounded-lg py-2 ">
              <Home variant="Bold" className="text-white" />
              <p className=" text-xl text-white font-semibold">خانه</p>
            </li>
          </Link>
          <Link href={`/${shopName}/category`}>
            <li className=" cursor-pointer  rounded-lg flex gap-3 hover:bg-[#3C5B6F]/20 p-2  duration-300 py-2 ">
              <Category variant="Bold" className="text-[#3C5B6F]" />

              <p className=" text-[#153448] outline-none text-xl  font-semibold">
                دسته بندی ها
              </p>
            </li>
          </Link>

          {/* product condition */}
          {getCategoryList?.data?.allCategory?.categories?.length === 0 ? (
            <li
              className={` relative rounded-lg flex gap-3 p-2 group cursor-pointer duration-300 py-2 `}
            >
              <Shop variant="Bold" className="text-gray-400" />{" "}
              <p className=" text-gray-400 text-xl  font-semibold">محصول ها</p>
              <div className=" absolute bg-gray-400/40 opacity-0 duration-200  group-hover:opacity-100 h-fit p-1 rounded top-10 right-4  text-xs w-fit z-40">
                <p>دسته بندی اضافه نمایید</p>
              </div>
            </li>
          ) : (
            <Link href={`/${shopName}/products `}>
              <li
                className={` rounded-lg flex gap-3 hover:bg-[#3C5B6F]/20 p-2  duration-300 py-2 `}
              >
                <Shop variant="Bold" className="text-[#3C5B6F]" />{" "}
                <p className=" text-[#153448] text-xl  font-semibold">
                  محصول ها
                </p>
              </li>
            </Link>
          )}

          <Link href={`/${shopName}/profile`}>
            <li
              className={` cursor-pointer  rounded-lg flex gap-3 hover:bg-[#3C5B6F]/20 p-2  duration-300 py-2 `}
            >
              <ProfileCircle variant="Bold" className="text-[#3C5B6F]" />{" "}
              <p className=" text-[#153448]  text-xl  font-semibold">پروفایل</p>
            </li>
          </Link>
        </ul>
      </div>

      <div className="text-[#153448]    flex gap-3 items-center  text-xl font-semibold">
        <div className=" w-full">
          <p className=" text-xl">{shopName}</p>
        </div>
        <LogoutCurve
          onClick={logout}
          size={40}
          className=" text-[#153448] cursor-pointer hover:text-[#153448]/40 duration-200"
        />
      </div>
    </div>
  );
}

export default Navbar;
