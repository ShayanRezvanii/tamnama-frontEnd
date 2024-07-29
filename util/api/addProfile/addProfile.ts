/** @format */
"use client";
import axiosInstance from "@/util/axiosInstance";
import Cookies from "js-cookie";

export const AddingProfile = async ({
  firstColor,
  workTime,
  phone,
  imageURL,
  address,
}: {
  firstColor: string;
  phone: string;
  workTime: string;
  imageURL: string;
  address: string;
}) => {
  const response = await axiosInstance.post(`/users/profile`, {
    firstColor,
    workTime,
    address,
    phone,
    imageURL,
  });
  if (response.status === 200) {
    return response.data;
  } else if (response.data.isError) {
    throw response.data.error.description;
  } else {
    throw new Error();
  }
};
