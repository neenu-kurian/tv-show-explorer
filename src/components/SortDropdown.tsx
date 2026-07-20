import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { SortDropdownProps } from "@/types/components";
import type { SortBy } from "@/types/show";

export function SortDropdown({ value, options, onChange, className }: SortDropdownProps) {
  return (
    <div className={`relative inline-flex items-center rounded-lg bg-gray-100 px-3 md:min-w-50 ${className ?? ""}`}>
      <select
        value={value}
        aria-label="Sort shows by rating"
        name="select-sort"
        onChange={(event) => onChange(event.target.value as SortBy)}
        className="w-full cursor-pointer appearance-none border-none bg-transparent py-2.5 pr-6 text-sm font-medium text-gray-900 focus-ring"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon aria-hidden="true" className="pointer-events-none absolute right-3 h-4 w-4 shrink-0 text-gray-500" />
    </div>
  );
}
