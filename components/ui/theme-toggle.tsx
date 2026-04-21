'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

import IcoMoon from "@/components/icons/icon-moon";
import IcoSun from "@/components/icons/icon-sun";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="cursor-pointer"
    >
      <IcoSun className="pointer-events-auto rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <IcoMoon className="pointer-events-auto absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}


