/** @format */

"use client";
import axiosInstance from "../../axiosInstance";
import { useQuery } from "@tanstack/react-query";

const GetCategory = async (name?: string) => {
  try {
    const data = await axiosInstance.get(
      `/category/getCategory?shopName=${name}`
    );
    return data.data;
  } catch (error) {
    throw new Error();
  }
};
const useGetCategoryList = (name: string) => {
  return useQuery({
    queryKey: ["categoryList", name],
    queryFn: () => GetCategory(name),
  });
};
export default useGetCategoryList;
