import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  count,
  size = "sm",
}: {
  rating: number;
  count?: number;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, index) => {
          const filled = rating >= index + 1 || rating > index + 0.4;
          return (
            <Star
              key={index}
              className={cn(dim, filled ? "fill-forest text-forest" : "fill-stone-200 text-stone-200")}
            />
          );
        })}
      </div>
      {typeof count === "number" && (
        <span className="text-xs text-muted">({count})</span>
      )}
    </div>
  );
}
