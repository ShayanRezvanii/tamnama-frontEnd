/** @format */
"use client";
import axiosInstance from "@/util/axiosInstance";
import Cookies from "js-cookie";

export const Login = async ({
  email,
  password,
}: //   token,
{
  password: string;
  email: string;
  //   token?: string;
}) => {
  const response = await axiosInstance.post(`/users/login`, {
    email: email,
    password: password,
  });
  if (response.status === 200) {
    console.log(response.data.token);

    Cookies.set("token", response.data.token);

    return response.data;
  } else if (response.data.isError) {
    throw response.data.error.description;
  } else {
    throw new Error();
  }
};
