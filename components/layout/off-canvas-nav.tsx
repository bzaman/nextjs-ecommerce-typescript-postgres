"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import IconUser from "@/components/icons/icon-user";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";
import IconX from "@/components/icons/icon-x";
import { Button } from "@/components/ui/button";
import IconMenu from "@/components/icons/icon-menu";

export default function OffCanvasNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex-inline items-center">
          <IconMenu size={40} />
        </Button>
      </SheetTrigger>
      <SheetContent
        showCloseButton={false}
        side="left"
        className="md:hidden rounded-tr-3xl rounded-br-3xl data-[side=left]:h-svh"
        overlayClassName="md:hidden off-canvas-nav-overlay"
      >
        <SheetHeader className="relative border-b py-7">
          <SheetTitle className="sr-only">
            Off Canvas Navigation for small and mobile devices
          </SheetTitle>
          <SheetDescription className="sr-only">
            Off Canvas Navigation menus
          </SheetDescription>

          <SheetClose asChild>
            <Button
              variant="ghost"
              className="absolute top-3 right-3 rounded-full size-9 bg-gray-200/50"
              size="icon-sm"
            >
              <IconX />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="flex flex-col px-4 space-y-2">
          <Button
            asChild
            variant="ghost"
            title="sing-in"
            className="w-full justify-start px-4 py-5 text-lg font-medium border-0 border-b border-border"
          >
            <Link className="text-inherit" href="/sing-in">
              <IconUser size={20} /> Sign in
            </Link>
          </Button>

          <ThemeToggle
            showLabel
            className="w-full justify-start px-4 py-5 text-lg font-medium border-0 border-b border-border"
          />
        </div>
        <SheetFooter>profile menu</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
