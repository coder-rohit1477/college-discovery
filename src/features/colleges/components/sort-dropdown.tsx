"use client";

import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

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
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground">
        <ArrowUpDown className="h-3.5 w-3.5" />
        Sort
      </div>
      <Select value={combinedValue} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px] md:w-[220px] h-12 rounded-2xl border-2 hover:border-primary/50 transition-all font-bold">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl shadow-2xl border-primary/10">
          <SelectItem value="ranking-asc" className="font-medium">Ranking: Low to High</SelectItem>
          <SelectItem value="ranking-desc" className="font-medium">Ranking: High to Low</SelectItem>
          <SelectItem value="rating-desc" className="font-medium">Rating: High to Low</SelectItem>
          <SelectItem value="fees-asc" className="font-medium">Fees: Low to High</SelectItem>
          <SelectItem value="fees-desc" className="font-medium">Fees: High to Low</SelectItem>
          <SelectItem value="createdAt-desc" className="font-medium">Newest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
