/** @format */
"use client";
import axiosInstance from "@/util/axiosInstance";

export const addingImage = async ({
  image,
  name,
  fileType,
}: {
  image: File;
  name: string;
  fileType: string;
}) => {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await axiosInstance.post(
      `/upload/${name}?storageKey=${fileType}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to upload image");
    }
  } catch (error: any) {
    throw error.response?.data?.message || error.message || "An error occurred";
  }
};
