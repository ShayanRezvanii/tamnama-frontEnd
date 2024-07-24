/** @format */
"use client";
import axiosInstance from "@/util/axiosInstance";
import Cookies from "js-cookie";

export const AddingProfile = async ({
  firstColor,
  secondColor,
  workTime,
  phone,
  imageURL,
}: {
  firstColor: string;
  secondColor: string;
  phone: string;
  workTime: string;
  imageURL: string;
}) => {
  const response = await axiosInstance.post(`/users/profile`, {
    firstColor,
    secondColor,
    workTime,
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
