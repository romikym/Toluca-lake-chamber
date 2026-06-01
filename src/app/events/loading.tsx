import { Container } from "@/components/ui/container";
import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export default function EventsLoading() {
  return (
    <>
      <div className="bg-brand-800 py-20 sm:py-28">
        <Container className="space-y-4">
          <Skeleton className="h-4 w-28 bg-white/20" />
          <Skeleton className="h-12 w-2/3 bg-white/20" />
          <Skeleton className="h-5 w-1/2 bg-white/15" />
        </Container>
      </div>
      <Container className="py-12">
        <Skeleton className="h-12 w-full rounded-xl" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </Container>
    </>
  );
}
