import { Skeleton } from "../ui/skeleton";

export function AnimeDetailsSkeleton() {
  return (
    <div className="px-5 py-17.5">
      <div className="flex flex-col justify-center gap-5 py-5 lg:flex-row">
        <Skeleton className="mx-auto aspect-3/4 w-full max-w-117.5 lg:mx-0 lg:max-w-none lg:basis-1/4" />
        <Skeleton className="aspect-12/6 w-full basis-1/2 lg:aspect-3/4" />
      </div>
    </div>
  );
}
