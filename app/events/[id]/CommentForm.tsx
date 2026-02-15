"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { MarkdownContent } from "@/app/components/MarkdownContent";

interface CommentFormProps {
  eventId: string;
  parentId?: string | null;
  className?: string;
  onSuccess?: () => void;
}

type Tab = "write" | "preview";

const TOOLBAR_BUTTONS = [
  { label: "Bold", prefix: "**", suffix: "**", placeholder: "text" },
  { label: "Italic", prefix: "_", suffix: "_", placeholder: "text" },
  { label: "H2", prefix: "## ", suffix: "", placeholder: "Heading" },
  { label: "Quote", prefix: "> ", suffix: "", placeholder: "Quote" },
  { label: "Code", prefix: "`", suffix: "`", placeholder: "code" },
] as const;

export function CommentForm({ eventId, parentId, className, onSuccess }: CommentFormProps) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("write");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function insertMarkdown(prefix: string, suffix: string, placeholder: string) {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.slice(start, end) || placeholder;
    const newText =
      content.slice(0, start) + prefix + selectedText + suffix + content.slice(end);
    setContent(newText);

    requestAnimationFrame(() => {
      textarea.focus();
      const newStart = start + prefix.length;
      const newEnd = newStart + selectedText.length;
      textarea.setSelectionRange(newStart, newEnd);
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!content.trim()) {
      setError("Comment cannot be empty.");
      setIsSubmitting(false);
      return;
    }

    const { error: insertError } = await supabase.from("comments").insert({
      event_id: eventId,
      content: content.trim(),
      ...(parentId && { parent_id: parentId }),
    });

    if (insertError) {
      setError(insertError.message);
      setIsSubmitting(false);
      return;
    }

    setContent("");
    onSuccess?.();
    router.refresh();
    setIsSubmitting(false);
  }

  const inputClass =
    "flex-1 px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 font-mono text-sm transition-shadow duration-200";

  return (
    <form onSubmit={handleSubmit} className={`mb-6 ${className ?? ""}`}>
      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 text-sm mb-4">
          {error}
        </div>
      )}

      <div className="flex gap-1 mb-1">
        {TOOLBAR_BUTTONS.map((btn) => (
          <button
            key={btn.label}
            type="button"
            onClick={() => insertMarkdown(btn.prefix, btn.suffix, btn.placeholder)}
            className="px-2 py-1 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
            title={btn.label}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="flex border-b border-neutral-200 dark:border-neutral-700 mb-2">
        <button
          type="button"
          onClick={() => setActiveTab("write")}
          className={`px-3 py-1.5 text-sm font-medium transition-colors ${
            activeTab === "write"
              ? "border-b-2 border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100"
              : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
          }`}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("preview")}
          className={`px-3 py-1.5 text-sm font-medium transition-colors ${
            activeTab === "preview"
              ? "border-b-2 border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100"
              : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
          }`}
        >
          Preview
        </button>
      </div>

      {activeTab === "write" ? (
        <div className="flex gap-3">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a comment... (Markdown supported)"
            rows={4}
            required
            disabled={isSubmitting}
            className={inputClass}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed self-end h-fit transition-colors duration-200"
          >
            {isSubmitting ? "Posting…" : "Post"}
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <div className="flex-1 min-h-[100px] p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
            {content.trim() ? (
              <MarkdownContent content={content} />
            ) : (
              <p className="text-neutral-400 dark:text-neutral-500 text-sm">
                Nothing to preview.
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed self-end h-fit transition-colors duration-200"
          >
            {isSubmitting ? "Posting…" : "Post"}
          </button>
        </div>
      )}
    </form>
  );
}
