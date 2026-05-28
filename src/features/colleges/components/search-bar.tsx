"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Skip the first run to prevent loop on mount
    // Also skip if value hasn't changed from defaultValue
    if (mounted && debouncedValue !== defaultValue) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch, mounted, defaultValue]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
      <Input
        type="text"
        className="pl-9"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
