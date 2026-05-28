"use client";

import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface SortDropdownProps {
  value: string;
  order: "asc" | "desc";
  onSortChange: (value: string, order: "asc" | "desc") => void;
}

export function SortDropdown({ value, order, onSortChange }: SortDropdownProps) {
  const combinedValue = `${value}-${order}`;

  const handleChange = (val: string) => {
    const [newValue, newOrder] = val.split("-");
    onSortChange(newValue, newOrder as "asc" | "desc");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
      <Select value={combinedValue} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ranking-asc">Ranking: Low to High</SelectItem>
          <SelectItem value="ranking-desc">Ranking: High to Low</SelectItem>
          <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
          <SelectItem value="fees-asc">Fees: Low to High</SelectItem>
          <SelectItem value="fees-desc">Fees: High to Low</SelectItem>
          <SelectItem value="createdAt-desc">Newest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
