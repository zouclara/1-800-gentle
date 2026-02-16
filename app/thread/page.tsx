import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Props {
  searchParams: Promise<{
    search?: string;
    tags?: string;
  }>;
}

function buildUrl(search: string, tags: string[]) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (tags.length) params.set("tags", tags.join(","));
  const q = params.toString();
  return q ? `/thread?${q}` : "/thread";
}

export default async function Thread({ searchParams }: Props) {
  const params = await searchParams;
  const search = params.search ?? "";
  const selectedTags = (params.tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  let query = supabase.from("events").select("*");

  if (search) {
    query = query.or(
      `title.ilike.%${search}%,tags.cs.${JSON.stringify([search])}`
    );
  }

  if (selectedTags.length > 0) {
    const orConditions = selectedTags
      .map((t) => `tags.cs.${JSON.stringify([t])}`)
      .join(",");
    query = query.or(orConditions);
  }

  const { data: events, error } = await query.order(
    "created_at",
    { ascending: false }
  );

  if (error) {
    console.error(error);
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
          Threads
        </h1>
        <Link
          href="/thread/new"
          className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-200"
        >
          Create Thread
        </Link>
      </div>

      <form action="/thread" method="GET" className="mb-8">
        <input type="hidden" name="tags" value={selectedTags.join(",")} />
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search threads..."
          className="w-full max-w-md px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-shadow duration-200"
        />
      </form>

      {selectedTags.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            Filtering by:
          </span>
          {selectedTags.map((tag) => (
            <Link
              key={tag}
              href={buildUrl(search, selectedTags.filter((t) => t !== tag))}
              className="px-3 py-1 rounded-full text-sm font-medium bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 hover:opacity-90 transition-opacity duration-200"
            >
              {tag} ×
            </Link>
          ))}
          <Link
            href={buildUrl(search, [])}
            className="ml-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 underline transition-colors"
          >
            Clear all
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {events?.length === 0 && (
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            No threads found.
          </p>
        )}

        {events?.map((event) => (
          <article
            key={event.id}
            className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200"
          >
            <Link href={`/thread/${event.slug || event.id}`}>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors duration-200">
                {event.title}
              </h2>
            </Link>

            <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-sm leading-relaxed">
              {event.description}
            </p>

            <div className="mt-4 flex gap-2 flex-wrap">
              {event.tags?.map((t: string) => {
                const isActive = selectedTags.includes(t);
                const nextTags = isActive
                  ? selectedTags.filter((tag) => tag !== t)
                  : [...selectedTags, t];
                return (
                  <Link
                    key={t}
                    href={buildUrl(search, nextTags)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
                      isActive
                        ? "bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    }`}
                  >
                    {t}
                  </Link>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
