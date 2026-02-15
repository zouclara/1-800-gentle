"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface CommentFormProps {
  eventId: string;
}

export function CommentForm({ eventId }: CommentFormProps) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const { error: insertError } = await supabase.from("comments").insert({
      event_id: eventId,
      content: content.trim(),
    });

    if (insertError) {
      setError(insertError.message);
      setIsSubmitting(false);
      return;
    }

    setContent("");
    router.refresh();
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}
      <div className="flex gap-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          rows={2}
          required
          disabled={isSubmitting}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed self-end"
        >
          {isSubmitting ? "Posting…" : "Post"}
        </button>
      </div>
    </form>
  );
}
