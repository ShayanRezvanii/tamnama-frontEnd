/** @format */
"use client";
import MainLayout from "@/components/Layout/MainLayout";
import Welcome from "@/components/pages/Home/Welcome";
import React from "react";
import Cookies from "js-cookie";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
      <>{children}</>
    </MainLayout>
  );
}

export default Layout;
