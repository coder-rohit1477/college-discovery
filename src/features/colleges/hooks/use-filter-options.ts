import { useQuery } from "@tanstack/react-query";

interface FilterOptions {
  cities: string[];
  states: string[];
}

async function fetchFilterOptions(): Promise<FilterOptions> {
  const response = await fetch("/api/colleges/filters");
  if (!response.ok) throw new Error("Failed to fetch filter options");
  return response.json();
}

export function useFilterOptions() {
  return useQuery({
    queryKey: ["college-filters"],
    queryFn: fetchFilterOptions,
  });
}
