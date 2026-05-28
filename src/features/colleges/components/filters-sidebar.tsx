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
import { FilterX, MapPin, Building2, Star, Map as MapIcon } from "lucide-react";

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
    <div className="space-y-8 bg-card border rounded-[2rem] p-6 shadow-sm">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-black tracking-tight uppercase text-primary/80">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearFilters}
          className="h-9 px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all rounded-xl"
        >
          <FilterX className="mr-2 h-3.5 w-3.5" />
          Clear
        </Button>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-2">
            <MapIcon className="h-3.5 w-3.5 text-primary" />
            State
          </label>
          <Select 
            value={filters.state || "all"} 
            onValueChange={(val) => onFilterChange("state", val === "all" ? undefined : val)}
          >
            <SelectTrigger className="h-12 rounded-2xl border-2 hover:border-primary/50 transition-all font-bold">
              <SelectValue placeholder="All States" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl shadow-2xl border-primary/10">
              <SelectItem value="all" className="font-bold">All States</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state} className="font-medium">{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-2">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            City
          </label>
          <Select 
            value={filters.city || "all"} 
            onValueChange={(val) => onFilterChange("city", val === "all" ? undefined : val)}
          >
            <SelectTrigger className="h-12 rounded-2xl border-2 hover:border-primary/50 transition-all font-bold">
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl shadow-2xl border-primary/10">
              <SelectItem value="all" className="font-bold">All Cities</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city} className="font-medium">{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-2">
            <Building2 className="h-3.5 w-3.5 text-primary" />
            Institution Type
          </label>
          <Select 
            value={filters.type || "all"} 
            onValueChange={(val) => onFilterChange("type", val === "all" ? undefined : val)}
          >
            <SelectTrigger className="h-12 rounded-2xl border-2 hover:border-primary/50 transition-all font-bold">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl shadow-2xl border-primary/10">
              <SelectItem value="all" className="font-bold">All Types</SelectItem>
              <SelectItem value={CollegeType.PUBLIC} className="font-medium">Public (Govt.)</SelectItem>
              <SelectItem value={CollegeType.PRIVATE} className="font-medium">Private (Pvt.)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-2">
            <Star className="h-3.5 w-3.5 text-primary" />
            Minimum Rating
          </label>
          <Select 
            value={filters.minRating?.toString() || "0"} 
            onValueChange={(val) => onFilterChange("minRating", val === "0" ? undefined : parseFloat(val))}
          >
            <SelectTrigger className="h-12 rounded-2xl border-2 hover:border-primary/50 transition-all font-bold">
              <SelectValue placeholder="Any Rating" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl shadow-2xl border-primary/10">
              <SelectItem value="0" className="font-bold">Any Rating</SelectItem>
              <SelectItem value="4.5" className="font-medium flex items-center gap-2">4.5+ Stars</SelectItem>
              <SelectItem value="4" className="font-medium flex items-center gap-2">4.0+ Stars</SelectItem>
              <SelectItem value="3.5" className="font-medium flex items-center gap-2">3.5+ Stars</SelectItem>
              <SelectItem value="3" className="font-medium flex items-center gap-2">3.0+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-4">
        <div className="bg-primary/5 rounded-[1.5rem] p-4 border border-primary/10">
           <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">Pro Tip</p>
           <p className="text-[11px] font-medium text-muted-foreground leading-relaxed">
             Select up to 4 colleges to compare them side-by-side.
           </p>
        </div>
      </div>
    </div>
  );
}
