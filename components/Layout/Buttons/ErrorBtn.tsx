import { BtnProps } from "@/util/types/type";
import React from "react";

function ErrorBtn({ isloading, children, ...props }: BtnProps) {
  return (
    <button
      className={`flex items-center justify-center gap-2  select-none focus:bg-error-300 text-error-600  w-full h-[48px]  px-6 duration-200 rounded-lg font-semibold hover:bg-error-600 hover:text-white  border border-error-600   disabled:opacity-20  text-sm lg:text-base ${isloading ? "disabled:cursor-wait" : "disabled:cursor-not-allowed"
        }`}
      {...props}
    >
      {isloading ? (
        <svg className="h-6 w-6 animate-spin" viewBox="3 3 18 18">
          <path
            className="fill-primary-400/20 "
            d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
          ></path>
          <path
            className="fill-primary-400"
            d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
          ></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
}

export default ErrorBtn;
