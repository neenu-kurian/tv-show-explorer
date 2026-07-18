import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">Page Not Found</h1>
      <p className="mb-6 max-w-md text-gray-700">
        Oops! The page you are trying to view does not exist or may have moved.
      </p>
      <Link
        href="/"
        className="inline-block rounded-lg bg-gray-100 px-4 py-2 font-medium text-black transition hover:bg-gray-300"
      >
        Go back to home
      </Link>
    </div>
  );
}
