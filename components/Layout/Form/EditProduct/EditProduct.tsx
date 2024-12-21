/** @format */
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import { Form } from "../Form";
import ControlledInput from "../../Inputs/ControlledInput";
import PrimaryBtn from "../../Buttons/PrimaryBtn";
import { redirect, useRouter } from "next/navigation";
import {
  addProductSchema,
  addProductSchemaType,
} from "@/util/config/validation/addProductSchema";
import ControlledFile from "../../Inputs/ControlledFile";
import { editProduct } from "@/util/api/editProduct/editProduct";
import ControlledSelect from "../../Inputs/ControlledSelect";
import useGetCategoryList from "@/util/hooks/Category/GetCategory";
import useGetSingleProduct from "@/util/hooks/Products/GetOneProduct";
import path from "path";

function EditProduct({ param }: any) {
  const [reset, setReset] = useState({});
  const formRef = useRef<any>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState<string>("");
  const [cats, setCats] = useState<string[]>([]);
  const [result, setResult] = useState(false);
  const [pending, setPending] = useState<boolean>(false);
  const singleProduct = useGetSingleProduct(param.id);
  const getCategoryList = useGetCategoryList(param.cafeName);
  const [uploadedImage, setUploadedImage] = useState();
  const [added, setAdded] = useState(false);
  const [categories, setCategories] = useState<
    { name: string; value: string | number }[]
  >([]);

  const initialValues = {
    category: {
      name: singleProduct?.data?.foundedProduct?.category,
      value: singleProduct?.data?.foundedProduct?.category,
    },
    shopName: singleProduct.data?.foundedProduct?.shopName,
    price: singleProduct.data?.foundedProduct?.price.toString(),
    title: singleProduct.data?.foundedProduct?.title,
    description: singleProduct.data?.foundedProduct?.description,
    imageURL: singleProduct.data?.foundedProduct?.imageURL,
  };

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

  const editProductMutation = useMutation({
    mutationFn: editProduct,
    onSuccess: (data, variables, context) => {
      setResult(true);
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
      setReset(initialValues);
      setCats([]);
      router.replace(`/${param.cafeName}/products`);
    },
    onError: (error, variables, context) => {
      setResult(true);
      console.log(error);
    },
  });

  console.log(pending);

  const onSubmit: SubmitHandler<addProductSchemaType> = async (data) => {
    editProductMutation.mutate({
      id: param.id,
      shopName: param.cafeName,
      category: data.category
        ? data.category.value
        : initialValues.category.value,
      imageURL: initialValues?.imageURL,
      price: data.price ? data.price : initialValues.price,
      description: data.description
        ? data.description
        : initialValues.description,
      title: data.title ? data.title : initialValues.title,
    });
  };

  const handleClick = () => {
    formRef.current.submitForm();
    console.log("Form submitted");
  };

  if (!singleProduct.data) {
    return (
      <div className="flex gap-x-2 p-2 w-full  justify-center items-center ">
        <div className="h-3 w-3 bg-[#153448] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-3 w-3 bg-[#153448] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-3 w-3 bg-[#153448] rounded-full animate-bounce"></div>
      </div>
    );
  }

  return (
    <>
      <Form<addProductSchemaType>
        validationSchema={addProductSchema}
        onSubmit={onSubmit}
        reference={formRef}
        defaultValues={initialValues}
        resetValues={reset}
        className="w-full"
      >
        {({ register, formState: { errors }, setValue, control }) => (
          <div>
            <div className="flex flex-col justify-center items-center xl:flex-row lg:gap-0">
              <div
                className="w-full flex flex-col gap-4 items-start justify-start
              "
              >
                <div className="w-full flex gap-x-4">
                  <ControlledInput
                    register={register}
                    id="title"
                    label="نام محصول"
                    required
                    onChange={(e) => setInputValue(e.target.value)}
                    setValue={setValue}
                    PlaceHolder="نام محصول را وارد کنید"
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
                    PlaceHolder="توضیحات محصول خود را وارد نمایید"
                    type="text"
                    error={errors.description?.message}
                  />
                </div>
                <div className="w-full flex gap-x-4">
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
                        icon={false}
                        disabled
                        value={initialValues.category}
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

                {/* <ControlledFile
                  label="تصویر محصول"
                  setValue={setValue}
                  register={register}
                  fileType="file"
                  param={param.cafeName}
                  path={(e: any) => {
                    setUploadedImage(e.file);
                    setAdded(true);
                  }}
                  id="imageUrl"
                  error={errors.imageUrl?.message}
                /> */}
              </div>
            </div>

            <div className="w-full xl:justify-end flex xl:items-center">
              <div className="w-full">
                <PrimaryBtn
                  isloading={editProductMutation.isPending}
                  disabled={pending}
                  onClick={handleClick}
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

export default EditProduct;
