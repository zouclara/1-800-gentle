import Link from "next/link";
import { CreateEventForm } from "./CreateEventForm";

export default function CreateEventPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <Link
        href="/"
        className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 mb-4 inline-block transition-colors"
      >
        ← Back to feed
      </Link>
      <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-8">
        Create Event
      </h1>

      <CreateEventForm />
    </main>
  );
}
