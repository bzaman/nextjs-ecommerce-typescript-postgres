import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import { Button } from "@/components/ui/button";
import LogoMark from "@/components/ui/logomark";
import IconUser from "@/components/icons/icon-user";
import IconShoppingCart from "@/components/icons/icon-shopping-cart";

import OffCanvasNav from "@/components/layout/off-canvas-nav";

export function Navbar() {
  return (
    <nav className="w-full bg-primary-50/50 border-b">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center md:hidden">
            <OffCanvasNav />
          </div>
          <LogoMark title={APP_NAME} />
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" title="cart">
            <Link className="text-inherit" href="/cart">
              <IconShoppingCart size={20} /> Cart
            </Link>
          </Button>
          <Button asChild variant="ghost" title="sing-in">
            <Link className="text-inherit" href="/sing-in">
              <IconUser size={20} /> Sign in
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
