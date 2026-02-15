import Link from "next/link";
import { CreateEventForm } from "./CreateEventForm";

export default function CreateEventPage() {
  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-gray-600 hover:text-gray-800 mb-4 inline-block"
        >
          ← Back to feed
        </Link>
        <h1 className="text-4xl font-bold">
          Create Event
        </h1>
      </div>

      <CreateEventForm />
    </main>
  );
}
