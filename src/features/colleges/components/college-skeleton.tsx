import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CollegeSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col h-full rounded-[2rem] border-2">
      <Skeleton className="h-52 w-full" />
      <CardHeader className="p-6 pb-2">
        <Skeleton className="h-7 w-3/4 mb-3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="p-6 pt-2 flex-1">
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-dashed flex items-center justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-6 w-1/4" />
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 gap-3">
        <Skeleton className="h-12 flex-1 rounded-xl" />
        <Skeleton className="h-12 flex-1 rounded-xl" />
      </CardFooter>
    </Card>
  );
}
