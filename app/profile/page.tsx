import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "@/app/components/LogoutButton";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
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

      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-8">
          Profile
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
              Email
            </label>
            <p className="text-lg text-neutral-900 dark:text-neutral-100">
              {user.email}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
              User ID
            </label>
            <p className="text-sm font-mono text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-3 py-2 rounded">
              {user.id}
            </p>
          </div>

          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <LogoutButton />
          </div>
        </div>
      </div>
    </main>
  );
}
