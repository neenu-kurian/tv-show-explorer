import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { SearchInputProps } from "@/types/components";

export function SearchInput({ value, onChange, onSubmit, placeholder = "Search for TV shows..." }: SearchInputProps) {
  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(value);
      }}
      className="flex w-full items-center gap-6 rounded-md bg-gray-100 px-4 py-2 outline-none md:w-search"
    >
      <MagnifyingGlassIcon className="h-8 w-8 flex-none" />
      <input
        value={value}
        name="search-input"
        type="search"
        maxLength={80}
        autoComplete="off"
        aria-label="Search shows"
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-sm bg-transparent p-0 text-base text-gray-900 outline-none appearance-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400"
      />
    </form>
  );
}
