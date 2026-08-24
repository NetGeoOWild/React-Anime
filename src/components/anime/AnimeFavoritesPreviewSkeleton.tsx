import { Skeleton } from "@/components/ui/skeleton";

export function AnimeFavoritesPreviewSkeleton() {
  return (
    <div className="pt-12.5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <Skeleton
              key={index}
              className="aspect-3/4 h-full overflow-hidden rounded-lg"
            />
          );
        })}
      </div>
    </div>
  );
}
