/** @format */
"use client";
import axiosInstance from "@/util/axiosInstance";
import Cookies from "js-cookie";

export const deleteProduct = async ({ id }: { id: number }) => {
  const response = await axiosInstance.post(`/products/remove`, {
    productId: id,
  });
  if (response.status === 200) {
    return response.data;
  } else if (response.data.isError) {
    throw response.data.error.description;
  } else {
    throw new Error();
  }
};
