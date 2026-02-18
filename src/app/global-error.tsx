"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex items-center justify-center min-h-screen bg-neutral-50 p-6">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">&#x1F635;</div>
          <h1 className="text-xl font-semibold text-neutral-900 mb-2">
            Something went wrong
          </h1>
          <p className="text-neutral-500 text-sm mb-6">
            Sorry about that — we hit an unexpected error. Try refreshing, and
            if it keeps happening, clear your browser data for this site.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
