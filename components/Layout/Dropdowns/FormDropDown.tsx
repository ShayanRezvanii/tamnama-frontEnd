/** @format */

"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown2 } from "iconsax-react";
import useClickOutside from "@/util/hooks/useClickOutside";
import Image from "next/image";
interface DropDownType {
  options: { name: string; value: string | number }[];
  Haveplaceholder?: boolean;
  error?: string | undefined;
  onSelect: (value: any) => void;
  initialSelectedValue?: string | null;
  disabled?: boolean;
  isSearch?: boolean;
  icon?: boolean;
  data?: any;
}

const FormDropDown: React.FC<DropDownType> = ({
  onSelect,
  options,
  isSearch,
  error,
  initialSelectedValue,
  Haveplaceholder,
  disabled,
  icon,
  data,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropOpen, setDropIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>(
    initialSelectedValue || ""
  );

  const handleClickOutside = () => {
    setIsOpen(false);
    setDropIsOpen(false);
  };

  const containerRef = useClickOutside(handleClickOutside);

  const inputHandler = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (searchValue) {
      setDropIsOpen(true);
    } else {
      setDropIsOpen(false);
    }
  }, [searchValue]);

  useEffect(() => {
    if (initialSelectedValue) {
      setDropIsOpen(false);
    }
  }, [initialSelectedValue]);

  const filteredData = options?.filter((item: any) => {
    console.log(item);

    // item.name.toLowerCase().includes(searchValue.toLowerCase());
    // console.log(item.name.name);
  });

  const handleSelect = (item: any) => {
    setSearchValue(item.name);
    onSelect(item);
    setIsOpen(false);
    setDropIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-block w-full">
      {!isSearch ? (
        <>
          <div
            className={` bg-gray-50${
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } ${
              error && !disabled
                ? "border-red-500 dark:border-red-400"
                : "border-gray-400 border  focus:border-gray-600   hover:border-gray-300"
            } ${
              isOpen ? "border-gray-100" : "border-gray-100"
            } border border-gray-400 text-sm bg-white dark:bg-dark-100 text-nowrap md:text-base text-gray-300 select-none  duration-200 text-center w-full flex items-center justify-between outline-none rounded-lg font-semibold px-3 py-3`}
            onClick={() => setIsOpen(!disabled && !isOpen)}
          >
            <p
              className={`${
                Haveplaceholder ? "text-gray-600 " : "text-gray-400"
              } text-sm`}
            >
              {initialSelectedValue && !searchValue
                ? initialSelectedValue
                : searchValue}
            </p>
            <ArrowDown2
              className={`w-3 h-3 lg:h-5 lg:w-5 ${
                isOpen ? "rotate-180" : null
              } duration-200`}
            />
          </div>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute select-none max-h-[200px] overflow-y-scroll custom-scrollbar px-2 py-2 h-fit md:h-fit w-full bg-white dark:bg-dark-100 mt-2 rounded-lg shadow-lg z-10"
            >
              {options.map((item, index) => (
                <div
                  key={index}
                  className="py-2 pr-4 text-gray-600 text-sm md:text-base text-right cursor-pointer dark:hover:text-gray-25  hover:bg-gray-50 hover:text-primary-600 rounded-lg duration-150"
                  onClick={() => handleSelect(item)}
                >
                  <div className=" flex items-center  justify-between">
                    {item.name}
                    {icon ? (
                      <div className=" w-10 h-10  relative">
                        <Image src={`/${item.value}`} fill alt="icon" />
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </>
      ) : null}
      {isSearch ? (
        <input
          id="search"
          className="p-2 w-full h-full border-gray-100 focus:border-gray-600 hover:border-gray-300 dark:border-white/10 dark:hover:border-white/25 dark:focus:border-white/45 text-sm md:text-base bg-white  dark:bg-dark-100  outline-none flex-1 rounded-lg border text-gray-600 dark:text-gray-100 placeholder:text-gray-200 placeholder:dark:text-gray-300  bg-transparent appearance-none disabled:opacity-50 disabled:cursor-not-allowed duration-200"
          onChange={(e: any) => inputHandler(e.target.value)}
          // value={initialSelectedValue ? initialSelectedValue : ""}
          value={searchValue}
        />
      ) : null}

      {isSearch && (
        <div className="relative w-full">
          {/* <input
            id="search"
            className="p-2 w-full h-full border-gray-100 focus:border-gray-600 hover:border-gray-300 dark:border-white/10 dark:hover:border-white/25 dark:focus:border-white/45 text-sm md:text-base bg-white dark:bg-dark-100 outline-none flex-1 rounded-lg border text-gray-600 dark:text-gray-100 placeholder:text-gray-200 placeholder:dark:text-gray-300 bg-transparent appearance-none disabled:opacity-50 disabled:cursor-not-allowed duration-200"
            onChange={(e: any) => inputHandler(e.target.value)}
            value={searchValue}
          /> */}

          {isDropOpen && (
            <motion.div
              initial={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute select-none max-h-[200px] overflow-y-scroll custom-scrollbar px-2 py-2 h-fit md:h-fit w-full bg-white dark:bg-dark-100 mt-2 rounded-lg shadow-lg z-10"
            >
              {filteredData.map((item, index) => (
                <div
                  key={index}
                  className="py-2 pr-4 text-gray-400 dark:text-gray-200 text-sm md:text-base text-right cursor-pointer dark:hover:text-gray-25 dark:hover:bg-white/20 hover:bg-gray-50 hover:text-primary-600 rounded-lg duration-150"
                  onClick={() => handleSelect(item)}
                >
                  {item.name}
                  {item.value}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormDropDown;
