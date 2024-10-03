/** @format */

"use client";
import axiosInstance from "../../axiosInstance";
import { useQuery } from "@tanstack/react-query";

const GetUserProfile = async (name?: string) => {
  try {
    const data = await axiosInstance.get(`/users/showProfile?name=${name}`);
    return data.data;
  } catch (error) {
    throw new Error();
  }
};
const useGetUserProfile = (name: string) => {
  return useQuery({
    queryKey: ["userProfile", name],
    queryFn: () => GetUserProfile(name),
  });
};
export default useGetUserProfile;
