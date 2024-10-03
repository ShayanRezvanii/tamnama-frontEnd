/** @format */
"use client";
import MainLayout from "@/components/Layout/MainLayout";
import Welcome from "@/components/pages/Home/Welcome";
import React, { useEffect, useLayoutEffect } from "react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

function Layout({ children }: { children: React.ReactNode }) {
  const shopName = Cookies.get("shopName");
  const token = Cookies.get("token");

  useLayoutEffect(() => {
    if (!shopName || !token) {
      redirect("/login");
    }
  }, []);

  return (
    <MainLayout>
      <>{children}</>
    </MainLayout>
  );
}

export default Layout;
