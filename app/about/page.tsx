export default function AboutPage() {
  return (
    <>
      <style>{`
        @keyframes gentle-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes gradient-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        .animate-gentle-pulse {
          animation: gentle-pulse 3s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-gradient-glow {
          animation: gradient-glow 4s ease-in-out infinite;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-800 { animation-delay: 800ms; }
      `}</style>

      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative max-w-3xl mx-auto px-6 pt-24 pb-32">
          {/* Light: soft blue/gray glow. Dark: muted lavender + soft blue accent */}
          <div
            className="absolute inset-0 -z-10 h-[400px] w-full max-w-2xl mx-auto opacity-40 dark:opacity-50 animate-gradient-glow"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(147, 197, 253, 0.5) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 -z-10 h-[400px] w-full max-w-2xl mx-auto opacity-30 dark:opacity-60 animate-gradient-glow hidden dark:block"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(196, 181, 253, 0.35) 0%, transparent 70%)",
              animationDelay: "2s",
            }}
          />
          <div
            className="absolute inset-0 -z-10 h-[400px] w-full max-w-2xl mx-auto opacity-20 dark:opacity-40 animate-gradient-glow block dark:hidden"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(196, 181, 253, 0.3) 0%, transparent 70%)",
              animationDelay: "2s",
            }}
          />
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:bg-gradient-to-r dark:from-neutral-100 dark:via-blue-100 dark:to-indigo-200 dark:bg-clip-text dark:text-transparent animate-fade-in-up animate-gentle-pulse">
            1-800-Gentle
          </h1>
          <p
            className="mt-6 text-2xl sm:text-3xl text-neutral-600 dark:text-neutral-400 font-light animate-fade-in-up delay-100 opacity-0"
            style={{ animationFillMode: "forwards" }}
          >
            Dial into each other.
          </p>
          <p
            className="mt-8 text-lg text-neutral-500 dark:text-neutral-500 max-w-xl animate-fade-in-up delay-200 opacity-0"
            style={{ animationFillMode: "forwards" }}
          >
            A forum where objects are threads and events. Where we share tools for
            emotional regulation, career navigation, negotiation, confidence-building,
            and peer connection.
          </p>
        </section>

        {/* Manifesto */}
        <section className="max-w-3xl mx-auto px-6 py-20 space-y-16">
          <p
            className="text-xl sm:text-2xl font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed animate-fade-in-up delay-300 opacity-0"
            style={{ animationFillMode: "forwards" }}
          >
            We believe ambition does not require aggression.
          </p>
          <p
            className="text-xl sm:text-2xl font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed animate-fade-in-up delay-400 opacity-0"
            style={{ animationFillMode: "forwards" }}
          >
            We believe negotiation can be grounded.
          </p>
          <p
            className="text-xl sm:text-2xl font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed animate-fade-in-up delay-500 opacity-0"
            style={{ animationFillMode: "forwards" }}
          >
            We believe peers are the new role models.
          </p>
          <p
            className="text-xl sm:text-2xl font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed animate-fade-in-up delay-600 opacity-0"
            style={{ animationFillMode: "forwards" }}
          >
            We believe emotional regulation is a professional skill.
          </p>
          <p
            className="text-xl sm:text-2xl font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed animate-fade-in-up delay-700 opacity-0"
            style={{ animationFillMode: "forwards" }}
          >
            We believe support should not be transactional.
          </p>
        </section>

        {/* What We Are */}
        <section className="max-w-3xl mx-auto px-6 py-20 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-8">
            What We Are
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
            <span className="font-medium text-neutral-800 dark:text-neutral-200">
              Threads
            </span>{" "}
            are topics for conversation. A place to ask, share, and reflect.
          </p>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <span className="font-medium text-neutral-800 dark:text-neutral-200">
              Events
            </span>{" "}
            are gatherings or shared experiences. Moments where we show up for each
            other.
          </p>
          <p className="mt-8 text-neutral-500 dark:text-neutral-500 text-base">
            The name is a play on toll-free numbers. It symbolizes accessibility—reaching
            someone when you need support. Instead of calling a corporation, you&apos;re
            reaching peers. Everyone starts somewhere. Everyone is reachable. Everyone is
            someone else&apos;s role model. This is non-transactional support. Mutual growth.
            Gentle ambition.
          </p>
        </section>

        {/* How It Works */}
        <section className="max-w-3xl mx-auto px-6 py-20 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-12">
            How It Works
          </h2>
          <div className="space-y-12">
            <div>
              <span className="text-sm font-medium text-neutral-400 dark:text-neutral-500">
                Step 1
              </span>
              <p className="mt-2 text-lg text-neutral-700 dark:text-neutral-300">
                Browse threads and events. Find what resonates.
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-neutral-400 dark:text-neutral-500">
                Step 2
              </span>
              <p className="mt-2 text-lg text-neutral-700 dark:text-neutral-300">
                Join the conversation. Share your perspective or show up to an event.
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-neutral-400 dark:text-neutral-500">
                Step 3
              </span>
              <p className="mt-2 text-lg text-neutral-700 dark:text-neutral-300">
                Give and receive. Build the shared archive.
              </p>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="max-w-3xl mx-auto px-6 pt-20 pb-32 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-xl sm:text-2xl font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
            We are building a shared archive of resilience. A place where the tools we
            discover—for calming the nervous system, for speaking up, for moving through
            uncertainty—live in the open. Where they can be found, borrowed, and passed
            on. Dial in. We&apos;re here.
          </p>
        </section>
      </main>
    </>
  );
}
