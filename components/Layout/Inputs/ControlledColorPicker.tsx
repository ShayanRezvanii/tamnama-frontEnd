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
import { HexAlphaColorPicker } from "react-colorful";
import ControlledInput from "./ControlledInput";

type InputProps<T extends FieldValues> = {
  label?: string;
  id: Path<T>;
  error: string | undefined;
  type?: string;
  register?: UseFormRegister<T>;
  watch?: UseFormWatch<T>;
  setValue?: any;
  required?: boolean;
  PlaceHolder?: string;
  disabled?: boolean;
  value?: string;
  onChange: (value: string) => void;
};

const ControlledColorPicker = <T extends FieldValues>({
  label,
  id,
  error,
  register,
  watch,
  value,
  setValue,
  required,
  PlaceHolder,
  disabled,
  onChange,
}: InputProps<T>) => {
  const [color, setColor] = useState(value || "#aabbcc");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Sync with the `watch` value from react-hook-form
    if (watch && setValue) {
      const formValue = watch(id);
      setValue(id, formValue);
    }
  }, [id, setValue, watch]);

  // Update the color both from color picker and input
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    if (onChange) {
      onChange(newColor); // Call the onChange prop to sync with parent
    }
    if (setValue) {
      setValue(id, newColor); // Sync with react-hook-form
    }
  };

  useEffect(() => {
    handleColorChange(color);
  }, [color]);

  return (
    <div
      className={`flex flex-col my-2 w-full group ${
        disabled ? "cursor-not-allowed" : ""
      }`}
    >
      <label
        className={`pb-2 text-sm md:text-base text-gray-600 ${
          error && !disabled ? "text-[#F55F56]" : ""
        } ${disabled ? "opacity-50" : "opacity-100"}`}
        htmlFor={id}
      >
        {label}
      </label>
      <div
        className={`w-full h-fit border-gray-400 ${
          isOpen ? "border-gray-200" : ""
        } rounded-lg border relative flex items-center justify-center`}
      >
        <div className="w-full flex flex-col gap-3">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-center justify-center text-gray-400 cursor-pointer rounded-xl h-10 bg-gradient-to-l flex flex-col"
          >
            {label}
          </div>
          {isOpen && (
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, translateY: 30 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.2 }}
                className="select-none flex-col flex justify-center items-center custom-scrollbar p-10 h-fit md:h-fit w-full bg-white mt-2 rounded-lg shadow-lg z-30"
              >
                <HexAlphaColorPicker
                  color={color}
                  onChange={handleColorChange}
                />
                <div className="w-full mt-3">
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-full px-3 py-2 text-center border border-gray-300 rounded-lg"
                    placeholder={PlaceHolder || "#ffffff"}
                    disabled={disabled}
                  />
                </div>
              </motion.div>
            </div>
          )}
          {/* Input field to control color */}
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
