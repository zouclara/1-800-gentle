import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
        Thread Not Found
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        The thread you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/thread"
        className="inline-block px-6 py-3 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
      >
        Browse All Threads
      </Link>
    </main>
  );
}
