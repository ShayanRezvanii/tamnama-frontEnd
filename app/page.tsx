/** @format */

import MainLayout from "@/components/Layout/MainLayout";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useSestion } from "@/util/session";
import Welcome from "@/components/pages/Home/Welcome";
import Cookies from "js-cookie";

export default function Home() {
  const Session = useSestion();

  if (!Session) {
    redirect("/login");
  }

  return <div>Landing</div>;
}
