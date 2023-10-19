"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

import LogoWithText from "../../../../../public/logoWithText.png";

export default function DashboardPage() {
  // const t = useTranslations("test");
  return (
    <div className="h-[92%] md:h-[88%] flex flex-col items-center justify-center">
      <div className="h-1/2 w-full flex flex-col items-center justify-center gap-2">
        <Image src={LogoWithText} alt="Logo" width={300} height={200} />
        <h3 className="font-semibold text-lg tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-500 dark:to-purple-500">
          Where language meets Ingenuinity
        </h3>
        <TypeAnimation
          sequence={[
            "Select a category to experiece the Power of AI", // Types 'One'
            1500, // Waits 1s
            "Select a category to experiece the Skill of AI", // Deletes 'One' and types 'Two'
            1500, // Waits 2s
            // "Two Three", // Types 'Three' without deleting 'Two'
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          className="text-zinc-900 dark:text-zinc-50 text-xl font-bold tracking-wide mt-16"
        />
      </div>
    </div>
  );
}
