/** @format */

"use client";
import axiosInstance from "../../axiosInstance";
import { useQuery } from "@tanstack/react-query";

const GetProducts = async (name?: string) => {
  try {
    const data = await axiosInstance.get(`/products/list?shopName=${name}`);
    return data.data;
  } catch (error) {
    throw new Error();
  }
};
const useGetProductList = (name: string) => {
  return useQuery({
    queryKey: ["productList", name],
    queryFn: () => GetProducts(name),
  });
};
export default useGetProductList;
