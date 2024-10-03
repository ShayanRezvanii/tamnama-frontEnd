/** @format */

"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { Eye, EyeSlash } from "iconsax-react";
import { HexAlphaColorPicker } from "react-colorful";

type InputProps<T extends FieldValues> = {
  label?: string;
  id: Path<T>;
  type?: string;
  register?: UseFormRegister<T>;
  watch?: UseFormWatch<T>;
  setValue?: any;
  required?: boolean;
  error: string | undefined;
  PlaceHolder?: string;
  length?: number;
  disabled?: boolean;
  value?: number | string;
  onChange: (value: any) => void;
  shebaField?: boolean;
};

const ControlledColorPicker = <T extends FieldValues>({
  label,
  id,
  error,
  type,
  register,
  watch,
  value,
  setValue,
  required,
  PlaceHolder,
  disabled,
  shebaField,
  onChange,
}: InputProps<T>) => {
  // PasswordMode
  const [showPassword, setShowPassword] = useState(false);
  const [color, setColor] = useState("#aabbcc");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    // If `watch` is provided and value changes, update the input value
    if (watch && setValue) {
      const value = watch(id);
      setValue(id, value);
    }
  }, [id, setValue, watch]);

  const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
    if (type === "number") {
      event.preventDefault();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      type === "number" &&
      (event.key === "ArrowUp" || event.key === "ArrowDown")
    ) {
      event.preventDefault();
    }
  };
  const toggleVisibilityHandler = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (onChange) {
      onChange(color);
    }
    if (setValue) {
      setValue(id, color);
    }
  }, [color, id, onChange, setValue]);
  return (
    <div
      className={`flex flex-col my-2 w-full group ${
        disabled ? "cursor-not-allowed" : ""
      }`}
    >
      <label
        className={`pb-2 text-sm md:text-base text-gray-600  ${
          error && !disabled ? "text-[#F55F56] " : ""
        } ${disabled ? "opacity-50" : "opacity-100"}`}
        htmlFor={id}
      >
        {label}
        {/* {required ? <span className="text-error-600">*</span> : null} */}
      </label>
      <div
        className={`w-full h-fit  border-gray-400 ${
          isOpen ? " border-gray-200" : null
        } rounded-lg border  relative   flex items-center  overflow-hidden justify-center `}
      >
        <div className=" w-full flex flex-col gap-3">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className=" w-full text-center justify-center text-gray-400 cursor-pointer rounded-xl h-10  bg-gradient-to-l   flex flex-col"
          >
            {label}
          </div>
          {isOpen ? (
            <div className=" relative ">
              <motion.div
                initial={{ opacity: 0, translateY: 30 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.2 }}
                className=" select-none overflow-y-scroll flex justify-center items-center  custom-scrollbar p-10 h-fit md:h-fit w-full bg-white mt-2 rounded-lg shadow-lg z-30"
              >
                <HexAlphaColorPicker
                  color={color}
                  id={id}
                  {...(register ? register(id, { required }) : {})}
                  onChange={(e: any) => {
                    setColor(e);

                    if (setValue) {
                      //   setValue(id, color);
                      if (onChange) {
                        onChange(color); // Call the onChange prop if provided
                      }
                    }
                  }}
                />
              </motion.div>
            </div>
          ) : null}
        </div>
      </div>
      {error && (
        <p className="text-xs text-error-500 mt-1 h-[14px]">
          {error && !disabled ? error : null}
        </p>
      )}
    </div>
  );
};

export default ControlledColorPicker;
