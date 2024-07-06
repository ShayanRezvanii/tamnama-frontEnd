/** @format */
"use client";
import axiosInstance from "@/util/axiosInstance";
import Cookies from "js-cookie";

export const AddCategories = async ({
  shopName,
  categories,
}: {
  shopName: string;
  categories?: string[];
}) => {
  const response = await axiosInstance.post(`/category/addCategory`, {
    shopName: shopName,
    categories: categories,
  });
  if (response.status === 200) {
    return response.data;
  } else if (response.data.isError) {
    throw response.data.error.description;
  } else {
    throw new Error();
  }
};
