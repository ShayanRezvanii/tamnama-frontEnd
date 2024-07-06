/** @format */
"use client";
import axiosInstance from "@/util/axiosInstance";
import Cookies from "js-cookie";

export const deleteCategory = async ({
  shopName,
  category,
}: {
  shopName: string;
  category: string;
}) => {
  const response = await axiosInstance.post(
    `/category/deleteCategory?shopName=${shopName}`,
    {
      shopName: shopName,
      categoryName: category,
    }
  );
  if (response.status === 200) {
    return response.data;
  } else if (response.data.isError) {
    throw response.data.error.description;
  } else {
    throw new Error();
  }
};
