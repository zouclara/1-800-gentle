"use client";

import { useState, useEffect, useRef } from "react";
import { Info } from "lucide-react";

export function RotaryPlacard() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        aria-describedby="rotary-placard-tooltip"
        className="group p-2 rounded-lg hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700"
      >
        <Info
          className="w-5 h-5 text-neutral-600 dark:text-neutral-400 transition-all duration-300 group-hover:scale-105 group-hover:rotate-6"
          strokeWidth={1.5}
        />
      </button>

      <div
        id="rotary-placard-tooltip"
        role="tooltip"
        className={`absolute top-full right-0 md:right-auto md:left-1/2 md:-translate-x-1/2 mt-3 w-[340px] max-w-[calc(100vw-3rem)] pointer-events-none transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-3 scale-[0.97]"
        }`}
      >
        <div
          className={`bg-neutral-100/95 dark:bg-neutral-900/95 backdrop-blur-sm border border-neutral-300/60 dark:border-neutral-700/60 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.45)] p-6 transition-all duration-300 ${
            isOpen ? "hover:brightness-105 hover:-translate-y-px" : ""
          }`}
        >
          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed tracking-[0.015em] text-center">
            Rotary phones required patience and presence.
            <br />
            Each number turned by hand.
            <br />
            This page honors that analogue pace — thoughtful, human, deliberate.
          </p>
        </div>
      </div>
    </div>
  );
}
