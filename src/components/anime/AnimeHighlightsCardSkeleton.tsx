import { Skeleton } from "@/components/ui/skeleton";

export function AnimeHighlightsCardSkeleton() {
  return (
    <div className="py-12.5">
      <div className="flex gap-5 max-lg:flex-col">
        <div className="basis-2/4">
          <Skeleton className="aspect-3/4 h-full w-full rounded-lg max-lg:mx-auto max-lg:max-w-117.5" />
        </div>

        <div className="flex basis-1/4 flex-col gap-4">
          <Skeleton className="aspect-3/4 w-full rounded-lg max-lg:mx-auto max-lg:max-w-117.5" />
          <Skeleton className="aspect-3/4 w-full rounded-lg max-lg:mx-auto max-lg:max-w-117.5" />
        </div>

        <div className="flex basis-1/4 flex-col gap-4">
          <Skeleton className="aspect-3/4 w-full rounded-lg max-lg:mx-auto max-lg:max-w-117.5" />
          <Skeleton className="aspect-3/4 w-full rounded-lg max-lg:mx-auto max-lg:max-w-117.5" />
        </div>
      </div>
    </div>
  );
}
