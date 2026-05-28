"use client";

import React, { useState, useEffect } from "react";
import { useCompareStore } from "@/stores/use-compare-store";
import { Button } from "@/components/ui/button";
import { X, ArrowRightLeft, ChevronUp, ChevronDown, GraduationCap, Trash2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CompareBar() {
  const { selectedCollegeSlugs, removeCollege, clearComparison } = useCompareStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const count = selectedCollegeSlugs.length;

  useEffect(() => {
    if (count > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setIsExpanded(false);
    }
  }, [count]);

  if (!isVisible && count === 0) return null;

  return (
    <div className={cn(
      "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl px-4 pointer-events-none transition-all duration-500",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
    )}>
      <div className="pointer-events-auto bg-background/95 backdrop-blur-xl border border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[2rem] overflow-hidden transition-all duration-500 ease-in-out border-b-4 border-b-primary/40">
        {/* Expanded View */}
        <div className={cn(
          "overflow-hidden transition-all duration-500 ease-in-out bg-muted/30",
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="p-6 border-b">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedCollegeSlugs.map((slug) => (
                <div 
                  key={slug} 
                  className="relative group bg-card border rounded-2xl p-4 flex flex-col items-center text-center gap-3 shadow-sm hover:border-primary/50 transition-all hover:shadow-md animate-in zoom-in-95 duration-300"
                >
                  <button 
                    onClick={() => removeCollege(slug)}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all shadow-lg z-10 hover:scale-110 active:scale-90"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                     <GraduationCap className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-black truncate uppercase tracking-widest text-foreground w-full">
                    {slug.split('-').join(' ')}
                  </span>
                </div>
              ))}
              {Array.from({ length: 4 - count }).map((_, i) => (
                <div key={`empty-${i}`} className="border-2 border-dashed border-muted/50 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[100px] bg-muted/5 opacity-50">
                  <div className="w-8 h-8 rounded-full border-2 border-dashed border-muted/50 flex items-center justify-center mb-2 text-muted-foreground">
                     <span className="text-xs font-bold">+</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest italic">Slot {count + i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Bar */}
        <div className="p-4 md:p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="bg-primary text-primary-foreground h-12 w-12 rounded-2xl flex items-center justify-center font-black shadow-lg shadow-primary/30 text-lg transition-transform hover:scale-110 cursor-default">
                  {count}
                </div>
                {count > 0 && (
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                )}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-black tracking-tight uppercase">Comparison Queue</p>
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-700 ease-out" 
                        style={{ width: `${(count / 4) * 100}%` }}
                      />
                   </div>
                   <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">{4 - count} slots left</p>
                </div>
              </div>
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              className="h-10 gap-2 text-muted-foreground hover:text-primary transition-colors rounded-xl px-4 group"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />}
              <span className="text-xs font-black uppercase tracking-widest hidden md:inline-block">{isExpanded ? "Hide Details" : "Show Selected"}</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearComparison} 
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-12 px-4 transition-all rounded-xl font-bold uppercase text-[10px] tracking-widest hidden md:flex"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
            <Link href={`/compare?colleges=${selectedCollegeSlugs.join(',')}`} className="shrink-0">
              <Button size="lg" disabled={count < 2} className="h-12 md:h-14 px-6 md:px-10 font-black rounded-2xl shadow-xl shadow-primary/20 group transition-all hover:scale-[1.02] active:scale-[0.98]">
                <span className="hidden md:inline-block mr-2 uppercase tracking-widest">Compare Now</span>
                <span className="md:hidden mr-2">Compare</span>
                <ArrowRightLeft className="h-5 w-5 group-hover:rotate-180 transition-transform duration-700" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
