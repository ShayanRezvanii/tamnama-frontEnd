/** @format */
"use client";
import PrimaryBtn from "@/components/Layout/Buttons/PrimaryBtn";
import CategoryCard from "@/components/Layout/Cards/CategoryCard";
import ProductCard from "@/components/Layout/Cards/ProductCard";
import useGetCategoryList from "@/util/hooks/Category/GetCategory";
import useGetProductList from "@/util/hooks/Products/GetProduct";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import searchFound from "@/public/icons/sticker_12743942.gif";
import Cookies from "js-cookie";

function Page({
  params,
}: {
  params: {
    cafeName: string;
    slug: string;
  };
}) {
  const router = useRouter();
  const getProductList = useGetProductList(params.cafeName);
  console.log(getProductList);

  const getCategoryList = useGetCategoryList(params.cafeName);

  useEffect(() => {
    if (getCategoryList?.data?.allCategory?.categories.length <= 0) {
      redirect(`/${params.cafeName}/category`);
    }
  });

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
          <h1 className=" text-[#FF6600] text-2xl font-semibold ">محصول ها</h1>
          <span className=" text-[#525151] text-sm">
            محصولات خود را در این بخش اضافه نمایید.
          </span>
        </div>
        <div>
          <PrimaryBtn
            onClick={() => router.push(`/${params.cafeName}/products/add`)}
          >
            اضافه کردن محصول
          </PrimaryBtn>
        </div>
      </div>

      {getProductList?.data?.foundedProduct?.length > 0 &&
      !getProductList.isPending ? (
        <>
          <div className=" w-full grid grid-cols-4 gap-4 mt-10">
            {getProductList?.data?.foundedProduct?.map(
              (item: any, index: number) => {
                return <ProductCard data={item} key={index} />;
              }
            )}
          </div>
        </>
      ) : (
        <>
          {getProductList?.isPending ? (
            <div className="flex gap-x-2 p-2 w-full  justify-center items-center ">
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
              <p className=" text-lg font-bold">محصولی یافت نشد</p>
            </div>
          )}
        </>
      )}

      <></>
    </div>
  );
}

export default Page;
