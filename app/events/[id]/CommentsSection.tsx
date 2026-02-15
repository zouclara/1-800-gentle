"use client";

import { useState } from "react";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";

interface Comment {
  id: string;
  event_id: string;
  content: string;
  created_at: string;
  parent_id?: string | null;
}

interface CommentsSectionProps {
  eventId: string;
  comments: Comment[];
}

export function CommentsSection({ eventId, comments }: CommentsSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  const topLevel = comments.filter((c) => !c.parent_id);
  const byParent = comments
    .filter((c) => c.parent_id)
    .reduce<Record<string, Comment[]>>((acc, c) => {
      const pid = c.parent_id!;
      if (!acc[pid]) acc[pid] = [];
      acc[pid].push(c);
      return acc;
    }, {});

  return (
    <section className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors duration-200"
      >
        <span>Comments ({comments.length})</span>
        <span className="text-neutral-500 dark:text-neutral-400 text-lg">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 border-t border-neutral-100 dark:border-neutral-800">
          <CommentForm eventId={eventId} className="mt-4" />
          <div className="mt-6 space-y-4">
            {topLevel.length === 0 && (
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                No comments yet.
              </p>
            )}
            {topLevel.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                replies={byParent[comment.id] ?? []}
                eventId={eventId}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
