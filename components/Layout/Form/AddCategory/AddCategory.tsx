/** @format */
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import { Form } from "../Form";
import ControlledInput from "../../Inputs/ControlledInput";
import PrimaryBtn from "../../Buttons/PrimaryBtn";
import { Add, Coffee } from "iconsax-react";
import { redirect, useRouter } from "next/navigation";
// import Toast from "../../Alerts/Toast";
import {
  addCategorySchema,
  addCategorySchemaType,
} from "@/util/config/validation/addCategorySchema";
import { AddCategories } from "@/util/api/addCategory/addCategory";
import ControlledSelect from "../../Inputs/ControlledSelect";
import Image from "next/image";

type Cat = {
  name: string;
  icon: string;
};

function AddCategory({ param }: { param: string }) {
  const [reset, setReset] = useState({});
  const router = useRouter();
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<{
    name: string;
    value: string;
  }>();
  const [cats, setCats] = useState<any[]>([]);
  const initialValues = {
    shopName: "",
    categories: "",
    Icon: { name: "", value: "" },
  };

  const [result, setResult] = useState(false);

  const addCategoryMutation = useMutation({
    mutationFn: AddCategories,
    onSuccess: (data, variables, context) => {
      setResult(true);
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
      setReset(initialValues);
      setCats([]);
      router.back();
    },
    onError: (error, variables, context) => {
      setResult(true);
      console.log(error);
    },
  });

  const categoryIcons = [
    { name: "coffee", value: "category-icon/cake.png" },
    { name: "latte", value: "category-icon/latte.png" },
  ];

  const onSubmit: SubmitHandler<addCategorySchemaType> = async (data) => {
    addCategoryMutation.mutate({
      shopName: param,
      categories: cats,
    });
  };

  return (
    <>
      <Form<addCategorySchemaType>
        validationSchema={addCategorySchema}
        onSubmit={onSubmit}
        resetValues={reset}
        className="w-full"
      >
        {({ register, formState: { errors }, setValue, control }) => (
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
                    PlaceHolder=" دسته بندی خود را وارد نمایید"
                    type="text"
                    error={errors.categories?.message}
                  />
                </div>

                <div className="w-full flex flex-col xl:flex-row gap-x-4">
                  <Controller
                    control={control}
                    name="Icon"
                    render={({ field: { onChange, value } }) => (
                      <ControlledSelect
                        options={categoryIcons}
                        required
                        icon
                        error={errors.Icon?.message}
                        PlaceHolder="آیکون"
                        label="انتخاب آیکون"
                        value={value}
                        onChange={(selectedOption) => {
                          onChange(selectedOption);
                          setSelectedValue(selectedOption);
                        }}
                        id={"userType"}
                      />
                    )}
                  />
                </div>

                {/* {inputValue && selectedValue?.value ? (
                  <div
                    onClick={() => {
                      if (inputValue.trim() !== "") {
                        setCats([
                          {
                            name: inputValue,
                            icon: selectedValue?.value,
                          },
                        ]);
                        setInputValue(""); // Clear the input after adding
                      }
                    }}
                    className="mt-8 p-2 bg-[#153448] hover:bg-[#153448]/70 duration-200 cursor-pointer rounded-lg"
                  >
                    <Add className="text-white" />
                  </div>
                ) : null} */}
              </div>
            </div>

            {/* {cats.length > 0 ? (
              <div className="w-full flex flex-wrap gap-3 my-10 h-fit">
                {cats.map((cat, index) => (
                  <div
                    className=" bg-[#DFD0B8] text-black rounded-xl p-3"
                    key={index}
                  >
                    <div className=" flex items-center  justify-between">
                      {cat.name}
                      <div className=" w-10 h-10  relative">
                        <Image src={`/${cat.icon}`} fill alt="icon" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null} */}

            <div className="w-full xl:justify-end flex xl:items-center">
              <div className="w-full">
                <PrimaryBtn
                  onClick={() => {
                    if (inputValue.trim() !== "") {
                      setCats([
                        {
                          name: inputValue,
                          icon: selectedValue?.value,
                        },
                      ]);
                      setInputValue(""); // Clear the input after adding
                    }
                  }}
                  type="submit"
                  isloading={addCategoryMutation.isPending}
                  disabled={addCategoryMutation.isPending}
                >
                  اضافه کردن
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
