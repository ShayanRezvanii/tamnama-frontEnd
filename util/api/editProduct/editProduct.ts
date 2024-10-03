/** @format */
"use client";
import axiosInstance from "@/util/axiosInstance";
import Cookies from "js-cookie";

export const editProduct = async ({
  shopName,
  category,
  title,
  description,
  price,
  imageURL,
  id,
}: {
  shopName: string;
  category: string;
  title: string;
  description: string;
  price: string;
  imageURL: string;
  id: string;
}) => {
  const response = await axiosInstance.post(`/products/update/${id}`, {
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
