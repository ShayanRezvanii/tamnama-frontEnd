/** @format */

import MainLayout from "@/components/Layout/MainLayout";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useSestion } from "@/util/session";
import Welcome from "@/components/pages/Home/Welcome";
import { useEffect } from "react";

export default function Home() {
  const Session = useSestion();
  console.log(Session);

  if (!Session) {
    redirect("/login");
  }

  return (
    <>
      <MainLayout>
        <div>
          <Welcome />
        </div>
      </MainLayout>
    </>
  );
}
