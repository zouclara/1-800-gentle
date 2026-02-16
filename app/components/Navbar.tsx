"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { createClient } from "@/lib/supabase/client";
import { LogoutButton } from "./LogoutButton";
import type { User } from "@supabase/supabase-js";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // Check auth state
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsPinned(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsPinned(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (!isPinned) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      setIsOpen(false);
    }
  };

  const handleClick = () => {
    setIsPinned(!isPinned);
    setIsOpen(!isOpen);
  };

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
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={handleClick}
                className="text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                Threads
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-1 w-56 transition-all duration-150 ease-out ${
                  isOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
                role="menu"
                style={{ zIndex: 60 }}
              >
                <div className="bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-lg overflow-hidden">
                  <Link
                    href="/thread/new"
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
                    href="/thread"
                    className="block px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    role="menuitem"
                  >
                    Browse Threads
                  </Link>
                </div>
              </div>
            </div>

            {/* Other Navigation Items */}
            {user && (
              <Link
                href="/profile"
                className="text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Profile
              </Link>
            )}

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

            {!user ? (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-medium px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <LogoutButton variant="navbar" />
            )}
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
                  href="/thread/new"
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
                  href="/thread"
                  className="block text-sm text-neutral-600 dark:text-neutral-400 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Browse Threads
                </Link>
              </div>
            </details>

            {user && (
              <Link
                href="/profile"
                className="text-sm font-medium text-neutral-800 dark:text-neutral-200 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Profile
              </Link>
            )}

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

            {!user ? (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-neutral-800 dark:text-neutral-200 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-medium px-3 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <LogoutButton />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
