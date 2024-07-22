/** @format */

import React from "react";
import { FieldValues, Path } from "react-hook-form";
import FormDropDown from "../Dropdowns/FormDropDown";
import MultiDropdown from "../Dropdowns/MultiDropdown";
type SelectProps<T extends FieldValues> = {
  options: { name: string; value: string | number }[];

  label?: string;
  id: Path<T>;
  setValue?: any;
  required?: boolean;
  error: string | undefined;
  PlaceHolder: string;
  disabled?: boolean;
  onChange?: (e: any) => void;
  value?: any;
  icon?: boolean;
  isMulti?: boolean;
  isSearch?: boolean;
  multiValues?: (values: string[]) => void;
};
const ControlledSelect = <T extends FieldValues>({
  label,
  id,
  error,
  options,
  PlaceHolder,
  required,
  isSearch,
  onChange,
  icon,
  isMulti,
  multiValues,
  value,
  disabled,
}: SelectProps<T>) => {
  const getInitialSelectedValue = () => {
    if (isSearch) {
      return value && value.name !== "" ? value.name : "";
    } else {
      return value && value.value !== "" ? value.value : PlaceHolder;
    }
  };

  console.log(value?.value);

  return (
    <div className="w-full ">
      {label && (
        <label
          className={`pb-2 text-sm md:text-base text-gray-600 dark:text-gray-100 ${
            error && !disabled ? "text-[#F55F56] " : ""
          } ${disabled ? "opacity-50" : "opacity-100"}`}
          htmlFor={id}
        >
          {label}
          {/* {required ? <span className="text-error-600">*</span> : null} */}
        </label>
      )}

      <div className="w-full relative pt-2">
        {isMulti ? (
          <MultiDropdown
            disabled={disabled}
            error={error}
            Haveplaceholder={value && value.name !== ""}
            initialSelectedValue={
              value && value.name !== "" ? value.name : PlaceHolder
            }
            options={options}
            selectedItems={(e: any) => {
              multiValues && multiValues(e);
            }}
            onSelect={(e) => {
              onChange && onChange(e);
            }}
          />
        ) : (
          <FormDropDown
            isSearch={isSearch}
            disabled={disabled}
            error={error}
            data={value?.value}
            icon={icon}
            Haveplaceholder={value && value?.value !== ""}
            initialSelectedValue={getInitialSelectedValue()}
            options={options}
            onSelect={(e) => {
              onChange && onChange(e);
            }}
          />
        )}
      </div>

      <p className="text-xs text-error-500 mt-1 h-[14px]">
        {error && error === "Required" ? `${label} الزامی است` : error}
      </p>
    </div>
  );
};

export default ControlledSelect;
