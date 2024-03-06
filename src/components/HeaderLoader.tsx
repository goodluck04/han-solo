import { Skeleton } from "@/components/ui/skeleton"

export function HeaderLoader() {
    return (
        <div className="ml-4 flex  gap-2  w-[95%] mt-2">
            <Skeleton className="h-12 w-12 rounded-full" />
           <div className="w-full">
           <Skeleton className="h-4 w-full mx-1 mt-2" />
            <Skeleton className="h-4 w-full mx-1 mt-2" />
           </div>
           <Skeleton className="h-12 w-12 rounded-full" />
        </div>
    )
}
