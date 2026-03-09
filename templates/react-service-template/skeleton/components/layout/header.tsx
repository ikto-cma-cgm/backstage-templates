/**
 * Header Component
 *
 * Best Practices Demonstrated:
 * - Semantic HTML (header, nav)
 * - Responsive design
 * - Accessible navigation
 * - Clean component structure
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Examples', href: '/examples' },
  { label: 'About', href: '/about' },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 font-bold text-xl"
        >
          <span>${{ values.name | title }}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-6" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-blue-600',
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-600'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden rounded-md p-2 hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav
          className="md:hidden border-t border-gray-200 bg-white px-4 py-4"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block py-2 text-base font-medium transition-colors',
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                )}
                onClick={() => setIsMenuOpen(false)}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}