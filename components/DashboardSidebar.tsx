"use client";

import Image from "next/image";
import LogoWithText from "@/public/logoWithText.png";

import MessageIcon from "../public/message_icon.svg";
import ImageIcon from "../public/image_icon.svg";
import VideoIcon from "../public/video_icon.svg";
import AudioIcon from "../public/audio_icon.svg";
import CodeIcon from "../public/code_icon.svg";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Conversation",
    icon: MessageIcon,
    href: "/conversation",
    color: "",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "",
  },
  {
    label: "Audio Generation",
    icon: AudioIcon,
    href: "/audio",
    color: "",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    href: "/code",
    color: "",
  },
];

export default function DashboardSidebar() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="h-full my-3 md:mx-5">
      <Link href={"/dashboard"} className="ml-3">
        <Image src={LogoWithText} width={150} height={150} alt="Logo" />
      </Link>
      <div className="space-y-4 flex flex-col mt-8 ">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.href}
            className={cn(
              "flex items-center gap-5 rounded-full pl-5 hover:bg-slate-200 dark:hover:bg-zinc-900 cursor-pointer transition duration-500 ease-in-out",
              pathname === route.href
                ? "bg-slate-200 dark:bg-zinc-900"
                : "text-zinc-300 dark:text-zinc-200"
            )}>
            <Image src={route.icon} alt="message icon" width={20} height={20} />
            <p
              className={cn(
                "py-2 pr-5 w-11/12 transition-all duration-500 ease-in-out ",
                pathname === route.href
                  ? "font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#642B73] to-[#C6426E] dark:from-pink-500 dark:to-violet-500"
                  : "font-semibold tracking-wider hover:font-bold hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-[#642B73] hover:to-[#C6426E] dark:hover:from-pink-500 dark:hover:to-violet-500 "
              )}>
              {route.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
