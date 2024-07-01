/** @format */

"use client";
import React, { useState } from "react";

interface RadioBtnProps {
  onChange?: (value: boolean | string) => void;
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: string;
}

function RadioButton({
  onChange,
  checked,
  disabled,
  error,
  label,
}: RadioBtnProps) {
  const toggleHandler = () => {
    if (!disabled) {
      onChange && onChange(!checked);
    }
    if (error) {
      onChange && onChange("Error");
    }
  };

  return (
    <div onClick={toggleHandler} className=" flex cursor-pointer group gap-0 ">
      <div
        className={`${disabled ? "cursor-not-allowed " : "cursor-pointer"} ${error ? " bg-error-300 border border-error-500" : null
          }  rounded-full w-5 h-5 flex justify-center items-center bg-white  border duration-150  ${checked
            ? "border-gray-600"
            : "focus:border-gray-600 hover:border-gray-300 border-gray-100 "
          }`}
      >
        <div
          className={`w-[10px] h-[10px] ${checked ? "opacity-100" : "opacity-0"
            } duration-150  ${error ? "bg-error-500" : "bg-primary-600"
            }  rounded-full `}
        ></div>
      </div>
      <label className="text-base text-gray-400 group-hover:cursor-pointer select-none mx-2">
        {label}
      </label>
    </div>
  );
}

export default RadioButton;
