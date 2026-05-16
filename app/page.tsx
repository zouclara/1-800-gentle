import { RotaryDial } from "./components/RotaryDial";

export default function Home() {
  return (
    <div className="flex min-h-screen">

      {/* Left — sticky dial column, slightly wider */}
      <aside
        className="hidden md:flex flex-col items-center justify-center sticky top-0 h-screen gap-6"
        style={{ width: "360px", flexShrink: 0 }}
      >
        <h1 className="text-[22px] uppercase tracking-[0.25em] text-blue-400 font-light">
          1-800-Gentle
        </h1>
        <RotaryDial />
      </aside>

      {/* Right — scrollable content */}
      <main className="flex-1 flex flex-col justify-center px-14 py-20">

        {/* Mobile dial */}
        <div className="flex justify-center mb-10 md:hidden">
          <RotaryDial />
        </div>

        {/* Lewis Carroll quote — top */}
        <blockquote className="border-l-2 border-blue-200 pl-5 mb-8">
          <p className="text-slate-500 italic leading-relaxed text-[15px] font-light">
            "You're not the same as you were before, he said. You were much more… muchier… you've lost your muchness."
          </p>
          <footer className="mt-2.5 text-[11px] text-slate-400 tracking-widest">— Lewis Carroll</footer>
        </blockquote>

        <div className="w-10 h-px bg-blue-100 mb-8" />

        {/* Body text */}
        <div className="flex flex-col gap-5 text-slate-700 text-[16px] leading-[1.8] font-light">
          <p>
            1-800-Gentle is a play on the history of toll-free numbers and a north star for mindful mannerisms.
          </p>
          <p>
            Toll-free numbers were built on a simple promise: accessible information. It's a voice on the other end of the line. 1-800-Gentle borrows that idea and turns it inward. It's a line you can call into to reach yourself and the people in proximity to you.
          </p>
          <p>
            1-800-Gentle is home to deliberate catalysts. Minute sized concepts and invitations to notice, to slow down, to spark more gentle presence and appreciation for yourself, your friends, and the individuals sharing your day.
          </p>
          <p>
            My hope is that you wake up and go to sleep smiling most nights. The science of feeling fulfilled is directly correlated to how you connect with others, and with yourself. Listen generously. Ask the next question. Turn the dial one interaction at a time.
          </p>
        </div>

        {/* Closing line — bottom, underlined */}
        <p className="mt-10 text-blue-400 font-light tracking-wide text-[13px]">
          « A line back to your muchness.
        </p>

        {/* Collapsible sections */}
        <div className="mt-8 flex flex-col gap-3">

          {/* Coming Soon */}
          <details className="group border-t border-blue-100 pt-3">
            <summary className="flex items-center justify-between cursor-pointer list-none text-[12px] uppercase tracking-[0.25em] text-slate-400 font-light hover:text-blue-400 transition-colors">
              Coming Soon
              <svg
                className="w-3 h-3 text-blue-300 transition-transform group-open:rotate-180"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-3 text-slate-500 text-[14px] font-light leading-relaxed pb-2">
              Stay tuned for stickers and more…
            </p>
          </details>

          {/* Science of a good life */}
          <details className="group border-t border-blue-100 pt-3">
            <summary className="flex items-center justify-between cursor-pointer list-none text-[12px] uppercase tracking-[0.25em] text-slate-400 font-light hover:text-blue-400 transition-colors">
              Science of a Good Life
              <svg
                className="w-3 h-3 text-blue-300 transition-transform group-open:rotate-180"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-3 text-slate-500 text-[14px] font-light leading-relaxed pb-2">
              Robert Waldinger directs the Harvard Study of Adult Development — the longest
              running scientific study of happiness ever conducted. Started in 1938, it has
              followed the same participants for over 85 years across their entire adult lives.
              The central finding: it's not wealth, fame, or achievement that keeps people
              healthy and fulfilled. It's the quality of their relationships. Close connections
              protect the brain, buffer stress, and predict how well we age. The people who
              flourished most were the ones who leaned into others — not away from them.
            </p>
          </details>

          <div className="border-t border-blue-100" />
        </div>

      </main>
    </div>
  );
}
