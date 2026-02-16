"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [isEventsOpen, setIsEventsOpen] = useState(false);

  const handleMouseEnter = () => setIsEventsOpen(true);
  const handleMouseLeave = () => setIsEventsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <Link
            href="/"
            className="text-lg font-medium text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
          >
            <Logo />
          </Link>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {/* Threads Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-expanded={isEventsOpen}
                aria-haspopup="true"
              >
                Threads
              </button>

              {/* Dropdown Menu */}
              {isEventsOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-56 animate-in fade-in slide-in-from-top-2 duration-200"
                  role="menu"
                >
                  <div className="bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-lg overflow-hidden">
                    <Link
                      href="/create"
                      className="block px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      role="menuitem"
                    >
                      Create New Thread
                    </Link>
                    <Link
                      href="/saved"
                      className="block px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      role="menuitem"
                    >
                      Saved Threads
                    </Link>
                    <Link
                      href="/events"
                      className="block px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      role="menuitem"
                    >
                      Browse Threads
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Other Navigation Items */}
            <Link
              href="/profile"
              className="text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Profile
            </Link>

            <Link
              href="/about"
              className="text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              About
            </Link>

            <Link
              href="/support"
              className="text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Support
            </Link>
          </div>

          {/* Right: Theme Toggle */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-neutral-800 dark:text-neutral-200"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation (Simple fallback) */}
        <div className="md:hidden mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col gap-2">
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-neutral-800 dark:text-neutral-200 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 list-none">
                Threads
              </summary>
              <div className="ml-4 mt-2 space-y-1">
                <Link
                  href="/create"
                  className="block text-sm text-neutral-600 dark:text-neutral-400 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Create New Thread
                </Link>
                <Link
                  href="/saved"
                  className="block text-sm text-neutral-600 dark:text-neutral-400 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Saved Threads
                </Link>
                <Link
                  href="/events"
                  className="block text-sm text-neutral-600 dark:text-neutral-400 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Browse Threads
                </Link>
              </div>
            </details>

            <Link
              href="/profile"
              className="text-sm font-medium text-neutral-800 dark:text-neutral-200 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Profile
            </Link>

            <Link
              href="/about"
              className="text-sm font-medium text-neutral-800 dark:text-neutral-200 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              About
            </Link>

            <Link
              href="/support"
              className="text-sm font-medium text-neutral-800 dark:text-neutral-200 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Support
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
