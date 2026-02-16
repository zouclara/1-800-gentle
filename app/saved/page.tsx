import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Bookmark } from "lucide-react";

export default async function SavedThreadsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: savedThreads } = await supabase
    .from("saved_threads")
    .select(
      `
      id,
      created_at,
      events:thread_id (
        id,
        slug,
        title,
        description,
        tags,
        created_at
      )
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const threads = savedThreads
    ?.map((saved: any) => saved.events)
    .filter(Boolean);

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link
          href="/thread"
          className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
        >
          ← Back to Threads
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <Bookmark className="w-8 h-8 text-neutral-900 dark:text-neutral-100" />
        <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
          Saved Threads
        </h1>
      </div>

      {!threads || threads.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div className="bg-neutral-100 dark:bg-neutral-900 rounded-full p-6 mb-6">
            <Bookmark className="w-12 h-12 text-neutral-400 dark:text-neutral-600" />
          </div>
          <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-2">
            No saved threads yet
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-center max-w-md mb-6">
            Save threads to easily find them later. Click the bookmark icon on
            any thread to add it here.
          </p>
          <Link
            href="/thread"
            className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            Browse Threads
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {threads.map((thread: any) => (
            <article
              key={thread.id}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200"
            >
              <Link href={`/thread/${thread.slug || thread.id}`}>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors duration-200">
                  {thread.title}
                </h2>
              </Link>

              <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-sm leading-relaxed">
                {thread.description}
              </p>

              {thread.tags && thread.tags.length > 0 && (
                <div className="mt-4 flex gap-2 flex-wrap">
                  {thread.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/thread?tags=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 text-sm rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
