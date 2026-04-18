import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { ModeToggle } from './mode-toggle';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
];

export function Navbar() {
  return (
    <nav className="container flex-between py-4">
      <Link href="/" className="text-xl font-bold tracking-tight">
        {APP_NAME}
      </Link>

      <div className="flex items-center gap-4">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {label}
          </Link>
        ))}
        <ModeToggle />
      </div>
    </nav>
  );
}
