/** @format */
"use client";
import axiosInstance from "@/util/axiosInstance";
import Cookies from "js-cookie";

export const AddingProduct = async ({
  shopName,
  category,
  title,
  description,
  price,
  imageURL,
}: {
  shopName: string;
  category: string;
  title: string;
  description: string;
  price: string;
  imageURL: string;
}) => {
  const response = await axiosInstance.post(`/products/create`, {
    title: title,
    shopName: shopName,
    price: price,
    imageURL: imageURL,
    description: description,
    category: category,
  });
  if (response.status === 200) {
    return response.data;
  } else if (response.data.isError) {
    throw response.data.error.description;
  } else {
    throw new Error();
  }
};
