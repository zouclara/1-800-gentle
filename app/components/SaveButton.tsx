"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface SaveButtonProps {
  threadId: string;
}

export function SaveButton({ threadId }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from("saved_threads")
          .select("id")
          .eq("user_id", user.id)
          .eq("thread_id", threadId)
          .single();

        setIsSaved(!!data);
      }
      setLoading(false);
    };

    checkAuth();
  }, [threadId, supabase]);

  const handleToggle = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setLoading(true);
    const previousState = isSaved;
    setIsSaved(!isSaved);

    try {
      if (previousState) {
        await supabase
          .from("saved_threads")
          .delete()
          .eq("user_id", user.id)
          .eq("thread_id", threadId);
      } else {
        await supabase
          .from("saved_threads")
          .insert({ user_id: user.id, thread_id: threadId });
      }
    } catch (error) {
      setIsSaved(previousState);
      console.error("Error toggling save:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return null;
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        isSaved
          ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
          : "bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"
      } disabled:opacity-50`}
    >
      <Bookmark
        className={`w-4 h-4 transition-all ${
          isSaved ? "fill-current" : ""
        }`}
      />
      {isSaved ? "Saved" : "Save"}
    </button>
  );
}
