import type { ReactNode } from "react";
import type { CastMember } from "./cast";
import type { CategorizedShows, Show, SortBy } from "./show";

export type SortOption = {
  value: SortBy;
  label: string;
};

export type AppLoaderProps = {
  message?: string;
};

export type CastMemberProps = {
  member: CastMember;
};

export type CastInfoProps = {
  cast: CastMember[];
  castError: string | null;
  castLoading: boolean;
};

export type InfoChipProps = {
  label: string;
  value?: string | null;
};

export type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value?: string) => void;
  placeholder?: string;
};

export type ShowCardProps = {
  show: Show;
};

export type ShowCatalogProps = {
  loading: boolean;
  error: string | null;
  catalogData: CategorizedShows;
};

export type ShowDetailContentProps = {
  show: Show;
  cast: CastMember[];
  castError: string | null;
  castLoading: boolean;
};

export type ShowInfoProps = {
  show: Show;
};

export type ShowPosterProps = {
  src?: string;
  alt: string;
  loading?: "lazy" | "eager";
  className?: string;
  children?: ReactNode;
};

export type ShowRatingProps = {
  score: number;
  className?: string;
};

export type SortDropdownProps = {
  value: SortBy;
  options: readonly SortOption[];
  onChange: (value: SortBy) => void;
  className?: string;
};

export type HomePageProps = {
  catalogData: CategorizedShows;
  error: string | null;
};
