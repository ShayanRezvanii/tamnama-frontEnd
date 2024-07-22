/** @format */

import Welcome from "@/components/pages/Home/Welcome";
import React from "react";

function page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <Welcome />
    </div>
  );
}

export default page;
