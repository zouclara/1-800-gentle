"use client";

import { useState } from "react";
import { CommentForm } from "./CommentForm";
import { MarkdownContent } from "@/app/components/MarkdownContent";

interface Comment {
  id: string;
  event_id: string;
  content: string;
  created_at: string;
  parent_id?: string | null;
}

interface CommentItemProps {
  comment: Comment;
  replies: Comment[];
  eventId: string;
}

export function CommentItem({ comment, replies, eventId }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-200">
      <div className="text-base leading-relaxed">
        <MarkdownContent
          content={comment.content}
          className="[&_h1]:text-lg [&_h2]:text-base [&_h3]:text-sm [&_p]:text-neutral-600 dark:[&_p]:text-neutral-400 [&_p]:mb-2"
        />
      </div>
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {new Date(comment.created_at).toLocaleString()}
        </p>
        <button
          type="button"
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 font-medium transition-colors"
        >
          {showReplyForm ? "Cancel reply" : "Reply"}
        </button>
      </div>
      {showReplyForm && (
        <div className="mt-4 pl-6 ml-2 border-l-2 border-neutral-200 dark:border-neutral-700">
          <CommentForm
            eventId={eventId}
            parentId={comment.id}
            onSuccess={() => setShowReplyForm(false)}
          />
        </div>
      )}
      {replies.length > 0 && (
        <div className="mt-4 space-y-3">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="ml-6 pl-4 border-l-2 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 rounded-r-lg py-3 pr-4"
            >
              <div className="text-sm leading-relaxed">
                <MarkdownContent
                  content={reply.content}
                  className="[&_p]:text-neutral-600 dark:[&_p]:text-neutral-400 [&_p]:mb-1.5"
                />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                {new Date(reply.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
