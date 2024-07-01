/** @format */

import MainLayout from "@/components/Layout/MainLayout";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useSestion } from "@/util/session";

export default function Home() {
  return (
    <>
      <MainLayout>Home</MainLayout>
    </>
  );
}
