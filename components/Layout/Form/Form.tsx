/** @format */

"use client";
import type { Schema } from "zod";
import { useEffect, useImperativeHandle } from "react";
import {
  useForm,
  SubmitHandler,
  UseFormReturn,
  UseFormProps,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type ServerErrors<T> = {
  [Property in keyof T]: string;
};

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  useFormProps?: UseFormProps<TFormValues>;
  validationSchema?: Schema<TFormValues>;
  fieldErrors?: any[] | null;
  formError?: string | string[] | null | any;
  serverError?: ServerErrors<Partial<TFormValues>> | null;
  resetValues?: any | null;
  className?: string;
  defaultValues?: any;
  reference?: any;
};
export const Form = <
  TFormValues extends Record<string, any> = Record<string, any>
>({
  onSubmit,
  children,
  useFormProps,
  validationSchema,
  fieldErrors,
  formError,
  resetValues,
  className,
  reference,
  defaultValues,
  ...formProps
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    ...useFormProps,
    ...(validationSchema && {
      resolver: zodResolver(validationSchema),
      defaultValues,
    }),
  });
  useEffect(() => {
    if (resetValues) {
      methods.reset(resetValues);
    }
  }, [resetValues, methods]);

  useImperativeHandle(reference, () => ({
    submitForm() {
      methods.handleSubmit(onSubmit)();
    },
  }));
  return (
    <form
      noValidate
      onSubmit={methods.handleSubmit(onSubmit)}
      {...formProps}
      className={className}
    >
      {children(methods)}
    </form>
  );
};
