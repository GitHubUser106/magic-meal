import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="text-center max-w-sm">
        <div className="text-5xl mb-4">&#x1F373;</div>
        <h1 className="text-xl font-semibold text-neutral-900 mb-2">
          Page not found
        </h1>
        <p className="text-neutral-500 text-sm mb-6">
          This recipe doesn&apos;t exist — but we&apos;ve got 63 that do.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
        >
          Back to cooking
        </Link>
      </div>
    </div>
  );
}
