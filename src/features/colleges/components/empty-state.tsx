import React from "react";
import { Button } from "@/components/ui/button";
import { SearchX, Heart, ArrowRightLeft, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: "search" | "heart" | "compare" | "error";
  actionText?: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
}

export function EmptyState({ 
  title = "No results found", 
  description = "Try adjusting your filters or search terms to find what you're looking for.",
  icon = "search",
  actionText,
  onAction,
  actionHref,
  className
}: EmptyStateProps) {
  const Icon = {
    search: SearchX,
    heart: Heart,
    compare: ArrowRightLeft,
    error: AlertCircle
  }[icon];

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-24 px-6 text-center animate-in fade-in zoom-in-95 duration-700 bg-muted/5 rounded-[3rem] border-2 border-dashed border-muted-foreground/10",
      className
    )}>
      <div className="relative mb-8">
        <div className="bg-primary/10 p-10 rounded-full ring-8 ring-primary/5 group transition-all duration-500 hover:scale-110">
          <Icon className="h-16 w-16 text-primary/60 group-hover:text-primary transition-colors" />
        </div>
        {icon === "search" && (
          <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-2 shadow-lg border">
            <RefreshCw className="h-4 w-4 text-primary animate-spin-slow" />
          </div>
        )}
      </div>
      
      <h3 className="text-3xl font-black mb-4 tracking-tight leading-tight">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-10 leading-relaxed font-medium">
        {description}
      </p>
      
      {actionHref ? (
        <Link href={actionHref}>
          <Button size="lg" className="h-14 px-10 font-black shadow-xl shadow-primary/20 rounded-2xl transition-all hover:scale-105 active:scale-95">
            {actionText || "Go back"}
          </Button>
        </Link>
      ) : onAction ? (
        <Button 
          size="lg" 
          onClick={onAction} 
          className="h-14 px-10 font-black shadow-xl shadow-primary/20 rounded-2xl transition-all hover:scale-105 active:scale-95"
        >
          {actionText || "Try again"}
        </Button>
      ) : null}
    </div>
  );
}
