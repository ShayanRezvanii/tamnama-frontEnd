/** @format */
"use client";
import axiosInstance from "@/util/axiosInstance";
import Cookies from "js-cookie";
type Cat = {
  name: string;
  icon: string;
};

export const MoveCategories = async ({
  shopName,
  categoryId,
  newIndex,
}: {
  shopName: string;
  categoryId: number;
  newIndex?: number;
}) => {
  const response = await axiosInstance.post(`/category/moveCategory`, {
    shopName: shopName,
    categoryId: categoryId,
    newIndex: newIndex,
  });
  if (response.status === 200) {
    return response.data;
  } else if (response.data.isError) {
    throw response.data.error.description;
  } else {
    throw new Error();
  }
};
