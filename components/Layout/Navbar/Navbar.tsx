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
import useGetUserProfile from "@/util/hooks/user/showProfile";
import Image from "next/image";

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
  const getProfile = useGetUserProfile(pa);

  console.log(getProfile?.data?.profile?.imageURL);

  return (
    <div className=" w-full max-w-[250px] bg-[#3A4750] backdrop-blur-sm min-h-screen items-center  p-10 flex flex-col justify-between ">
      {getProfile?.data?.profile ? (
        <div className=" flex-col flex gap-4 justify-center items-center">
          <div className=" w-24 h-24 relative">
            <Image
              src={`http://localhost:8000/api/${getProfile?.data?.profile?.imageURL}`}
              alt="profile"
              fill
              className=" rounded-full"
            />
          </div>
          <p className=" font-semibold text-white">
            {getProfile?.data?.profile?.shopName}
          </p>
        </div>
      ) : (
        <svg className="h-10 w-10 mt-10 animate-spin" viewBox="3 3 18 18">
          <path
            className="fill-red-400/20"
            d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
          ></path>
          <path
            className="fill-red-400"
            d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
          ></path>
        </svg>
      )}
      <ul className=" flex flex-col gap-6">
        <Link href={`/${getProfile?.data?.profile?.shopName}`}>
          <li className=" cursor-pointer hover:bg-[#3C5B6F]/70  flex gap-x-3 p-2 rounded-lg py-2 ">
            <Home variant="Bold" className="text-white" />
            <p className=" text-xl text-white font-semibold">خانه</p>
          </li>
        </Link>
        <Link href={`/${getProfile?.data?.profile?.shopName}/category`}>
          <li className=" cursor-pointer  rounded-lg flex gap-3 hover:bg-[#3C5B6F]/70 p-2  duration-300 py-2 ">
            <Category variant="Bold" className="text-white" />

            <p className=" text-white outline-none text-xl  font-semibold">
              دسته بندی ها
            </p>
          </li>
        </Link>

        {/* product condition */}
        {getCategoryList?.data?.allCategory?.categories?.length === 0 ? (
          <li
            className={` relative rounded-lg flex gap-3 p-2 group cursor-pointer duration-300 py-2 `}
          >
            <Shop variant="Bold" className="text-gray-300" />{" "}
            <p className=" text-gray-400 text-xl  font-semibold">محصول ها</p>
            <div className=" absolute bg-gray-400/40 opacity-0 duration-200  group-hover:opacity-100 h-fit p-1 rounded top-10 right-4  text-xs w-fit z-40">
              <p>دسته بندی اضافه نمایید</p>
            </div>
          </li>
        ) : (
          <Link href={`/${getProfile?.data?.profile?.shopName}/products `}>
            <li
              className={` rounded-lg flex gap-3 hover:bg-[#3C5B6F]/70 p-2  duration-300 py-2 `}
            >
              <Shop variant="Bold" className="text-white" />{" "}
              <p className=" text-white text-xl  font-semibold">محصول ها</p>
            </li>
          </Link>
        )}

        <Link href={`/${getProfile?.data?.profile?.shopName}/profile`}>
          <li
            className={` cursor-pointer  rounded-lg flex gap-3 hover:bg-[#3C5B6F]/70 p-2  duration-300 py-2 `}
          >
            <ProfileCircle variant="Bold" className="text-white" />{" "}
            <p className=" text-white  text-xl  font-semibold">پروفایل</p>
          </li>
        </Link>
      </ul>
      <div onClick={logout} className=" w-full cursor-pointer flex gap-3 p-2">
        {/* <p className=" text-xl text-white">{shopName}</p> */}
        <LogoutCurve
          size={24}
          className=" text-white  hover:text-[#153448]/40 duration-200"
        />
        <p className=" text-white  text-xl  font-semibold">خروج</p>
      </div>
    </div>
  );
}

export default Navbar;
