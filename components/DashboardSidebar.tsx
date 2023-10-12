"use-client";

import Image from "next/image";
import LogoWithText from "@/public/logoWithText.png";

const DashboardSidebar = () => {
  return (
    <>
      <Image src={LogoWithText} width={150} height={150} alt="Logo" />
    </>
  );
};

export default DashboardSidebar;
