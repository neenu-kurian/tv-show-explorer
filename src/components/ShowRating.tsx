import type { ShowRatingProps } from "@/types/components";

export function ShowRating({ score, className }: ShowRatingProps) {
  return <div className={`absolute inline-flex items-center font-semibold ${className ?? ""}`}>{score.toFixed(1)}</div>;
}
