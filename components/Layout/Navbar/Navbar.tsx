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
import { redirect, usePathname, useRouter } from "next/navigation";
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
  const pathApp = path.split("/")[2];

  useEffect(() => {
    const shopName = Cookies.get("shopName");
    setShopName(shopName);
  }, []);
  console.log(pathApp);
  console.log(pa);
  console.log(getProfile?.data?.profile === null);

  useEffect(() => {
    if (getProfile?.data?.profile === null && shopName) {
      router.push(`/${shopName}/profile`);
    }
  }, [getProfile, shopName, router]);

  return (
    <div className=" w-full  select-none bg-[#525151] max-w-[280px] h-full items-center border-l border-[#F5F5F5]/20 p-10 flex flex-col justify-between ">
      {getProfile?.data?.profile !== null ? (
        <div className=" flex-col flex gap-4 justify-center items-center">
          <div className=" w-28 h-28 relative shadow-lg rounded-2xl">
            <Image
              src={`https://tamback.nsjsoft.ir/api/${getProfile?.data?.profile?.imageURL}`}
              alt="profile"
              fill
              unoptimized
              className=" rounded-2xl object-cover"
            />
          </div>
          <p className=" font-semibold text-[#F5F5F5]">{shopName}</p>
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
        {getProfile?.data?.profile === null ? (
          <li
            className={` cursor-not-allowed rounded-lg flex gap-3  px-4 py-2  duration-300 
              ${pathApp === undefined ? "bg-[#FF6600]" : null}`}
          >
            <Home variant="Bold" className="text-[#6f6e6d]" />
            <p className=" text-xl text-[#6f6e6d] font-semibold">خانه</p>
          </li>
        ) : (
          <Link href={`/${shopName}`} className={` no-underline`}>
            <li
              className={`  ${
                getProfile?.data?.profile === null
                  ? " cursor-not-allowed"
                  : "cursor-pointer"
              }   rounded-lg flex gap-3 hover:bg-[#FF6600] px-4 py-2  duration-300 
              ${pathApp === undefined ? "bg-[#FF6600]" : null}`}
            >
              <Home variant="Bold" className="text-[#F5F5F5]" />
              <p className=" text-xl text-[#F5F5F5] font-semibold">خانه</p>
            </li>
          </Link>
        )}

        {getProfile?.data?.profile === null ? (
          <li
            className={` cursor-not-allowed  rounded-lg flex gap-3  px-4 py-2  duration-300  ${
              pathApp === "category" ? "bg-[#FF6600]" : null
            } `}
          >
            <Category variant="Bold" className="text-[#6f6e6d]" />

            <p className=" text-[#6f6e6d] outline-none text-xl  font-semibold">
              دسته بندی ها
            </p>
          </li>
        ) : (
          <Link href={`/${shopName}/category`} className=" no-underline">
            <li
              className={` cursor-pointer  rounded-lg flex gap-3 hover:bg-[#FF6600] px-2 py-2  duration-300  ${
                pathApp === "category" ? "bg-[#FF6600]" : null
              } `}
            >
              <Category variant="Bold" className="text-[#F5F5F5]" />

              <p className=" text-[#F5F5F5] outline-none text-xl  font-semibold">
                دسته بندی ها
              </p>
            </li>
          </Link>
        )}

        {/* product condition */}

        {getCategoryList?.data?.allCategory?.categories?.length === 0 ||
        getProfile?.data?.profile === null ? (
          <li
            className={` relative rounded-lg flex gap-3 p-2 group cursor-not-allowed duration-300 py-2 `}
          >
            <Shop variant="Bold" className="text-[#6f6e6d]" />
            <p className=" text-[#6f6e6d] text-xl  font-semibold">محصول ها</p>
            {getCategoryList?.data?.allCategory?.categories?.length === 0 ? (
              <div className=" absolute bg-gray-400/40 opacity-0 duration-200  group-hover:opacity-100 h-fit p-1 rounded top-10 right-4  text-xs w-fit z-40">
                <p>دسته بندی اضافه نمایید</p>
              </div>
            ) : null}
          </li>
        ) : (
          <Link href={`/${shopName}/products `} className="no-underline">
            <li
              className={` cursor-pointer  rounded-lg flex gap-3 hover:bg-[#FF6600] px-2 py-2  duration-300  ${
                pathApp === "products" ? "bg-[#FF6600]" : null
              } `}
            >
              <Shop variant="Bold" className="text-[#F5F5F5]" />{" "}
              <p className=" text-[#F5F5F5] text-xl  font-semibold">محصول ها</p>
            </li>
          </Link>
        )}

        <Link href={`/${shopName}/profile`} className="no-underline">
          <li
            className={` cursor-pointer  rounded-lg flex gap-3 hover:bg-[#FF6600] px-2 py-2  duration-300  ${
              pathApp === "profile" ? "bg-[#FF6600]" : null
            } `}
          >
            <ProfileCircle variant="Bold" className="text-[#F5F5F5]" />{" "}
            <p className=" text-[#F5F5F5]  text-xl  font-semibold">پروفایل</p>
          </li>
        </Link>
      </ul>
      <div
        onClick={logout}
        className=" w-full cursor-pointer flex group gap-3 px-6 py-2"
      >
        {/* <p className=" text-xl text-white">{shopName}</p> */}
        <LogoutCurve
          size={24}
          variant="Bold"
          className=" text-[#FF6600]    duration-200"
        />
        <p className=" text-[#FF6600] hover:text-[#F3F0CA] duration-200 text-xl  font-semibold">
          خروج
        </p>
      </div>
    </div>
  );
}

export default Navbar;
