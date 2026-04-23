import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import { Button } from "@/components/ui/button";
import LogoMark from "@/components/ui/logomark";
import IconUser from "@/components/icons/icon-user";
import IconShoppingCart from "@/components/icons/icon-shopping-cart";
import IconMenu from "@/components/icons/icon-menu";


export function Navbar() {
  return (
    <nav className="w-full bg-primary-50/50 border-b">
      <div className="container flex items-center justify-between py-4">

        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <IconMenu size={40} />
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
