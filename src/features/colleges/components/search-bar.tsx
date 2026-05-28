"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, X, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchBarProps {
  defaultValue?: string;
  onSearch: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ defaultValue = "", onSearch, placeholder = "Search colleges..." }: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);
  const debouncedValue = useDebounce(value, 500);
  const [mounted, setMounted] = useState(false);
  const isSearching = value !== debouncedValue;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && debouncedValue !== defaultValue) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch, mounted, defaultValue]);

  return (
    <div className="relative w-full group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-colors group-focus-within:text-primary">
        {isSearching ? (
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        ) : (
          <Search className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <Input
        type="text"
        className="pl-11 pr-10 h-12 rounded-[1.25rem] border-2 bg-card hover:border-primary/50 focus-visible:ring-primary/20 focus-visible:border-primary transition-all font-medium text-base shadow-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button 
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted text-muted-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
