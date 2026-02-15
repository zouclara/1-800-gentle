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
  return q ? `/?${q}` : "/";
}

export default async function Home({ searchParams }: Props) {
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
    <main className="min-h-screen p-10 bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold">
          Curated Events Feed
        </h1>
        <Link
          href="/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create Event
        </Link>
      </div>

      {/* Search */}
      <form action="/" method="GET" className="mb-8">
        <input type="hidden" name="tags" value={selectedTags.join(",")} />
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search events..."
          className="w-full max-w-md p-3 border rounded-lg"
        />
      </form>

      {/* Active Tag Filters */}
      {selectedTags.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-gray-600">Filtering by:</span>
          {selectedTags.map((tag) => (
            <Link
              key={tag}
              href={buildUrl(search, selectedTags.filter((t) => t !== tag))}
              className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700"
            >
              {tag} ×
            </Link>
          ))}
          <Link
            href={buildUrl(search, [])}
            className="ml-2 text-sm text-gray-500 underline"
          >
            Clear all
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {events?.length === 0 && (
          <p className="text-gray-500">No events found.</p>
        )}

        {events?.map((event) => (
          <div
            key={event.id}
            className="bg-white p-6 rounded-lg shadow"
          >
            <Link href={`/events/${event.id}`}>
              <h2 className="text-2xl font-semibold hover:text-blue-600">
                {event.title}
              </h2>
            </Link>

            <p className="text-gray-600 mt-2">
              {event.description}
            </p>

            <div className="mt-3 flex gap-2 flex-wrap">
              {event.tags?.map((t: string) => {
                const isActive = selectedTags.includes(t);
                const nextTags = isActive
                  ? selectedTags.filter((tag) => tag !== t)
                  : [...selectedTags, t];
                return (
                  <Link
                    key={t}
                    href={buildUrl(search, nextTags)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-700"
                    } hover:opacity-90`}
                  >
                    {t}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}