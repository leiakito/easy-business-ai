export function ToolSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 animate-pulse rounded bg-muted"></div>
        <div className="h-10 w-28 animate-pulse rounded bg-muted"></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-muted"></div>
              <div className="mb-2 h-4 w-full animate-pulse rounded bg-muted"></div>
              <div className="mb-4 h-4 w-2/3 animate-pulse rounded bg-muted"></div>
              <div className="mt-4 flex justify-end gap-2">
                <div className="h-8 w-20 animate-pulse rounded bg-muted"></div>
                <div className="h-8 w-20 animate-pulse rounded bg-muted"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
