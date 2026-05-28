"use client";

import React from "react";
import { CollegeType } from "@prisma/client";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FilterX } from "lucide-react";

interface FiltersSidebarProps {
  filters: {
    city?: string;
    state?: string;
    type?: CollegeType;
    minRating?: number;
  };
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
  cities: string[];
  states: string[];
}

export function FiltersSidebar({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  cities,
  states
}: FiltersSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearFilters}
          className="h-8 px-2 text-xs text-muted-foreground hover:text-primary"
        >
          <FilterX className="mr-2 h-3 w-3" />
          Clear All
        </Button>
      </div>
      
      <Separator />

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            State
          </label>
          <Select 
            value={filters.state || "all"} 
            onValueChange={(val) => onFilterChange("state", val === "all" ? undefined : val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All States" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            City
          </label>
          <Select 
            value={filters.city || "all"} 
            onValueChange={(val) => onFilterChange("city", val === "all" ? undefined : val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            College Type
          </label>
          <Select 
            value={filters.type || "all"} 
            onValueChange={(val) => onFilterChange("type", val === "all" ? undefined : val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value={CollegeType.PUBLIC}>Public</SelectItem>
              <SelectItem value={CollegeType.PRIVATE}>Private</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Min Rating
          </label>
          <Select 
            value={filters.minRating?.toString() || "0"} 
            onValueChange={(val) => onFilterChange("minRating", val === "0" ? undefined : parseFloat(val))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any Rating</SelectItem>
              <SelectItem value="4.5">4.5+ Stars</SelectItem>
              <SelectItem value="4">4.0+ Stars</SelectItem>
              <SelectItem value="3.5">3.5+ Stars</SelectItem>
              <SelectItem value="3">3.0+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
