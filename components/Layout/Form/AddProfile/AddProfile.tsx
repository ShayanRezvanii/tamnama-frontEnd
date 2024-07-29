/** @format */
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import { Form } from "../Form";
import ControlledInput from "../../Inputs/ControlledInput";
import PrimaryBtn from "../../Buttons/PrimaryBtn";
import { redirect, useRouter } from "next/navigation";

import ControlledFile from "../../Inputs/ControlledFile";
import ControlledSelect from "../../Inputs/ControlledSelect";
import useGetCategoryList from "@/util/hooks/Category/GetCategory";
import { AddingProfile } from "@/util/api/addProfile/addProfile";
import {
  addProfileSchemaType,
  addProfileSchema,
} from "@/util/config/validation/addProfileSchema";
import ControlledColorPicker from "../../Inputs/ControlledColorPicker";
import { times } from "@/util/data/time";
function AddProfile({ param }: { param?: string }) {
  const [reset, setReset] = useState({});
  const formRef = useRef<any>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState<string>("");
  const [cats, setCats] = useState<string[]>([]);
  const [firstColor, setFirstColor] = useState();
  const initialValues = {
    shopName: "",
    categories: "",
  };
  const [added, setAdded] = useState(false);
  const [result, setResult] = useState(false);
  const [pathImage, setPathImage] = useState<string>("");
  //   const getCategoryList = useGetCategoryList(param);
  const [categories, setCategories] = useState<
    { name: string; value: string | number }[]
  >([]);

  const addProfileMutation = useMutation({
    mutationFn: AddingProfile,
    onSuccess: (data, variables, context) => {
      setResult(true);
      setAdded(false);
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      setReset(initialValues);
      setCats([]);
    },
    onError: (error, variables, context) => {
      setResult(true);
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<addProfileSchemaType> = async (data) => {
    console.log(data);

    if (pathImage && !added) {
      addProfileMutation.mutate({
        firstColor: data.firstColor,
        workTime: data.workTime.from.value + "-" + data.workTime.to.value,
        phone: data.phone,
        address: data.address,
        imageURL: pathImage,
      });
      setAdded(true);
    }
  };

  const handleClick = () => {
    // if (pathImage) {

    formRef.current.submitForm();
    setAdded(true);
    // }
  };

  return (
    <>
      <Form<addProfileSchemaType>
        validationSchema={addProfileSchema}
        onSubmit={onSubmit}
        reference={formRef}
        resetValues={reset}
        className="w-full"
      >
        {({ register, formState: { errors }, setValue, control }) => (
          <div>
            <div className="flex flex-col justify-center items-center  xl:flex-row lg:gap-0">
              <div className="w-full flex flex-col gap-4 items-center justify-center">
                <div className="w-full flex flex-col ">
                  <div className=" w-full gap-4 max-w-[480px] flex justify-between">
                    <ControlledColorPicker
                      register={register}
                      id="firstColor"
                      label="رنگ اولیه "
                      required
                      onChange={(e) => setFirstColor(e?.target?.value)}
                      setValue={setValue}
                      PlaceHolder="نام محصول را وارد کنید"
                      type="text"
                      error={errors.firstColor?.message}
                    />
                  </div>

                  <div className=" w-full  justify-between flex flex-col gap-2">
                    <div className=" w-full gap-4 flex ">
                      <Controller
                        control={control}
                        name="workTime.from"
                        render={({ field: { onChange, value } }) => (
                          <ControlledSelect
                            options={times}
                            required
                            error={errors.workTime?.from?.message}
                            PlaceHolder="از ساعت"
                            label="از ساعت"
                            value={value}
                            icon={false}
                            onChange={(selectedOption) => {
                              onChange(selectedOption);
                            }}
                            id={"workTime.from"}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="workTime.to"
                        render={({ field: { onChange, value } }) => (
                          <ControlledSelect
                            options={times}
                            required
                            error={errors.workTime?.to?.message}
                            PlaceHolder="تا ساعت"
                            label="تا ساعت"
                            value={value}
                            icon={false}
                            onChange={(selectedOption) => {
                              onChange(selectedOption);
                            }}
                            id={"workTime.to"}
                          />
                        )}
                      />
                    </div>

                    <div className=" w-full">
                      <ControlledInput
                        register={register}
                        id="phone"
                        label="شماره تلفن"
                        required
                        onChange={(e) => setInputValue(e.target.value)}
                        setValue={setValue}
                        PlaceHolder="توضیحات محصول خود را وارد نمایید"
                        type="text"
                        error={errors.phone?.message}
                      />
                    </div>
                    <div className=" w-full">
                      <ControlledInput
                        register={register}
                        id="address"
                        label="آدرس"
                        required
                        onChange={(e) => setInputValue(e.target.value)}
                        setValue={setValue}
                        PlaceHolder="توضیحات محصول خود را وارد نمایید"
                        type="text"
                        error={errors.address?.message}
                      />
                    </div>
                  </div>

                  <div className=" w-full max-w-[420px]">
                    <ControlledFile
                      label="لوگو"
                      setValue={setValue}
                      register={register}
                      param={"lounge"}
                      fileType="profile"
                      path={(e: any) => setPathImage(e.file)}
                      onChange={(e) => console.log(e)}
                      // data={(e: any) => console.log(e)}
                      id="imageUrl"
                      error={errors.imageUrl?.message}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full justify-end items-end flex">
              <div className="w-full  max-w-[140px]">
                <PrimaryBtn
                  type="submit"
                  onClick={handleClick}
                  // isloading={addProductMutation.isPending}
                  // disabled={addProductMutation.isPending || cats.length <= 0}
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

export default AddProfile;
