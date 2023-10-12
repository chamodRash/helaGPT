"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggler() {
  const { setTheme } = useTheme();
  const t = useTranslations("dashboardNavbar");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="outline-none border-2 dark:bg-zinc-950 dark:border-black ">
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="dark:bg-zinc-950 dark:border-black ">
        <DropdownMenuItem
          className="dark:hover:bg-zinc-700"
          onClick={() => setTheme("light")}>
          {t("themes.light")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="dark:hover:bg-zinc-700"
          onClick={() => setTheme("dark")}>
          {t("themes.dark")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="dark:hover:bg-zinc-700"
          onClick={() => setTheme("system")}>
          {t("themes.default")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
