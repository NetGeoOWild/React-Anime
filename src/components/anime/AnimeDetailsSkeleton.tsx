import { Skeleton } from "../ui/skeleton";

export function AnimeDetailsSkeleton() {
  return (
    <div className="px-5 py-17.5">
      <div className="flex flex-col justify-center gap-5 py-5 md:flex-row">
        <Skeleton className="h-200 basis-1/4" />
        <Skeleton className="h-200 basis-1/2" />
      </div>
    </div>
  );
}
