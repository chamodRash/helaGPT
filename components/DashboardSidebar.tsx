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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="h-full my-8 md:mx-5">
      <Image
        src={LogoWithText}
        width={150}
        height={150}
        alt="Logo"
        className="ml-3"
      />
      <div className="space-y-4 flex flex-col mt-10 ">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.href}
            className="flex items-center gap-5 rounded-full pl-5 hover:bg-slate-200 dark:hover:bg-zinc-900 cursor-pointer transition">
            <Image src={route.icon} alt="message icon" width={20} height={20} />
            <p className="py-2 pr-5 w-11/12 font-semibold text-zinc-800 dark:text-gray-200 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-[#642B73] hover:to-[#C6426E] dark:hover:from-pink-500 dark:hover:to-violet-500 ">
              {route.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
