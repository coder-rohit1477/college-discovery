import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CollegeSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <Skeleton className="h-48 w-full" />
      <CardHeader className="p-4 pb-0">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <div className="grid grid-cols-2 gap-4 mt-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-1">
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-6 w-1/4" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </CardFooter>
    </Card>
  );
}
