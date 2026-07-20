import type { AppLoaderProps } from "@/types/components";

export function AppLoader({ message = "Loading..." }: AppLoaderProps) {
  return (
    <div className="flex items-center justify-center py-10 text-sm text-gray-600" role="status">
      <span className="mr-3 inline-block h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700" />
      {message}
    </div>
  );
}
