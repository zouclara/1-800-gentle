import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CommentForm } from "./CommentForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;

  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  const { data: comments } = await supabase
    .from("comments")
    .select("*")
    .eq("event_id", id)
    .order("created_at", { ascending: true });

  if (eventError || !event) {
    notFound();
  }

  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <Link
        href="/"
        className="text-sm text-gray-600 hover:text-gray-800 mb-6 inline-block"
      >
        ← Back to feed
      </Link>

      <article className="bg-white p-6 rounded-lg shadow mb-8">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        {event.description && (
          <p className="text-gray-600 mt-4">{event.description}</p>
        )}
        {event.tags?.length > 0 && (
          <div className="mt-4 flex gap-2 flex-wrap">
            {event.tags.map((t: string) => (
              <span
                key={t}
                className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </article>

      <section>
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <CommentForm eventId={id} />
        <div className="mt-6 space-y-4">
          {comments?.length === 0 && (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          )}
          {comments?.map((comment) => (
            <div
              key={comment.id}
              className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-200"
            >
              <p className="text-gray-800">{comment.content}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
