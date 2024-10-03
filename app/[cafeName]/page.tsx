/** @format */
"use client";
import Welcome from "@/components/pages/Home/Welcome";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page({ params }: { params: { slug: string } }) {
  return (
    <div className=" w-full  h-screen  overflow-y-hidden">
      <Welcome />
    </div>
  );
}

export default page;
