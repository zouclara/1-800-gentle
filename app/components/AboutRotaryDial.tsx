"use client";

import { useState, useEffect } from "react";
import { PhoneIncoming } from "lucide-react";

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    id: "manifesto",
    title: "Our Mission",
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
          We're rethinking what support systems looks like.
        </h2>
        <div className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>Ambition is often recognized as public milestones.</p>
          <p>Promotions. Accepted offers. Funding rounds. Titles.</p>
          <p>These moments are highly visible and easy to applaud.</p>
          <p>What we do not often see is the work behind them.</p>
          <p>The negotiation practiced behind the scenes.</p>
          <p>The interviews that did not convert to job offers.</p>
          <p>The decision making process to reach said milestones.</p>
          <p>The emotional fortitude required to keep showing up.</p>
          <p>
            Milestones highlight results and they rarely show the preparation, support systems,
            or emotional work underneath.
          </p>
          <p className="font-medium text-neutral-800 dark:text-neutral-200">
            1-800-GENTLE is a shared space where peers dial in to talk about the in-between.
          </p>
          <div className="pt-4">
            <p className="font-medium text-neutral-800 dark:text-neutral-200 mb-3">
              We believe:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Ambition is more than the milestone.</li>
              <li>Peers are our network of lived experience.</li>
              <li>Growth is built in repetition, reflection, and steady effort.</li>
            </ul>
          </div>
          <p>This is not just for the visible wins.</p>
          <p>It is for the infrastructure and dialogue behind them.</p>
          <p className="font-medium text-neutral-800 dark:text-neutral-200">
            That is the support we are building.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "what",
    title: 'What Is 1-800-GENTLE?',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
          What Is 1-800-GENTLE?
        </h2>
        <div className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>1-800-GENTLE is a resource hub for topics, events, and best practices.</p>
          <div>
            <p className="mb-3">These objects help people navigate:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Career transitions and pivots</li>
              <li>Peer connection</li>
              <li>Sustainable habits and routines</li>
            </ul>
          </div>
          <p>It is a place to ask real questions and share real methods.</p>
          <p>A space to exchange lived experience, not just outcomes.</p>
        </div>
      </div>
    ),
  },
  {
    id: "why",
    title: 'Why "1-800-GENTLE"?',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
          Why "1-800-GENTLE"?
        </h2>
        <div className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            Toll-free numbers were built on the promise of providing accessible information over
            the phone. We are reclaiming that idea by creating a resource where dialing in
            connects you not to a business, but to peers navigating similar industries, roles, and
            stages of life.
          </p>
          <p>1-800-GENTLE is a shared resource of lived experiences. Accessible. Human.</p>
          <p>
            GENTLE is steady, disciplined, intentional change. Because growth comes from a place
            of reflection and initiative.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "how",
    title: "How It Works",
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
          How It Works
        </h2>
        <div className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Browse threads and events</li>
            <li>Join conversations</li>
            <li>Share or ask questions</li>
          </ol>
          <div className="pt-4">
            <p className="mb-3">Over time, we are building:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>A living archive of resilience</li>
              <li>A peer mentorship network</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "vision",
    title: "Vision",
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
          Vision
        </h2>
        <div className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>Make resources accessible and reshape the culture around ambition.</p>
          <p>
            Dialogue helps people make decisions, navigate their day-to-day, and create meaningful
            change.
          </p>
          <p>
            Progress moves farther through honest conversations about mistakes, preparation, and
            goals that require vulnerability.
          </p>
          <p>This is a place where peers can be earnest, curious, and committed to learning.</p>
          <p>Not another networking platform.</p>
          <p className="font-medium text-neutral-800 dark:text-neutral-200">
            We are building a shared line. Dial in.
          </p>
        </div>
      </div>
    ),
  },
];

export function AboutRotaryDial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  // Calculate rotation needed to bring selected section to top (12 o'clock = 0 degrees)
  const calculateRotation = (index: number) => {
    const degreesPerSection = 360 / sections.length;
    // Rotate counter-clockwise to bring section to top
    return -index * degreesPerSection;
  };

  const handleSectionClick = (index: number) => {
    setActiveIndex(index);
    setRotation(calculateRotation(index));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = (activeIndex + 1) % sections.length;
        handleSectionClick(nextIndex);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = (activeIndex - 1 + sections.length) % sections.length;
        handleSectionClick(prevIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Desktop Rotary Dial */}
        <div className="hidden md:block">
          {/* Dial Container */}
          <div className="flex justify-center mb-16">
            <div className="relative w-96 h-96">
              {/* Center Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-white dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-700 shadow-lg flex items-center justify-center">
                  <div className="text-center flex flex-col items-center gap-1">
                    <PhoneIncoming
                      className="w-8 h-8 text-neutral-400 dark:text-neutral-600"
                      strokeWidth={1.5}
                    />
                    <div className="text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-600">
                      Dial In
                    </div>
                  </div>
                </div>
              </div>

              {/* Rotating Sections */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-in-out"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {sections.map((section, index) => {
                  const angle = (index * 360) / sections.length;
                  const radius = 160;
                  const x = Math.sin((angle * Math.PI) / 180) * radius;
                  const y = -Math.cos((angle * Math.PI) / 180) * radius;

                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionClick(index)}
                      className={`absolute top-1/2 left-1/2 w-20 h-20 -ml-10 -mt-10 rounded-full transition-all duration-300 ${
                        activeIndex === index
                          ? "bg-blue-500 dark:bg-blue-600 text-white scale-110 shadow-xl"
                          : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:scale-105 hover:shadow-lg border border-neutral-200 dark:border-neutral-700"
                      }`}
                      style={{
                        transform: `translate(${x}px, ${y}px) rotate(${-rotation}deg)`,
                      }}
                      aria-label={section.title}
                      aria-pressed={activeIndex === index}
                    >
                      <div className="text-xs font-medium text-center px-2 leading-tight">
                        {section.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Expanded Content */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg p-8 md:p-12">
            {sections[activeIndex].content}
          </div>
        </div>

        {/* Mobile Collapsible Sections */}
        <div className="md:hidden space-y-4">
          {sections.map((section, index) => (
            <details
              key={section.id}
              open={index === 0}
              className="group bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden"
            >
              <summary className="cursor-pointer px-6 py-4 font-medium text-neutral-900 dark:text-neutral-100 list-none flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                <span>{section.title}</span>
                <svg
                  className="w-5 h-5 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-6 py-6 border-t border-neutral-200 dark:border-neutral-800">
                {section.content}
              </div>
            </details>
          ))}
        </div>

        {/* Keyboard Hint (Desktop Only) */}
        <div className="hidden md:block mt-8 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            Use arrow keys to navigate sections
          </p>
        </div>
      </div>
    </div>
  );
}
