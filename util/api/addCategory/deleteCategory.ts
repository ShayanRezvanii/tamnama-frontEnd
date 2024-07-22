/** @format */
"use client";
import axiosInstance from "@/util/axiosInstance";
import Cookies from "js-cookie";

export const deleteCategory = async ({
  shopName,
  id,
}: {
  shopName: string;
  id: number;
}) => {
  const response = await axiosInstance.post(
    `/category/deleteCategory?shopName=${shopName}`,
    {
      shopName: shopName,
      categoryId: id,
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
