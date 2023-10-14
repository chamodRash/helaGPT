"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import { AiOutlinePlus } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";

import LogoWithText from "../../../../../public/logoWithText.png";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  // const t = useTranslations("test");
  return (
    <div className="h-[80%] flex flex-col items-center justify-between">
      <div className="h-1/2 w-full flex flex-col items-center justify-center gap-8">
        <Image src={LogoWithText} alt="Logo" width={500} height={400} />
        <h3 className="text-zinc-900 dark:text-white font-semibold text-lg tracking-widest">
          Where language meets Ingenuinity
        </h3>
      </div>
      <div className="w-10/12 mx-auto flex items-center gap-5">
        <Button
          size={"icon"}
          variant={"outline"}
          className="md:hidden ml-5  border border-zinc-400 dark:bg-zinc-700 rounded-full">
          <AiOutlinePlus className="text-zinc-900 dark:text-white text-lg" />
        </Button>
        {/* <Button
          size={"icon"}
          variant={"outline"}
          className="hidden md:block border border-zinc-600 dark:bg-zinc-700 w-11 rounded-full text-center">
          <AiOutlinePlus className="text-zinc-900 dark:text-white text-lg" />
        </Button> */}
        <Input
          type="text"
          placeholder="Enter Your Prompt..."
          className="bg-zinc-700 placeholder:text-zinc-300 border-zinc-600 mx-0"
        />
        <Button
          size={"icon"}
          variant={"outline"}
          className="border border-zinc-600 dark:bg-zinc-700 w-11 rounded-full">
          <IoIosSend className="text-zinc-900 dark:text-white text-lg" />
        </Button>
      </div>
    </div>
  );
}
