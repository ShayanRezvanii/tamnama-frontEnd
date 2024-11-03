/** @format */

import React, { useState } from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { addingImage } from "@/util/api/addProduct/addImage";
import { DocumentUpload } from "iconsax-react";
interface InputProps<T extends FieldValues> {
  label: string;
  id: Path<T>;
  error?: string;
  register: UseFormRegister<T>;
  required?: boolean;
  setValue?: (id: Path<T>, value: any) => void;
  path?: (value: any) => void;
  param: string;
  fileType: string;
  data?: (value: any) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ControlledFile = <T extends FieldValues>({
  label,
  id,
  error,
  param,
  register,
  required,
  fileType,
  setValue,
  path,
  data,
  onChange,
}: InputProps<T>): JSX.Element => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  const addImageMutation = useMutation({
    mutationFn: addingImage,
    onSuccess: (data, variables, context) => {
      //   setResult(true);
      //   //   queryClient.invalidateQueries({ queryKey: ["categoryList"] });
      //   setReset(initialValues);
      //   setCats([]);

      if (path) {
        // data(data);
        path(data);
      }
    },
    onError: (error, variables, context) => {
      //   setResult(true);
      alert(error);
    },
  });

  const onFileUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    addImageMutation.mutate({
      image: selectedFile,
      name: param,
      fileType: fileType,
    });
    if (setValue) {
      setValue(id, selectedFile);
    }
  };
  const onFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="form-control flex my-2">
      <div className=" w-full flex flex-col  gap-4">
        <label htmlFor={id}>{label}</label>
        <div className=" flex w-full flex-col gap-4  max-w-[220px]">
          <input
            type="file"
            id={id}
            {...register(id, { required })}
            // onChange={(e) => {
            //   if (onChange) {
            //     onChange(e);
            //   }
            //   if (setValue) {
            //     setValue(id, e.target.files?.[0]);
            //   }
            // }}

            onChange={onFileChange}
          />
          <PrimaryBtn onClick={onFileUpload}>
            <DocumentUpload />
            {/* <p className={‍‍`${addImageMutation.isPending ? "درحال بارگذاری..." : "آپلود تصویر"}`}>
              {addImageMutation.isPending ? "درحال بارگذاری..." : "آپلود تصویر"}
            </p> */}
            <p
              className={`${
                addImageMutation.isPending ? " animate-pulse" : null
              }`}
            >
              {addImageMutation.isPending
                ? "درحال بارگذاری..."
                : "  آپلود تصویر"}
            </p>
          </PrimaryBtn>
        </div>

        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
};

export default ControlledFile;
