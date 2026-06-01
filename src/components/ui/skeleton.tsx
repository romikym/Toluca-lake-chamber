import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-lg", className)} aria-hidden />;
}

/** A card-shaped placeholder used while dashboard/list data loads. */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-line bg-surface p-5 shadow-sm", className)}>
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton className="mt-5 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-4/5" />
    </div>
  );
}

export function SkeletonStat() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
      <Skeleton className="h-10 w-10 rounded-xl" />
      <Skeleton className="mt-4 h-7 w-20" />
      <Skeleton className="mt-2 h-3 w-28" />
    </div>
  );
}
