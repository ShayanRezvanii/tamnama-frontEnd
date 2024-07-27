/** @format */
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import { Form } from "../Form";
import ControlledInput from "../../Inputs/ControlledInput";
import PrimaryBtn from "../../Buttons/PrimaryBtn";
import { Add } from "iconsax-react";
import { redirect, useRouter } from "next/navigation";
// import Toast from "../../Alerts/Toast";
import {
  addProductSchema,
  addProductSchemaType,
} from "@/util/config/validation/addProductSchema";
import ControlledFile from "../../Inputs/ControlledFile";
import { AddingProduct } from "@/util/api/addProduct/addProduct";
import ControlledSelect from "../../Inputs/ControlledSelect";
import useGetCategoryList from "@/util/hooks/Category/GetCategory";

function AddProduct({ param }: { param: string }) {
  const [reset, setReset] = useState({});
  const formRef = useRef<any>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState<string>("");
  const [cats, setCats] = useState<string[]>([]);
  const initialValues = {
    shopName: "",
    categories: "",
  };
  const [added, setAdded] = useState(false);
  const [result, setResult] = useState(false);
  const [pathImage, setPathImage] = useState<string>("");
  const getCategoryList = useGetCategoryList(param);
  const [categories, setCategories] = useState<
    { name: string; value: string | number }[]
  >([]);

  useEffect(() => {
    const cats =
      getCategoryList.data?.allCategory?.categories?.map(
        (item: any, index: number) => {
          console.log(item);

          return { name: item[0].name, value: item[0].name };
        }
      ) || [];

    setCategories(cats);
  }, [getCategoryList.data?.allCategory?.categories]);

  const addProductMutation = useMutation({
    mutationFn: AddingProduct,
    onSuccess: (data, variables, context) => {
      setResult(true);
      setAdded(false);
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
      setReset(initialValues);
      setCats([]);

      router.replace(`/${param}/products`);
    },
    onError: (error, variables, context) => {
      setResult(true);
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<addProductSchemaType> = async (data) => {
    if (pathImage && !added) {
      addProductMutation.mutate({
        shopName: param,
        category: data.category.value,
        imageURL: pathImage,
        price: data.price,
        description: data.description,
        title: data.title,
      });
      setAdded(true);
    }
  };

  const handleClick = () => {
    if (pathImage) {
      formRef.current.submitForm();
      setAdded(true);
    }
  };

  return (
    <>
      <Form<addProductSchemaType>
        validationSchema={addProductSchema}
        onSubmit={onSubmit}
        reference={formRef}
        resetValues={reset}
        className="w-full"
      >
        {({ register, formState: { errors }, setValue, control }) => (
          <div>
            <div className="flex flex-col justify-center items-center xl:flex-row lg:gap-0">
              <div className="w-full flex flex-col gap-4 items-start justify-center">
                <div className="w-full flex   gap-x-4">
                  <ControlledInput
                    register={register}
                    id="title"
                    label="نام محصول"
                    required
                    onChange={(e) => setInputValue(e.target.value)}
                    setValue={setValue}
                    PlaceHolder="نام را وارد کنید"
                    type="text"
                    error={errors.title?.message}
                  />
                  <ControlledInput
                    register={register}
                    id="description"
                    label="توضیحات"
                    required
                    onChange={(e) => setInputValue(e.target.value)}
                    setValue={setValue}
                    PlaceHolder="توضیحات را وارد نمایید"
                    type="text"
                    error={errors.description?.message}
                  />
                </div>
                <div className="w-full flex   gap-x-4">
                  {/* <ControlledInput
                    register={register}
                    id="category"
                    label="دسته بندی"
                    required
                    onChange={(e) => setInputValue(e.target.value)}
                    setValue={setValue}
                    PlaceHolder=" دسته بندی محصول خود را انتخاب نمایید"
                    type="text"
                    error={errors.category?.message}
                  />{" "} */}

                  <Controller
                    control={control}
                    name="category"
                    render={({ field: { onChange, value } }) => (
                      <ControlledSelect
                        options={categories}
                        required
                        error={errors.category?.message}
                        PlaceHolder="انتخاب دسته بندی"
                        label="دسته بندی"
                        value={value}
                        icon={false}
                        onChange={(selectedOption) => {
                          onChange(selectedOption);
                        }}
                        id={"category"}
                      />
                    )}
                  />
                  <ControlledInput
                    register={register}
                    id="price"
                    label="قیمت محصول"
                    required
                    onChange={(e) => setInputValue(e.target.value)}
                    setValue={setValue}
                    PlaceHolder="قیمت محصول خود را وارد نمایید"
                    type="text"
                    error={errors.price?.message}
                  />
                </div>
                <ControlledFile
                  label="تصویر محصول"
                  setValue={setValue}
                  register={register}
                  param={param}
                  fileType="file"
                  path={(e: any) => setPathImage(e.file)}
                  onChange={(e) => console.log(e)}
                  // data={(e: any) => console.log(e)}
                  id="imageUrl"
                  error={errors.imageUrl?.message}
                />
              </div>
            </div>

            <div className="w-full xl:justify-end flex xl:items-center">
              <div className="w-full">
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

export default AddProduct;
