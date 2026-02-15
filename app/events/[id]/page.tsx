import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CommentsSection } from "./CommentsSection";

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
    <main className="max-w-4xl mx-auto px-6 py-10">
      <Link
        href="/"
        className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 mb-6 inline-block transition-colors"
      >
        ← Back to feed
      </Link>

      <article className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm mb-8">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          {event.title}
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
          Created {new Date(event.created_at).toLocaleDateString()}
        </p>
        {event.description && (
          <p className="text-neutral-600 dark:text-neutral-400 mt-4 leading-relaxed">
            {event.description}
          </p>
        )}
        {event.tags?.length > 0 && (
          <div className="mt-4 flex gap-2 flex-wrap">
            {event.tags.map((t: string) => (
              <span
                key={t}
                className="px-3 py-1 text-sm rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </article>

      <CommentsSection eventId={id} comments={comments ?? []} />
    </main>
  );
}
