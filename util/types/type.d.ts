/** @format */

import { ButtonHTMLAttributes } from "react";
interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isloading?: boolean;
  isActive?: boolean;
}
