"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  return (
    <div className={`prose prose-neutral prose-sm dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl font-semibold mt-6 mb-2 first:mt-0 text-neutral-900 dark:text-neutral-100">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-semibold mt-5 mb-2 first:mt-0 text-neutral-900 dark:text-neutral-100">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-semibold mt-4 mb-1 first:mt-0 text-neutral-900 dark:text-neutral-100">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3 last:mb-0">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-neutral-800 dark:text-neutral-200">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-neutral-700 dark:text-neutral-300">
              {children}
            </em>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside my-3 space-y-1 text-neutral-600 dark:text-neutral-400 pl-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside my-3 space-y-1 text-neutral-600 dark:text-neutral-400 pl-2">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-600 pl-4 my-3 text-neutral-600 dark:text-neutral-400 italic">
              {children}
            </blockquote>
          ),
          pre: ({ children }) => (
            <pre className="bg-neutral-900 dark:bg-neutral-950 text-neutral-100 p-4 rounded-lg overflow-x-auto my-3 text-sm font-mono">
              {children}
            </pre>
          ),
          code: ({ className: codeClassName, children }) => {
            const isInline = !codeClassName;
            if (isInline) {
              return (
                <code className="bg-neutral-800 dark:bg-neutral-900 text-neutral-100 px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            return <code className="font-mono text-sm">{children}</code>;
          },
          hr: () => (
            <hr className="my-4 border-neutral-200 dark:border-neutral-700" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
