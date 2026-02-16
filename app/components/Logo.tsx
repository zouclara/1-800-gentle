"use client";

import { PhoneIncoming } from "lucide-react";

export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <PhoneIncoming className="w-5 h-5" strokeWidth={1.5} />
      1-800-GENTLE
    </span>
  );
}
