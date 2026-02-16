import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ThreadDetailPage({ params }: Props) {
  const { slug } = await params;

  const { data: thread, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !thread) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Link
          href="/thread"
          className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
        >
          ← Back to Threads
        </Link>
      </div>

      <article className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-8">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            {thread.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
            <time dateTime={thread.created_at}>
              {new Date(thread.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
            {thread.description}
          </p>
        </div>

        {thread.tags && thread.tags.length > 0 && (
          <footer className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-wrap gap-2">
              {thread.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/thread?tags=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 text-sm rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </footer>
        )}
      </article>
    </main>
  );
}
