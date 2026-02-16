"use client";

import { PhoneIncoming } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 via-sky-50 to-white px-6">
      <div className="flex flex-col items-center gap-8 max-w-2xl w-full">
        {/* Animated Phone Icon Container */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg"
          animate={{
            rotate: [0, -3, 3, -3, 0],
            scale: [1, 1.05, 1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          <PhoneIncoming className="w-16 h-16 text-blue-400" strokeWidth={1.5} />
        </motion.div>

        {/* Brand Name */}
        <h1 className="text-5xl md:text-6xl font-light text-slate-800 tracking-tight drop-shadow-sm">
          1-800-GENTLE
        </h1>

        {/* Divider */}
        <div className="w-24 h-px bg-slate-300" />

        {/* Coming Soon Text */}
        <p className="text-sm md:text-base uppercase tracking-[0.25em] text-slate-500 font-light">
          Coming Soon
        </p>

        {/* Collapsible Definition Section */}
        <details className="w-full mt-4 group">
          <summary className="cursor-pointer text-center text-blue-600 hover:text-blue-700 font-medium text-sm list-none flex items-center justify-center gap-2">
            <span>Why "1-800-GENTLE"?</span>
            <svg
              className="w-4 h-4 transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>

          <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Why "1-800-GENTLE"?
            </h2>

            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Toll-free numbers were built on the promise of providing accessible information over the phone.
                We are reclaiming that idea by creating a resource where dialing in connects you not to a business,
                but to peers navigating similar industries, roles, and stages of life.
              </p>

              <p>
                1-800-GENTLE is a shared resource of lived experiences. Accessible. Human.
              </p>

              <p>
                GENTLE is steady, disciplined, intentional change. Because growth comes from a place of reflection and initiative.
              </p>
            </div>
          </div>
        </details>
      </div>
    </main>
  );
}
