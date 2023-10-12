"use client";

import * as React from "react";
import Link from "next-intl/link";
import { useTranslations } from "next-intl";

import { FaUserAlt } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { PiSignOutBold } from "react-icons/pi";

import { ThemeToggler } from "@/components/ui/ThemeToggler";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DashboardNavbar() {
  const [position, setPosition] = React.useState("bottom");
  const t = useTranslations("dashboardNavbar");

  return (
    <div className="w-11/12 h-1/6 mx-auto flex items-center justify-end">
      <div className="w-[400px] flex items-center justify-around">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="bg-white border-2 dark:bg-zinc-950 dark:border-black rounded-full pr-2.5">
            <Button variant="outline">
              {t("languages.title")}
              <IoMdArrowDropdown className="ml-1 w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white dark:bg-zinc-950">
            <DropdownMenuLabel>{t("languages.caption")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}>
              <Link href={"/dashboard"} locale="en">
                <DropdownMenuRadioItem value="english">
                  English
                </DropdownMenuRadioItem>
              </Link>
              <Link href={"/dashboard"} locale="sn">
                <DropdownMenuRadioItem value="sinhala">
                  සිංහල
                </DropdownMenuRadioItem>
              </Link>
              <Link href={"/dashboard"} locale="tm">
                <DropdownMenuRadioItem value="tamil">
                  தமிழ்
                </DropdownMenuRadioItem>
              </Link>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggler />

        <Popover>
          <PopoverTrigger>
            <Button size={"icon"} variant={"userIcon"}>
              <FaUserAlt className="w-5 h-5 text-white" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-52 mt-3 mr-5 text-center border-2 dark:bg-zinc-950 dark:border-black">
            <div className="cursor-pointer pb-3 pl-2 flex items-center gap-3 text-zinc-600 hover:text-zinc-900 dark:text-white">
              <FaUserGear className="text-lg" />
              <p>{t("userActions.myAccount")}</p>
            </div>
            <div className="cursor-pointer py-3 pl-2 border-y border-zinc-200 dark:border-zinc-800 flex items-center gap-3 text-zinc-600 hover:text-zinc-900 dark:text-white">
              <FiSettings />
              {t("userActions.settings")}
            </div>
            <div className="cursor-pointer pt-3 pl-2 flex items-center gap-3 text-zinc-600 hover:text-zinc-900 dark:text-white">
              <PiSignOutBold />
              {t("userActions.signout")}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
