/** @format */

"use client";
import axiosInstance from "../../axiosInstance";
import { useQuery } from "@tanstack/react-query";

const GetProducts = async (id?: string) => {
  try {
    const data = await axiosInstance.get(`/products/getProduct/${id}`);
    return data.data;
  } catch (error) {
    throw new Error();
  }
};
const useGetSingleProduct = (id: string) => {
  return useQuery({
    queryKey: ["singleProduct", id],
    queryFn: () => GetProducts(id),
  });
};
export default useGetSingleProduct;
