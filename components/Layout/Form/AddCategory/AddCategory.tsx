/** @format */
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Form } from "../Form";
import ControlledInput from "../../Inputs/ControlledInput";
import PrimaryBtn from "../../Buttons/PrimaryBtn";
import { Add } from "iconsax-react";
import { useRouter } from "next/navigation";
// import Toast from "../../Alerts/Toast";
import {
  addCategorySchema,
  addCategorySchemaType,
} from "@/util/config/validation/addCategorySchema";
import { AddCategories } from "@/util/api/addCategory/addCategory";

function AddCategory() {
  const [reset, setReset] = useState({});
  const router = useRouter();
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState<string>("");
  const [cats, setCats] = useState<string[]>([]);
  const initialValues = {
    shopName: "",
    categories: "",
  };

  const [result, setResult] = useState(false);

  const addCategoryMutation = useMutation({
    mutationFn: AddCategories,
    onSuccess: (data, variables, context) => {
      setResult(true);
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
      setReset(initialValues);
      setCats([]);
    },
    onError: (error, variables, context) => {
      setResult(true);
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<addCategorySchemaType> = async (data) => {
    addCategoryMutation.mutate({
      shopName: "t-cafe",
      categories: cats,
    });
  };

  return (
    <>
      {/* <Toast
        messege={
          addUser.error
            ? (addUser.error as unknown as string)
            : "با موفقیت انجام شد"
        }
        Close={() => setResult(false)}
        isError={addUser.isError}
        isSuccess={addUser.isSuccess}
        Result={Result}
      /> */}
      <Form<addCategorySchemaType>
        validationSchema={addCategorySchema}
        onSubmit={onSubmit}
        resetValues={reset}
        className="w-full"
      >
        {({ register, formState: { errors }, setValue }) => (
          <div>
            <div className="flex flex-col justify-center items-center xl:flex-row lg:gap-0">
              <div className="w-full flex gap-4 items-center justify-center">
                <div className="w-full flex flex-col xl:flex-row gap-x-4">
                  <ControlledInput
                    register={register}
                    id="categories"
                    label="نام دسته بندی"
                    required
                    onChange={(e) => setInputValue(e.target.value)}
                    setValue={setValue}
                    PlaceHolder="نام دسته بندی خود را وارد نمایید"
                    type="text"
                    error={errors.categories?.message}
                  />
                </div>
                <div
                  onClick={() => {
                    if (inputValue.trim() !== "") {
                      setCats((prev) => [...prev, inputValue]);
                      setInputValue(""); // Clear the input after adding
                    }
                  }}
                  className="mt-8 p-2 bg-[#153448] hover:bg-[#153448]/70 duration-200 cursor-pointer  rounded-lg"
                >
                  <Add className="text-white" />
                </div>
              </div>
            </div>

            {cats.length > 0 ? (
              <div className="w-full flex flex-wrap gap-3 my-10 h-fit">
                {cats.map((cat, index) => (
                  <div
                    className=" bg-[#DFD0B8] text-black rounded-xl p-3"
                    key={index}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            ) : null}

            <div className="w-full xl:justify-end flex xl:items-center">
              <div className="w-full">
                <PrimaryBtn
                  type="submit"
                  isloading={addCategoryMutation.isPending}
                  disabled={addCategoryMutation.isPending || cats.length <= 0}
                >
                  تایید
                </PrimaryBtn>
              </div>
            </div>
          </div>
        )}
      </Form>
    </>
  );
}

export default AddCategory;
