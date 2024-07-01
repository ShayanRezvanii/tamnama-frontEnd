/** @format */
"use client";
import React from "react";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Button } from "react-bootstrap";
import ControlledInput from "@/components/Layout/Inputs/ControlledInput";
import { Form } from "@/components/Layout/Form/Form";
import PrimaryBtn from "@/components/Layout/Buttons/PrimaryBtn";
import {
  loginSchema,
  loginSchemaType,
} from "@/util/config/validation/loginSchema";
import { SubmitHandler } from "react-hook-form";
import LoginForm from "@/components/Layout/Form/LoginForm/LoginForm";

function Page() {
  return (
    <div className=" w-full flex flex-col justify-center items-center min-h-screen">
      <div className=" w-full max-w-[320px]">
        <h1>Tamnama Panel</h1>
        <LoginForm />
      </div>
    </div>
  );
}

export default Page;
