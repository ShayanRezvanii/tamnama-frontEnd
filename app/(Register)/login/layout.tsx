/** @format */

import { useSestion } from "@/util/session";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  const Session = useSestion();
  console.log(Session);

  if (Session) {
    redirect("/");
  }
  return <div>{children}</div>;
}

export default Layout;
