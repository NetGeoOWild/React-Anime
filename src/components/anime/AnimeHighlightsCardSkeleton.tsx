import { Skeleton } from "@/components/ui/skeleton";

export function AnimeHighlightsCardSkeleton() {
  return (
    <div className="py-12.5">
      <div className="flex gap-5 max-lg:flex-col">
        <div className="basis-2/4">
          <Skeleton className="aspect-3/4 h-full overflow-hidden rounded-lg" />
        </div>

        <div className="flex basis-1/4 flex-col gap-4">
          <Skeleton className="aspect-3/4 h-full overflow-hidden rounded-lg" />
          <Skeleton className="aspect-3/4 h-full overflow-hidden rounded-lg" />
        </div>

        <div className="flex basis-1/4 flex-col gap-4">
          <Skeleton className="aspect-3/4 h-full overflow-hidden rounded-lg" />
          <Skeleton className="aspect-3/4 h-full overflow-hidden rounded-lg" />
        </div>
      </div>
    </div>
  );
}
