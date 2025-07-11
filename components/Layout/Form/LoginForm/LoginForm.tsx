/** @format */
"use client";
import React, { useState } from "react";
import ControlledInput from "@/components/Layout/Inputs/ControlledInput";
import { Form } from "@/components/Layout/Form/Form";
import PrimaryBtn from "@/components/Layout/Buttons/PrimaryBtn";
import {
  loginSchema,
  loginSchemaType,
} from "@/util/config/validation/loginSchema";
import { Login } from "@/util/api/login/login";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import Cookies from "js-cookie";
function LoginForm() {
  const router = useRouter();
  const [reset, setReset] = useState();
  const login = useMutation({
    mutationFn: Login,
    onSuccess(data, variables, context) {
      console.log(data);

      if (data.name) {
        setTimeout(() => {
          // router.refresh();
          Cookies.set("shopName", data.name);
          // router.push(`/${data.name}`);
          router.push(`${data.name}`);
        }, 2000);
      }
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<loginSchemaType> = async (data) => {
    login.mutate({
      email: data.email,
      password: data.password,
    });
  };
  return (
    <div className=" w-full ">
      <Form<loginSchemaType>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        resetValues={reset}
        className="w-full"
      >
        {({ register, formState: { errors }, setValue, control }) => (
          <div className="flex flex-col gap-0 lg:gap-1 ">
            <ControlledInput
              register={register}
              id="email"
              label="ایمیل"
              required
              PlaceHolder="Please enter email adress"
              type="email"
              error={errors.email?.message}
            />
            <ControlledInput
              register={register}
              id="password"
              label="کلمه عبور"
              required
              PlaceHolder="Please enter password"
              type="text"
              error={errors.password?.message}
            />

            <div className="mt-7">
              <PrimaryBtn
                type="submit"
                // className=" font-semibold text-xl w-full p-2 rounded-xl"
                isloading={login.isPending}
                disabled={login.isPending}
              >
                ورود به پنل مدیریت
              </PrimaryBtn>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}

export default LoginForm;
