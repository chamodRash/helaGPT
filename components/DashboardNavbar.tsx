"use client";

import * as React from "react";
import Link from "next-intl/link";
import { useTranslations } from "next-intl";

import { FaUserAlt } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { PiSignOutBold } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";

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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardNavbar() {
  const [position, setPosition] = React.useState("bottom");
  const t = useTranslations("dashboardNavbar");

  return (
    <div className="w-11/12 h-[8%] md:h-1/6 mx-auto flex items-center justify-between md:justify-end">
      <div className="md:hidden ml-1 w-52 flex items-center gap-4">
        <Sheet>
          <SheetTrigger>
            <Button
              size={"icon"}
              variant={"outline"}
              className="bg-zinc-50 dark:bg-zinc-700">
              <RxHamburgerMenu className="text-lg" />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="bg-zinc-50 dark:bg-zinc-950">
            <DashboardSidebar />
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-extrabold tracking-wide">HelaGPT</h1>
      </div>

      <div className="w-[200px] md:w-[400px] flex items-center justify-end mr-1 md:mr-5 gap-5">
        <Button
          size={"icon"}
          variant={"outline"}
          className="md:hidden ml-5  border border-zinc-400 dark:bg-zinc-700 rounded-full">
          <AiOutlinePlus className="text-zinc-900 dark:text-white text-lg" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="bg-white border-2 dark:bg-zinc-950 dark:border-black rounded-full pr-2.5 hidden md:flex">
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

        <ThemeToggler device="desktop" />

        <Popover>
          <PopoverTrigger>
            <Button size={"icon"} variant={"userIcon"}>
              <FaUserAlt className="w-4 h-4 text-white" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 mt-3 mr-5 text-center border-2 dark:bg-zinc-950 dark:border-black">
            <div className="md:hidden cursor-pointer pb-3 pl-2 w-full flex items-center justify-between text-zinc-600 hover:text-zinc-900 dark:text-white">
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="bg-white border-2 dark:bg-zinc-950 dark:border-black rounded-full pr-2.5 md:hidden">
                  <Button variant="outline">
                    {t("languages.title")}
                    <IoMdArrowDropdown className="ml-1 w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white dark:bg-zinc-950">
                  <DropdownMenuLabel>
                    {t("languages.caption")}
                  </DropdownMenuLabel>
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

              <ThemeToggler device="mobile" />
            </div>
            <div className="cursor-pointer py-3 md:pt-0 pl-2 border-t md:border-t-0 border-zinc-200 dark:border-zinc-800 flex items-center gap-3 text-zinc-600 hover:text-zinc-900 dark:text-white">
              <FaUserGear className="text-lg" />
              <p>{t("userActions.myAccount")}</p>
            </div>
            <div className="cursor-pointer py-3 pl-2 border-y border-zinc-200 dark:border-zinc-800 flex items-center gap-3 text-zinc-600 hover:text-zinc-900 dark:text-white">
              <FiSettings />
              {t("userActions.settings")}
            </div>
            <div className="cursor-pointer py-3 pl-2 flex items-center gap-3 text-zinc-600 hover:text-zinc-900 dark:text-white">
              <PiSignOutBold />
              {t("userActions.signout")}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
