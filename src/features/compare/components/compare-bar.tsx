"use client";

import React from "react";
import { useCompareStore } from "@/stores/use-compare-store";
import { Button } from "@/components/ui/button";
import { X, ArrowRightLeft, LayoutPanelLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function CompareBar() {
  const { selectedCollegeSlugs, removeCollege, clearComparison } = useCompareStore();
  const count = selectedCollegeSlugs.length;

  if (count === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-background border shadow-2xl rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-1">
          <div className="flex -space-x-2 mr-2">
            <Badge variant="default" className="h-8 w-8 rounded-full flex items-center justify-center border-2 border-background p-0 font-bold">
              {count}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {selectedCollegeSlugs.map((slug) => (
              <Badge 
                key={slug} 
                variant="secondary" 
                className="pl-2 pr-1 py-1 gap-1 whitespace-nowrap"
              >
                {slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                <button 
                  onClick={() => removeCollege(slug)}
                  className="hover:bg-muted rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 border-l pl-4">
          <Button variant="ghost" size="sm" onClick={clearComparison} className="text-muted-foreground">
            Clear
          </Button>
          <Link href={`/compare?colleges=${selectedCollegeSlugs.join(',')}`}>
            <Button size="sm" disabled={count < 2}>
              Compare
              <ArrowRightLeft className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
