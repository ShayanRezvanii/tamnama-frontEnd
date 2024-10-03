/** @format */
"use client";
import PrimaryBtn from "@/components/Layout/Buttons/PrimaryBtn";
import CategoryCard from "@/components/Layout/Cards/CategoryCard";
import useGetCategoryList from "@/util/hooks/Category/GetCategory";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import searchFound from "@/public/icons/sticker_12743942.gif";
import Image from "next/image";
import Cookies from "js-cookie";

function Page({
  params,
}: {
  params: {
    cafeName: string;
    slug: string;
  };
}) {
  const getCategoryList = useGetCategoryList(params.cafeName);
  console.log(getCategoryList);
  const router = useRouter();

  console.log(getCategoryList.data);
  const [shopName, setShopName] = useState<string | null>();

  useEffect(() => {
    const shopName = Cookies.get("shopName");
    setShopName(shopName);

    if (!shopName) {
      Cookies.remove("token");
      redirect("/login");
    }
  }, []);
  return (
    <div className=" w-full  px-28 ">
      <div className=" flex justify-between mt-24 items-center">
        <div className="border-r px-4">
          <h1 className=" text-[#FF6600] text-2xl font-semibold ">
            دسته بندی ها
          </h1>
          <span className=" text-[#525151] text-sm">
            شما می‌توانید با قرار دادن نشانگر ماوس روی هر دسته‌بندی، اولویت آن
            دسته را تغییر دهید.
          </span>
        </div>

        <div>
          <PrimaryBtn
            onClick={() => router.push(`/${params.cafeName}/category/add`)}
          >
            اضافه کردن دسته بندی
          </PrimaryBtn>
        </div>
      </div>

      <div className=" w-full flex gap-6 mt-10">
        {getCategoryList?.data?.allCategory?.categories.length > 0 &&
        !getCategoryList.isPending ? (
          <>
            <div className=" w-full flex flex-wrap gap-6 mt-10">
              {getCategoryList?.data?.allCategory?.categories.map(
                (item: any, index: number) => {
                  return (
                    <CategoryCard
                      param={params.cafeName}
                      data={item}
                      key={index}
                      currentIndex={index}
                      totalCategories={
                        getCategoryList.data?.allCategory?.categories?.length
                      }
                    />
                  );
                }
              )}
            </div>
          </>
        ) : (
          <>
            {getCategoryList?.isPending ? (
              <div className="flex gap-x-2 p-2 w-full   justify-center items-center ">
                <div className="h-3 w-3 bg-[#153448] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-3 w-3 bg-[#153448] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-3 w-3 bg-[#153448] rounded-full animate-bounce"></div>
              </div>
            ) : (
              <div className="flex flex-col gap-6 p-2 w-full  justify-center items-center ">
                <Image
                  alt=""
                  src={searchFound}
                  className=" text-center rounded-2xl w-32 h-32 mt-40 text-3xl text-[#525151]"
                />
                <p className=" text-lg font-bold">دسته ای یافت نشد</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
