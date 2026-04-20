import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { ModeToggle } from "./mode-toggle";

import { Button } from "@/components/ui/button";
import LogoSvg from "@/components/ui/logo-svg";
import IconUser from "@/components/icons/icon-user";
import IconShoppingCart from "@/components/icons/shopping-cart";

// const NAV_LINKS = [
//   { href: "/", label: "Home" },
//   { href: "/products", label: "Shop" },
// ];

export function Navbar() {
  return (
    <nav className="w-full bg-primary-50/50 border-b">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="inline-block">
          <LogoSvg title={APP_NAME} size={150} />
        </Link>

        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" title="cart">
            <Link href="/cart">
              <IconShoppingCart size={20} /> Cart
            </Link>
          </Button>
          <Button asChild variant="ghost" title="sing-in">
            <Link href="/sing-in">
              <IconUser size={20} /> Sign in
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
