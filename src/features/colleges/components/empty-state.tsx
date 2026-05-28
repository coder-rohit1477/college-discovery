import React from "react";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="bg-muted p-6 rounded-full mb-4">
        <SearchX className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No colleges found</h3>
      <p className="text-muted-foreground max-w-sm mb-6">
        We couldn't find any colleges matching your current filters. Try adjusting your search or clearing filters.
      </p>
      <Button onClick={onClearFilters}>Clear all filters</Button>
    </div>
  );
}
