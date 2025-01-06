import { Skeleton } from '@/components/ui/skeleton'

export default function ChatLoading() {
  return (
    <div>
      <div className="flex min-h-[80vh] flex-col gap-12">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-[40px] max-w-[700px] rounded-md" />
          <Skeleton className="h-[20px] w-[70%] rounded-md" />
          <Skeleton className="h-[20px] w-[30%] rounded-md" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-[40px] max-w-[700px] rounded-md" />
          <Skeleton className="h-[20px] w-[82%] rounded-md" />
          <Skeleton className="h-[20px] w-[45%] rounded-md" />
        </div>
      </div>
      <div className="sticky bottom-0 mt-5 flex flex-row items-center gap-4 bg-background pb-8 pt-1">
        <Skeleton className="h-[55px] w-[95%] rounded-md" />
        <Skeleton className="h-[55px] w-[3%] rounded-md" />
      </div>
    </div>
  )
}
